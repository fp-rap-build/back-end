const express = require('express');
const authRequired = require('../../middleware/authRequired');

const router = express.Router();
const restrictTo = require('../../middleware/restrictTo');

// controllers
const {
  getAllAddresses,
  createAddress,
  getAddressById,
  updateAddressById,
} = require('./controllers');

// Global middleware
router.use(authRequired, restrictTo('admin'));

// Routes
router.route('/').get(getAllAddresses).post(createAddress);

router.route('/:id').get(getAddressById).put(updateAddressById);

module.exports = router;
