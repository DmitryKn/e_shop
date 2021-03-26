const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);
router.post('/logout', AuthController.postLogout);
router.get('/signup', AuthController.getSignup);
router.post('/signup', AuthController.postSignup);
router.get('/reset', AuthController.getReset);
router.post('/reset', AuthController.postReset);
router.get('/reset/:token', AuthController.getNewPassword);
router.post('/new-password', AuthController.postNewPassword);

module.exports = router;
