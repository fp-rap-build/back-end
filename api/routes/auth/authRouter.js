const express = require('express');
const router = express.Router();
const User = require('../users/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { checkIfUserExists } = require('./middleware');

const validRoles = ['tenant', 'landlord'];

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

    // Hide password

    user[0]['password'] = undefined;

    res.status(200).json({
      status: 'Success',
      token,
      user: user[0],
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post(
  '/register',
  checkIfUserExists,
  [
    check('firstName')
      .notEmpty()
      .withMessage('First name is required')
      .isAlpha()
      .withMessage('Must be only alphabetical chars'),
    check('lastName')
      .notEmpty()
      .withMessage('Last name is required')
      .isAlpha()
      .withMessage('Must be only alphabetical chars'),
    check('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email must be valid'),
    check('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 10, max: 255 })
      .withMessage('Password must be between 10 and 255 characters'),
    check('role')
      .notEmpty()
      .withMessage('Role is required')
      .custom((role) => validRoles.includes(role))
      .withMessage('Invalid role - your options are [tenant, landlord]'),
    check('monthlyIncome')
      .notEmpty()
      .withMessage('Income is required')
      .isInt()
      .withMessage('Income must be a number'),
    check('familySize')
      .notEmpty()
      .withMessage('Family Size is required')
      .isInt()
      .withMessage('Family size must be a number')
      .isLength({ min: 1 })
      .withMessage('Family size must be greater than 0')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

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
  }
);

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

module.exports = router;
