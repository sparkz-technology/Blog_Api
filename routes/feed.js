const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const feedController = require('../controllers/feed');

// GET /feed/posts
router.get('/posts', feedController.getPosts);
// POST /feed/post
router.post(
  '/post',
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  feedController.createPost,
);
// GET /feed/post/:postId
router.get('/post/:postId', feedController.getPost);

module.exports = router;
