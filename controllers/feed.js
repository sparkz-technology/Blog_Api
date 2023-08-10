exports.getPosts = (req, res) => {
  res.status(200).json({
    posts: [
      {
        title: 'First Post',
        description: 'This is the first post!',
        content: 'This is the content of the first post!',
        image:
          'https://images.unsplash.com/photo-1581090406934-3b6a1b0e6b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      },
    ],
  });
};

exports.createPost = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  res.status(201).json({
    message: 'Post created successfully!',
    post: {
      id: new Date().toISOString(),
      title: title,
      description: description,
    },
  });
};
