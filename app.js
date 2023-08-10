require('dotenv').config(); //dotenv is a module that loads environment variables from a .env file into process.env
const express = require('express'); //express is a framework for node.js
const morgan = require('morgan'); // morgan is a middleware that logs the requests
const cors = require('cors'); //cors is a middleware that allows cross origin resource sharing
const bodyParser = require('body-parser'); //body-parser is a middleware that parses the body of the request

const feedRoutes = require('./routes/feed');

const app = express(); //creating an express app

const corsOptions = {
  //cors options
  origin: '*', //origin is the url of the server that is allowed to access the resources
  optionsSuccessStatus: 200, //status code to use for successful OPTIONS requests
};
app.use(cors(corsOptions)); //using cors middleware

app.use(bodyParser.json()); //bodyParser.json()s parses the body of the request and only looks at json data

if (process.env.NODE_ENV === 'development') {
  //if the environment is development then use morgan
  app.use(morgan('dev')); //morgan is a middleware that logs the requests
}

app.use('/feed', feedRoutes);

module.exports = app; //exporting app to be used in server.js
