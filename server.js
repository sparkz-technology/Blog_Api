require('dotenv').config(); // import dotenv
const app = require('./app');
// import express app
const port = process.env.PORT; // port 8000
app.listen(port, () => console.log(`Server listening on port ${port}!`)); // app is listening on port 8000
