const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  addPost,
  editPost,
  wavePost,
  getWavers,
  deletePost,
} = require('../controllers/postController');
const { authenticate } = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', authenticate, upload.single('image'), addPost);
router.put('/:id', authenticate, upload.single('image'), editPost);
router.patch('/:id/wave', authenticate, wavePost);
router.get('/:id/wavers', authenticate, getWavers);
router.delete('/:id', authenticate, deletePost);

module.exports = router;
