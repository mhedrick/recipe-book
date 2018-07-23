var express = require('express');
var admin = require("firebase-admin");
var bodyParser = require('body-parser');
var firebaseMiddleware = require('express-firebase-middleware');
var cors = require("cors");

var serviceAccount = require("./mhedrick-recipebook-firebase-adminsdk-mq9yi-4f0a2cd459.json");

var router = express.Router();

router.use((req, res, next) => {
    next();
});
router.use('/api', firebaseMiddleware.auth); 

var app = express();
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

router.get('/api/hello/', (req, res) => {
    console.log(res.locals);
    res.json({
        message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.uid}`
    });
});

app.use('/', router);
app.listen(5000, () => console.log('listening on 5000'));