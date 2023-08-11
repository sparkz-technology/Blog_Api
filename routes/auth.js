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
      .trim()
      .isLength({ min: 8 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
      .withMessage(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
      ),
    body('name').not().isEmpty().withMessage('Please enter a name').trim(),
  ],
  authController.signup,
);

router.post('/login', authController.login);

module.exports = router;
