const { Router } = require('express');
const firebaseMiddleware = require('express-firebase-middleware');

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
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM users WHERE userid = $1', [id]);
    res.send(rows[0])
});
// get a list of user's recipes
router.get('/api/v1/users/:id/recipes', async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query('SELECT r.* FROM users u, recipes r WHERE u.userId = r.userId and u.userid = $1', [id]);
    res.send(rows[0])
});
// crud on recipes
router.post('/api/v1/recipes/', async (req, res) => {
    const { userId, recipename, ingredients, instructions } = req.body;
    const { rows } = await db.query('INSERT INTO recipes (default, recipeName, userId, ingredients, instructions) values ($1, $2, $3, $4) returning *', [userId, recipename, ingredients, instructions]);
    res.send(rows[0])
});
router.get('/api/v1/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM recipes WHERE recipeid = $1', [id]);
    res.send(rows[0])
});
router.put('/api/v1/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { recipename, ingredients, instructions } = req.body;
    const { rows } = await db.query('UPDATE recipes set recipename=($2), ingredients=($3), instructions=($4)  where recipeid = $1 RETURNING *', [id, recipename, ingredients, instructions]);
    res.send(rows[0])
});
router.delete('/api/v1/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query('DELETE FROM recipes WHERE recipeid = $1', [id]);
    //res.send(rows[0])
});