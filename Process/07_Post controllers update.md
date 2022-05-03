# 07 - Post controllers update

## Post controllers

back/controllers/user_controllers.js:

#### FIND ALL POST controller

```javascript
exports.findAllPost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const posts = await Post.findAll();

  if (!posts) return res.status(404).json({ message: "No posts found !" });

  if (user.role === "admin") {
    await Post.findAll()
      .then((posts) => res.status(200).json({ posts }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    await Post.findAll({ attributes: { exclude: ["creator_id"] } })
      .then((posts) => res.status(200).json({ posts }))
      .catch((error) => res.status(400).json({ error }));
  }
};
```

#### FIND ONE POST controller

```javascript
exports.FindOnePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "No post found !" });

  if (user.role === "admin" || user._id == post.creator_id) {
    await Post.findOne({ where: { _id: req.params.id } })
      .then((post) => res.status(200).json({ post }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    await Post.findOne({
      where: { _id: req.params.id },
      attributes: { exclude: ["_id", "creator_id"] },
    })
      .then((post) => res.status(200).json({ post }))
      .catch((error) => res.status(400).json({ error }));
  }
};
```

#### CREATE POST controller

```javascript
exports.createPost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });

  const { title, imgUrl, videoUrl, message } = req.body;

  const post = {
    creator_id: user._id,
    creator: user.nickname,
    title: title,
    imgUrl: imgUrl,
    videoUrl: videoUrl,
    message: message,
  };

  await Post.create(post)
    .then(() =>
      res
        .status(200)
        .json({ message: "The post has been successfully added !" })
    )
    .catch((error) => res.status(400).json({ error }));
};
```

#### UPDATE POST controller

```javascript
exports.updatePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "No post found !" });

  if (user.role === "admin" || user._id == post.creator_id) {
    await Post.findOne({ where: { _id: req.params.id } })
      .then((post) => {
        const data = req.body;

        for (let key of Object.keys(data)) {
          if (!data[key]) {
            delete data[key];
          }

          post.update({ [key]: data[key] });
        }

        post.save();
        res
          .status(200)
          .json({ message: "the post has been successfully updated !" });
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden request: this is not your post !" });
  }
};
```

#### DELETE POST controller

```javascript
exports.deletePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "No post found !" });

  if (user.role === "admin" || user._id == post.creator_id) {
    await post
      .destroy()
      .then(() =>
        res
          .status(200)
          .json({ message: "The post has been successfully deleted !" })
      )
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden request: this is not your post !" });
  }
};
```

#### LIKE POST controller

```javascript
exports.likePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "No post found !" });

  await Post.findOne({ where: { _id: req.params.id } })
    .then(() => {
      if (!post.likers[user._id]) {
        post.likes++;
        post.likers = {
          ...post.likers,
          [user._id]: true,
        };

        post
          .update({ likes: post.likes, likers: post.likers })
          .then(() =>
            res
              .status(200)
              .json({ message: "Your like has been successfully added !" })
          );
      } else {
        return res.json({ message: "You already like this post !" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
```

#### UNLIKE POST controller

```javascript
exports.unlikePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "No post found !" });

  Post.findOne({ where: { _id: req.params.id } })
    .then(() => {
      if (post.likers[user._id]) {
        post.likes--;
        post.likers = {
          ...post.likers,
          [user._id]: false,
        };

        post
          .update({ likes: post.likes, likers: post.likers })
          .then(() =>
            res
              .status(200)
              .json({ message: "Your like has been successfully removed !" })
          );
      } else {
        return res.json({ message: "You already unlike this post !" });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
```

#### CREATE COMMENT controller

```javascript
exports.createComment = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "No post found !" });

  const comment = {
    post_id: req.params.id,
    commentator_id: user._id,
    content: req.body.content,
  };

  Comment.create(comment)
    .then((comment) => {
      const currentComments = post.comments;
      const allComments = [...currentComments];
      allComments.push(comment);

      post
        .update({ comments: allComments })
        .then(() =>
          res
            .status(200)
            .json({ message: "The comment has been successfully added !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
```

#### DELETE COMMENT controller

```javascript
exports.deleteComment = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });
  const comment = await Comment.findOne({
    where: { _id: req.body.comment_id },
  });

  if (!post) return res.status(404).json({ message: "No post found !" });
  if (!comment) return res.status(404).json({ message: "No comment found !" });

  if (user.role === "admin" || user._id == comment.commentator_id) {
    const currentComments = post.comments;
    const allComments = [...currentComments];

    allComments.forEach((postComment, index) => {
      if (postComment._id == req.body.comment_id && post._id == req.params.id) {
        allComments.splice(index, 1);
      }
    });

    post.update({ comments: allComments });
    Comment.destroy({ where: { _id: req.body.comment_id } });

    res
      .status(200)
      .json({ message: "The post has been successfully deleted !" });
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden request: this is not your post !" });
  }
};
```
