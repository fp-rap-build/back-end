const express = require('express');
const router = express.Router();
// Controllers
const { loginUser, registerUser } = require('./controllers');

// Validators
const { validateRegistration, validateLogin } = require('./validators');

// Utility middleware
const { checkIfUserExists } = require('./middleware');

router.post('/login', validateLogin, loginUser);

router.post('/register', checkIfUserExists, validateRegistration, registerUser);

module.exports = router;
