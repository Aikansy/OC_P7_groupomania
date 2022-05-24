// *************************************************************************************** IMPORT(S)

const jwt = require("jsonwebtoken");
const db = require("../config/index");
const User = db.user;
const Post = db.post;
const Comment = db.comment;
const fs = require("fs");

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

  const post = {
    creator_id: req.body.creator_id,
    creator: user.nickname,
    title: req.body.title,
    imgUrl: req.file.filename,
    message: req.body.message,
  };

  if (!req.file) {
    return res.json({ error: "No image" });
  } else {
    Post.create(post)
      .then((newPost) => {
        const postImageDir = `../front/src/uploads/posts/user_${userId}`;
        const newFilename = `postid_${newPost._id}_${req.file.filename}`;
        fs.readFile(
          `${postImageDir}/${newPost.imgUrl}`,
          function (error, data) {
            if (error) throw error;
            fs.writeFile(
              `${postImageDir}/${newFilename}`,
              data,
              function (error) {
                if (error) throw error;
              }
            );
          }
        );
        const oldPostImageDir = `../front/src/uploads/posts/user_${userId}/${req.file.filename}`;
        fs.unlink(oldPostImageDir, function (error) {
          if (error) throw error;
        });

        newPost
          .update({ imgUrl: newFilename })
          .then((data) => res.status(200).json(data))
          .catch((error) => res.status(400).json({ error }));

        res.status(200);
      })
      .catch((error) => res.status(400).json({ error }));
  }
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
      .catch(() => res.status(400).json({ error: "Error save post on DB" }));
  } else {
    return res
      .status(403)
      .json({ error: "Forbidden request: this is not your post !" });
  }
};

exports.updateImagePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "Post not found !" });

  if (user.role === "admin" || user._id == post.creator_id) {
    if (!req.file) {
      return res.json({ error: "No image" });
    } else {
      const oldImage = post.imgUrl;
      const oldImagedir = `../front/src/uploads/posts/user_${post.creator_id}/${oldImage}`;

      const newImageDir = `../front/src/uploads/posts/user_${post.creator_id}`;
      const newFilename = `postid_${post._id}_${req.file.filename}`;

      fs.readFile(
        `${newImageDir}/${req.file.filename}`,
        function (error, data) {
          if (error) throw error;

          fs.writeFile(`${newImageDir}/${newFilename}`, data, function (error) {
            if (error) throw error;
          });
        }
      );

      post
        .update({ imgUrl: newFilename })
        .then(() => {
          try {
            fs.unlink(oldImagedir, () => {
              console.log("Old image deleted !");
            });

            fs.unlink(`${newImageDir}/${req.file.filename}`, () => {
              console.log("multer image deleted !");
            });
          } catch (error) {
            return res.send({ error: error });
          }
          res.status(200).json(newFilename);
        })
        .catch((error) => res.status(400).json({ error }));
    }
  }
};

exports.deletePost = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ error: "Post not found !" });

  if (user.role === "admin" || user._id == post.creator_id) {
    await Comment.findAll({ where: { post_id: req.params.id } })
      .then((comments) => {
        if (comments) {
          Comment.destroy({ where: { post_id: req.params.id } });
        }
      })
      .catch((error) => res.status(400).json({ error }));

    await Post.findOne({ where: { _id: req.params.id } })
      .then((posts) => {
        if (posts) {
          Post.destroy({ where: { _id: req.params.id } });
          res
            .status(200)
            .json({ message: "This post has been successfully deleted" });
        }
      })
      .catch((error) => res.status(400).json({ error }));

    if (post.imgUrl) {
      const postImageDir = `../front/src/uploads/posts/user_${post.creator_id}`;
      fs.unlink(`${postImageDir}/${post.imgUrl}`, function (error) {
        if (error) throw error;
      });
    }
  } else {
    return res
      .status(403)
      .json({ error: "Forbidden request: this is not your post !" });
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
    post.likes--;
    post.likers = {
      ...post.likers,
      [user._id]: false,
    };

    post
      .update({ likes: post.likes, likers: post.likers })
      .then((updatedPost) => res.status(200).json({ updatedPost }))
      .catch((error) => res.status(400).json({ error }));
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
    commentator: user.nickname,
    content: req.body.content,
  };

  await Comment.create(comment)
    .then((newComment) => res.status(200).json({ newComment }))
    .catch(() => res.status(400).json({ error: "Error comment creation" }));
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
      .then(() => res.status(200).json("Comment deleted !"))
      .catch((error) => res.status(400).json({ error }));
  } else {
    return res
      .status(403)
      .json({ error: "Forbidden request: this is not your comment !" });
  }
};
