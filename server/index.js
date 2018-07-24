var express = require('express');
var admin = require("firebase-admin");
const bodyParser = require('body-parser');
const cors = require("cors");

const router = require("./routes");

require('dotenv').load();

// if (process.env.NODE_ENV === 'development') {
//     require('dotenv').config({ path: 'development.env' })
//   }

// todo env this
const serviceAccount = require("./mhedrick-recipebook-firebase-adminsdk-mq9yi-4f0a2cd459.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mhedrick-recipebook.firebaseio.com"
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);
app.listen(5000, () => console.log('listening on 5000'));