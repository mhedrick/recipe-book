var express = require('express');
var admin = require("firebase-admin");
const bodyParser = require('body-parser');
const firebaseMiddleware = require('express-firebase-middleware');
const cors = require("cors");

const serviceAccount = require("./mhedrick-recipebook-firebase-adminsdk-mq9yi-4f0a2cd459.json");

const router = express.Router();

router.use(({ next }) => {
    next();
});
router.use('/api', firebaseMiddleware.auth); 

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mhedrick-recipebook.firebaseio.com"
});
 
router.get('/', (req, res) => {
    res.json({
        message: 'Home'
    });
});

router.get('/api/hello', (req, res) => {
    res.json({
        message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.uid}`
    });
});

app.use('/', router);
app.listen(5000, () => console.log('listening on 5000'));