const { Router } = require('express');
const path = require('path');
const firebaseMiddleware = require('express-firebase-middleware');
const firebase = require('firebase');

const db = require('../db');

const router = Router();
router.use(({ next }) => {
    next();
});
router.use('/api', firebaseMiddleware.auth);

module.exports = router;

// unprotected
router.get('/health', async (req, res) => {
    res.json({
        message: 'Connecting successfully'
    });
});
// protected
router.get('/api/health', async (req, res) => {
    res.json({
        message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.uid}`
    });
});

router.get('/api/v1/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT username FROM users WHERE firebaseuserid = $1', [id]);
        res.send(rows[0])
    } catch (e) {
        res.status(500);
        res.send(JSON.stringify(e.message));
    }
});
// get a list of user's recipes
router.get('/api/v1/users/:id/recipes', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query(
            `SELECT r.* 
            FROM users u, recipes r 
            WHERE u.userid = r.userid and u.firebaseuserid = $1`
            , [id]);

        let normalized = rows.reduce((acc, row) => {
            acc[row.recipeid] = row;
            return acc;
        }, {});

        res.send(JSON.stringify(normalized));
    } catch (e) {
        res.status(500);
        res.send(JSON.stringify(e.message));
    }
});

// crud on recipes
router.post('/api/v1/recipes/', async (req, res) => {
    const { uid, recipename, ingredients, instructions } = req.body;
    const ingredientsJSON = JSON.stringify(ingredients);
    try {
        let { rows } = await db.query(
            `INSERT INTO recipes (recipeid, userid, recipename, ingredients, instructions)
            VALUES (default, (SELECT userid FROM users WHERE firebaseuserid = $1), $2, $3, $4) 
            RETURNING *`
            , [uid, recipename, ingredientsJSON, instructions]);

        res.send(rows[0])
    } catch (e) {
        res.status(500);
        res.send(JSON.stringify(e.message));
    }
});
router.get('/api/v1/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM recipes WHERE recipeid = $1', [id]);
        res.send(rows[0])
    } catch (e) {
        res.status(500);
        res.send(JSON.stringify(e.message));
    }
});
router.put('/api/v1/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { uid, recipename, ingredients, instructions } = req.body;
    const ingredientsJSON = JSON.stringify(ingredients);
    try {
        const { rows } = await db.query(
            `UPDATE recipes 
            SET recipename=($2), 
            ingredients=$3,
            instructions=($4) 
            WHERE recipeid = $1 and userid = (SELECT userid FROM users WHERE firebaseuserid = $5)
            RETURNING *`,
            [id, recipename, ingredientsJSON, instructions, uid]);

        res.send(rows[0])
    } catch (e) {
        res.status(500);
        res.send(JSON.stringify(e.message));
    }
});
router.delete('/api/v1/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // only let people delete their own recipes
        const { rows } = await db.query('DELETE FROM recipes WHERE recipeid = $1 and userid = (SELECT userid FROM users WHERE firebaseuserid = $2)', [id, res.locals.user.uid]);
        res.status(200);
        res.send(JSON.stringify({ "success": true }))
    } catch (e) {
        res.status(500);
        res.send(JSON.stringify(e.message));
    }
});

// All remaining requests return the React app, so it can handle routing.
router.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});