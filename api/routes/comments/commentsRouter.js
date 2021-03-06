const express = require('express');
const Comments = require('./commentsModel');
const restrictTo = require('../../middleware/restrictTo');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allComments = await Comments.findAll();
    res.status(200).json(allComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Can filter by id, requestId, or authorId
router.get('/find', async (req, res) => {
  const filter = req.body;
  try {
    const foundComments = await Comments.findBy(filter);
    res.status(200).json(foundComments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newComment = await Comments.create(req.body);
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/', async (req, res) => {
  const comment = req.body;
  try {
    const updatedComment = await Comments.update(comment.id, comment);
    res.status(200).json(updatedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/', async (req, res) => {
  const { id } = req.body;
  try {
    await Comments.remove(id);
    res
      .status(200)
      .json({ message: `Comment with id: ${id} succesfully deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
