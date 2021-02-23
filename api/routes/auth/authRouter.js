const express = require('express');
const router = express.Router();
const User = require('../users/userModel');
const bcrypt = require('bcryptjs');

// Controllers
const { loginUser, registerUser } = require('./controllers');

// Validators
const { validateRegistration } = require('./validators');

// Utility middleware
const { checkIfUserExists } = require('./middleware');

router.post('/login', loginUser);

router.post('/register', checkIfUserExists, validateRegistration, registerUser);

module.exports = router;
