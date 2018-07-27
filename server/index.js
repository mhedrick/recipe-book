var express = require('express');
var admin = require("firebase-admin");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const dotenv = require('dotenv');

dotenv.load()
if (app.get('env') === 'development') {
    dotenv.config({ path: '.env.local' })
}


const router = require("./routes");

// todo env this
const serviceAccount = require(process.env.FIREBASE_SVC_ACCT);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);
app.listen(5000, () => console.log('listening on 5000'));