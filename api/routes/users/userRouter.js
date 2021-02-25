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

// Global middleware
router.use(authRequired);

// Routes
router.route('/').get(getAllUsers).post(createUser);

router
.route('/me')
.get(getCurrentUser)
.put(updateCurrentUser)
.delete(deleteCurrentUser);

router
.route('/:id')
.all(restrictTo('admin', 'programManager'))
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

router.route('/:id/address').get(getUserAddressById);

module.exports = router;
