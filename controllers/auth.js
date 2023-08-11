const { validationResult } = require('express-validator'); // to validate the data
const User = require('../models/user'); // to get the user model

exports.signup = async (req, res, next) => {
  const errors = validationResult(req); // to get the errors from the request
  if (!errors.isEmpty()) {
    // if there are errors
    const error = new Error('Validation failed.'); // create a new error
    error.statusCode = 422; // set the status code
    error.data = errors.array(); // set the data
    return next(error); // throw the error
  }
  const { email, name, password } = req.body; // get the email, name and password from the request body

  const user = new User({
    email,
    password,
    name,
  }); // create a new user
  user
    .save()
    .then((result) => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }); // save the user
};
exports.login = (req, res, next) => {};
