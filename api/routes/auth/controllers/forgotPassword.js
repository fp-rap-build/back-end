const Users = require('../../users/userModel');

const crypto = require('crypto')

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: 'Please provide your email address' });
  }

  try {

    // Find user by email
    const user = await Users.findBy({ email });

    if (user.length === 0) {
      return res
        .status(404)
        .json({ message: 'User with that email does not exist' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')

    // encrypt it
    crypto.createHash('sha256').update(resetToken).digest('hex')

  } catch (error) {
    res.json(error);
  }
};

module.exports = forgotPassword;
