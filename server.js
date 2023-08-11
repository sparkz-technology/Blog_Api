require('dotenv').config(); // import dotenv
const mongoose = require('mongoose'); //mongoose is a module that allows us to interact with mongodb
const app = require('./app');

const port = process.env.PORT; // port 8000

// connecting to mongodb
async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => console.log(`Server listening on port ${port}!`)); // app is listening on port 8000
  } catch (error) {
    console.log(error);
  }
}
connect();
