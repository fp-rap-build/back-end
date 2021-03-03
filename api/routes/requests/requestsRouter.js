const express = require('express');
const authRequired = require('../../middleware/authRequired');
const Requests = require('./requestsModel');
const restrictTo = require('../../middleware/restrictTo');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const reqs = await Requests.findAll();
    res.status(200).json({ requests: reqs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;