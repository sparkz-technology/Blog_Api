/* eslint-disable global-require */
/* eslint-disable no-console */
require('dotenv').config(); // import dotenv
const mongoose = require('mongoose'); //mongoose is a module that allows us to interact with mongodb
// in client side install socket.io-client
const app = require('./app');

const port = process.env.PORT; // port 8000

// connecting to mongodb
async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const server = app.listen(port); // app is listening on port 8000
    const io = require('./socket').init(server); // socket.io is initialized
    io.on('connection', () => {
      console.log('Client connected');
    });
  } catch (error) {
    console.warn(error);
  }
}
connect();
