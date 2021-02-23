const { signToken } = require('../utils')
const User = require('../../users/userModel')
const bcrypt = require('bcryptjs')

const loginUser = async (req, res, next) => {
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
};

module.exports = loginUser;
