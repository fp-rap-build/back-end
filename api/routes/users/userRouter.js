const express = require('express');
const authRequired = require('../../middleware/authRequired');
const Users = require('./userModel');
const router = express.Router();
const restrictTo = require('../../middleware/restrictTo');

const {
  getAllUsers,
  createUser,

  getUserById,
  updateUserById,
  deleteUserById,

  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  getUserAddressById,
} = require('./controllers');

router.route('/').all(authRequired).get(getAllUsers).post(createUser);

router.route('/me').get(getCurrentUser).put(updateCurrentUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

router.route('/:id/address').get(getUserAddressById);

module.exports = router;
