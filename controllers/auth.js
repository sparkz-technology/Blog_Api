require('dotenv').config(); // to get the environment variables
const { validationResult } = require('express-validator'); // to validate the data
const bcrypt = require('bcryptjs'); // Corrected import statement
const jwt = require('jsonwebtoken'); // to create a token
const User = require('../models/user'); // to get the user model

exports.signup = (req, res, next) => {
  const errors = validationResult(req); // to get the errors from the request
  if (!errors.isEmpty()) {
    // if there are errors
    const error = new Error('Validation failed.'); // create a new error
    error.statusCode = 422; // set the status code
    error.data = errors.array(); // set the data
    throw error; // throw the error
  }
  const { email, name, password } = req.body; // get the email, name and password from the request body
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email,
        password: hashedPassword,
        name,
      }); // create a new user
      return user.save(); // save the user
    })
    .then((result) => {
      res.status(201).json({ message: 'User created!', userId: result._id }); // return the result
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500; // set the status code
      next(err); // throw the error
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body; // get the email and password from the request body
  let loadedUser; // to store the loaded user
  User.findOne({ email })
    .then((user) => {
      // find the user
      if (!user) {
        // if the user is not found
        const error = new Error('A user with this email could not be found.'); // create a new error
        error.statusCode = 401; // set the status code
        throw error; // throw the error
      }
      loadedUser = user; // set the loaded user
      return bcrypt.compare(password, user.password); // compare the passwords
    })
    .then((isEqual) => {
      // if the passwords are equal
      if (!isEqual) {
        // if the passwords are not equal
        const error = new Error('Wrong password!'); // create a new error
        error.statusCode = 401; // set the status code
        throw error; // throw the error
      }
      const token = jwt.sign(
        {
          // create a new token
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.JWT_SECRET, // set the secret
        { expiresIn: '1h' }, // set the expiration time
      );
      res.status(200).json({ token, userId: loadedUser._id.toString() }); // return the token and the user id
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500; // set the status code
      next(err); // throw the error
    });
};
