var express = require('express');
var path = require('path');
var admin = require("firebase-admin");
const bodyParser = require('body-parser');
const cors = require("cors");
var morgan = require('morgan');
const firebase = require('firebase');

const app = express();
const dotenv = require('dotenv');

dotenv.load();

const PORT = process.env.PORT || 5000;
const serviceAccount = {
    "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL
  }; 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL
});
const router = require("./routes");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/', router);
app.set( 'port', PORT);
app.listen(app.get( 'port' ), () => console.log('listening on', PORT));