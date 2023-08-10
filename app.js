require('dotenv').config(); //dotenv is a module that loads environment variables from a .env file into process.env
const express = require('express'); //express is a framework for node.js
const morgan = require('morgan');
//morgan is a middleware that logs the requests
const app = express(); //creating an express app
if (process.env.NODE_ENV === 'development') {
  //if the environment is development then use morgan
  app.use(morgan('dev'));
}
module.exports = app; //exporting app to be used in server.js
