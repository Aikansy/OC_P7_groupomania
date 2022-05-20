const jwt = require("jsonwebtoken");
const db = require("../config/index");
const User = db.user;
const Post = db.post;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });

  if (user.role === "admin" || user._id == req.params.id) {
    next();
  } else {
    return res.status(403).json({
      error: "Forbidden request: this is not your account !",
    });
  }
};
