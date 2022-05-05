// *************************************************************************************** IMPORT(S)

const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.user;
const Post = db.post;
const Comment = db.comment;

// *********************************************************************************** CONTROLLER(S)

exports.findAllPosts = async (req, res, next) => {
  await Post.findAll()
    .then((posts) => {
      if (posts) res.status(200).json({ posts });
      else return res.status(404).json({ message: "Posts not found !" });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.FindOnePost = async (req, res, next) => {
  await Post.findOne({ where: { _id: req.params.id } })
    .then((post) => {
      if (post) res.status(200).json({ post });
      else return res.status(404).json({ message: "Post not found !" });
    })
    .catch((error) => res.status(400).json({ error }));
};

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
    .then((newPost) => res.status(200).json({ newPost }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updatePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "Post not found !" });

  if (user.role === "admin" || user._id == post.creator_id) {
    const data = req.body;

    for (let key of Object.keys(data)) {
      if (!data[key]) {
        delete data[key];
      }
      post.update({ [key]: data[key] });
    }

    await post
      .save()
      .then((updatedPost) => res.status(200).json({ updatedPost }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden request: this is not your post !" });
  }
};

exports.deletePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "Post not found !" });

  if (user.role === "admin" || user._id == post.creator_id) {
    await post
      .destroy()
      .then(() => {
        Post.findAll()
          .then((posts) => res.status(200).json({ posts }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden request: this is not your post !" });
  }
};

exports.likePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "Post not found !" });

  if (!post.likers[user._id]) {
    post.likes++;
    post.likers = {
      ...post.likers,
      [user._id]: true,
    };

    post
      .update({ likes: post.likes, likers: post.likers })
      .then((updatedPost) => res.status(200).json({ updatedPost }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res.json({ message: "You already like this post !" });
  }
};

exports.unlikePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "No post found !" });

  if (post.likers[user._id]) {
    post.likes--;
    post.likers = {
      ...post.likers,
      [user._id]: false,
    };

    post
      .update({ likes: post.likes, likers: post.likers })
      .then((updatedPost) => res.status(200).json({ updatedPost }));
  } else {
    return res.json({ message: "You already unlike this post !" });
  }
};

exports.findAllComments = async (req, res, next) => {
  const post = await Post.findOne({ where: { _id: req.params.id } });
  const comments = await Comment.findAll({
    where: { post_id: req.params.id },
  });

  if (!post) return res.status(404).json({ message: "Post not found !" });
  if (!comments)
    return res.status(404).json({ message: "Comment(s) not found !" });

  res.status(200).json({ comments });
};

exports.createComment = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "No post found !" });

  const comment = {
    post_id: req.params.id,
    postCreator_id: post.creator_id,
    commentator_id: user._id,
    content: req.body.content,
  };

  await Comment.create(comment)
    .then((newComment) => res.status(200).json({ newComment }))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateComment = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });
  const comment = await Comment.findOne({
    where: { post_id: post._id, _id: req.body.comment_id },
  });

  if (!post) return res.status(404).json({ message: "Post not found !" });
  if (!comment) return res.status(404).json({ message: "Comment not found !" });

  if (user.role === "admin" || user._id == comment.commentator_id) {
    const data = req.body;

    for (let key of Object.keys(data)) {
      if (!data[key]) {
        delete data[key];
      }
      comment.update({ [key]: data[key] });
    }

    await comment
      .save()
      .then((updatedComment) => res.status(200).json({ updatedComment }))
      .catch((error) => res.status(404).json({ error }));
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden request: this is not your comment !" });
  }
};

exports.deleteComment = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });
  const comment = await Comment.findOne({
    where: { post_id: post._id, _id: req.body.comment_id },
  });

  if (!post) return res.status(404).json({ message: "No post found !" });
  if (!comment) return res.status(404).json({ message: "No comment found !" });

  if (user.role === "admin" || user._id == comment.commentator_id) {
    await comment
      .destroy()
      .then(() => {
        Comment.findAll({ where: { post_id: req.params.id } })
          .then((comments) => {
            res.status(200).json({ comments });
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res
      .status(403)
      .json({ message: "Forbidden request: this is not your comment !" });
  }
};
