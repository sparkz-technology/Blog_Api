const { validationResult } = require('express-validator'); // to validate the data
const Post = require('../models/post'); // to import the post model

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({ message: 'Fetched posts successfully', posts });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const { postId } = req.params;
  Post.findById({ _id: postId })
    .then((post) => {
      if (!post) {
        const error = new Error('Could not find the post !');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Post fetched', post });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect !');
    error.statusCode = 422;
    throw error;
  }
  const { title, content } = req.body;
  const imageUrl = req.file.path.replace('\\', '/');
  const post = new Post({
    title,
    content,
    imageUrl: `/${imageUrl}`,
    creator: { name: 'Sparkz' },
  });
  post
    .save()
    .then((result) => {
      res.status(201).json({ message: 'Post created !', post: result });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
