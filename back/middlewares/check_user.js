// *************************************************************************************** IMPORT(S)

const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.user;
require("dotenv").config({ path: "../back/config/config.env" });

// ************************************************************************************* REQUIREAUTH

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
  const userId = decodedToken.userId;
  const user = await User.findOne({ where: { _id: userId } });

  if (!token) {
    return res.status(404).json({ message: "No token !" });
  } else if (!user) {
    return res.status(404).json({ message: "No user matches !" });
  } else {
    res.status(200).json({ userId });
    next();
  }
};
