const express = require('express');
const authRequired = require('../../middleware/authRequired');

const Addr = require('./addr-model');
const router = express.Router();
const restrictTo = require('../../middleware/restrictTo');

router.get('/', authRequired, restrictTo('admin'), async (req, res) => {
  try {
    const addrs = await Addr.findAll();
    res.status(200).json(addrs);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

router.get('/:id', authRequired, restrictTo('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const addr = await Addr.findById(id);
    res.status(200).json(addr);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

router.post('/', authRequired, restrictTo('admin'), async (req, res) => {
  const newAddr = req.body;
  try {
    const addedAddr = await Addr.create(newAddr);
    res.status(200).json(addedAddr);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

router.put('/:id', authRequired, restrictTo('admin'), async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const updated = await Addr.update(id, changes);
    res.status(200).json({ message: 'You succesfully updated your address' });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

router.delete('/:id', authRequired, restrictTo('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    await Addr.remove(id);
    res.status(200).json({ message: 'Address deleted!' });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

module.exports = router;
