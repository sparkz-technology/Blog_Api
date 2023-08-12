/* eslint-disable no-unused-vars */
require('dotenv').config(); //dotenv is a module that loads environment variables from a .env file into process.env
const path = require('path'); //path is a module that provides utilities for working with file and directory paths
const express = require('express'); //express is a framework for node.js
const morgan = require('morgan'); // morgan is a middleware that logs the requests
const cors = require('cors'); //cors is a middleware that allows cross origin resource sharing
const bodyParser = require('body-parser'); //body-parser is a middleware that parses the body of the request
const { v4: uuidv4 } = require('uuid'); //uuid is a module that generates unique ids
const multer = require('multer'); //multer is a middleware that parses multipart/form-data

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express(); //creating an express app
app.use('/images', express.static(path.join(__dirname, 'images'))); //making the images folder static so that it can be accessed publicly
const corsOptions = {
  //cors options
  origin: '*', //origin is the url of the server that is allowed to access the resources
  optionsSuccessStatus: 200, //status code to use for successful OPTIONS requests
};
app.use(cors(corsOptions)); //using cors middleware

app.use(bodyParser.json()); //bodyParser.json()s parses the body of the request and only looks at json data
app.use(bodyParser.urlencoded({ extended: true })); //bodyParser.urlencoded() parses the body of the request and looks at url encoded data

if (process.env.NODE_ENV === 'development') {
  //if the environment is development then use morgan
  app.use(morgan('dev')); //morgan is a middleware that logs the requests
}
//multer is a middleware that parses multipart/form-data
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

//multer is a middleware that parses multipart/form-data
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//multer is a middleware that parses multipart/form-data
app.use(
  multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit (in bytes)
    },
  }).single('image'),
);
// router middleware
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  //error handling middleware
  const status = error.statusCode || 500; //if the error has a status code then use that otherwise use 500
  const { message } = error; //error message
  const { data } = error; //error data
  res.status(status).json({ message: message, data: data }); //sending the response
  next();
});

module.exports = app; //exporting app to be used in server.js
