const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/auth');

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail()
      .custom((value) =>
        User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(new Error('Email already exists'));
          }
        }),
      ),
    body('password')
      .isLength({ min: 5 })
      .withMessage('Please enter a password with at least 5 characters')
      .trim(),
    body('name').not().isEmpty().withMessage('Please enter a name').trim(),
  ],
  authController.signup,
);

// Error handling middleware for validation errors

module.exports = router;
