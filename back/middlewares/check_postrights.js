const jwt = require("jsonwebtoken");
const db = require("../config/index");
const User = db.user;
const Post = db.post;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });
  const post = await Post.findOne({ where: { _id: req.params.id } });

  if (!post) return res.status(404).json({ message: "Post not found !" });

  if (user.role === "admin" || user._id == post.creator_id) {
    next();
  } else {
    return res.status(403).json({
      error: "Forbidden request: this is not your account !",
    });
  }
};
