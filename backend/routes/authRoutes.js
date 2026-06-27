const express = require('express');
const router = express.Router();
const { signup, login, googleLogin, forgotPassword } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/forgot', forgotPassword);

module.exports = router;
