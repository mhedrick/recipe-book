var express = require('express');
var path = require('path');
var admin = require("firebase-admin");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const dotenv = require('dotenv');

dotenv.load();

const PORT = process.env.PORT || 5000;
admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL
      }),
    databaseURL: process.env.FIREBASE_URL
});

const router = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/', router);
app.set( 'port', PORT);
app.listen(app.get( 'port' ), () => console.log('listening on', PORT));