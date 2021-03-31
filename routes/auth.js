const express = require('express');
const AuthController = require('../controllers/AuthController');
const { check, body } = require('express-validator/check');
const User = require('../models/user');

const router = express.Router();

router.get('/login', AuthController.getLogin);
router.post(
  '/login',
  //login validation
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Please enter a valid password.')
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
  ],
  AuthController.postLogin
);
router.post('/logout', AuthController.postLogout);
router.get('/signup', AuthController.getSignup);
router.post(
  '/signup',
  //sign up validation,
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        //check if same user exists already
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              'Email exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text at least 6 characters.'
    )
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords should be equal!');
        }
        return true;
      })
      .trim(),
  ],
  AuthController.postSignup
);
router.get('/reset', AuthController.getReset);
router.post('/reset', AuthController.postReset);
router.get('/reset/:token', AuthController.getNewPassword);
router.post('/new-password', AuthController.postNewPassword);

module.exports = router;
