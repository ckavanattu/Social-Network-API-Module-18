const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/Thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);


router.route('/:thoughtId/reactions').post(newReaction).delete(deleteReaction);

module.exports = router;