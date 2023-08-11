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

// PUT /feed/post/:postId
router.put(
  '/post/:postId',
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  feedController.updatePost,
);

// DELETE /feed/post/:postId
router.delete('/post/:postId', feedController.deletePost);

module.exports = router;
