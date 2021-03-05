const express = require('express');
const authRequired = require('../../middleware/authRequired');
const Requests = require('./requestsModel');
const restrictTo = require('../../middleware/restrictTo');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const request = req.body;
    const newRequest = await Requests.create(request);
    res.status(200).json(newRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allRequests = await Requests.findAll();
    res.status(200).json({ requests: allRequests });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//View all active requests
router.get('/active', async (req, res) => {
  try {
    const resRequests = await Requests.findAllActive();
    res.status(200).json(resRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/find', async (req, res) => {
  const filter = req.body;
  try {
    const foundRequests = await Requests.findBy(filter);
    res.status(200).json(foundRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/', async (req, res) => {
  try {
    const change = req.body;
    const updatedRequest = await Requests.update(change.id, change);
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { id } = req.body;
    await Requests.remove(id);
    res
      .status(200)
      .json({ message: `Requests with id: ${id} succesfully deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
