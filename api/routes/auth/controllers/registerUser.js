const { signToken } = require('../utils');

const User = require('../../users/userModel');

const registerUser = async (req, res, next) => {
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
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = registerUser;
