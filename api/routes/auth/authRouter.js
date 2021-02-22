const express = require('express');
const router = express.Router();
const User = require('../users/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if email and password exist

    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check if user exists and password is correct

    let user = await User.findBy({ email });

    let userExists = user.length !== 0;
    let passwordsMatch = null;

    if (userExists) {
      passwordsMatch = await bcrypt.compare(password, user[0].password);
    }

    if (!userExists || !passwordsMatch) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // If everything is ok, send token to client

    const token = signToken(user[0].id);

    res.status(200).json({
      status: 'Success',
      token,
      user: user[0],
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post('/register', async (req, res, next) => {
  let payload = req.body;

  // Users can't give themselves a role of admin or program manager

  if (payload['role'] == 'admin' || payload['role'] == 'programManager') {
    payload['role'] = undefined;
  }

  try {
    let user = await User.create(payload);

    user = user[0];

    // Hide password

    user['password'] = undefined;

    // Generate a token

    const token = signToken(user.id);

    res.status(200).json({
      status: 'success',
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

module.exports = router;
