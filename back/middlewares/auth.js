// *************************************************************************************** IMPORT(S)

const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.user;
require("dotenv").config({ path: "../back/config/config.env" });

// ******************************************************************************************** AUTH

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findOne({
      where: {
        _id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found !" });
    }
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({ message: "Unauthorized ID !" });
    }
    if (user.role === "admin") {
      return next();
    }
    if (req.body.userId && req.body.userId == userId) {
      return next();
    }
  } catch (error) {
    console.error(error);
    res.status(401).send(error);
  }
};
