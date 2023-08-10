require('dotenv').config(); // import dotenv
const mongoose = require('mongoose'); //mongoose is a module that allows us to interact with mongodb
const app = require('./app');

// connecting to mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database')); // if connection is successful, log "Connected to database"

const port = process.env.PORT; // port 8000

app.listen(port, () => console.log(`Server listening on port ${port}!`)); // app is listening on port 8000
