# 05 - Authentification creation

## Auth file(s)/folder(s) creation

back:

    > (back) "mkdir middlewares"
    > (back/models) "touch auth.js"

## Auth creation

back/middlewares/auth.js:

```javascript
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.user;
require("dotenv").config({ path: "../back/config/config.env" });

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
      return res.status(404).json({
        message:
          "You were not found in our database. You cannot access our services !",
      });
    }
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({ message: "Unauthorized ID !" });
    }
    if (user.role === "admin") {
      return next();
    }
    if (req.body.userId && req.body.userId == userId) {
      return next();
    } else {
      return next();
    }
  } catch (error) {
    console.error(error);
    res.status(401).send(error);
  }
};
```

## Update config.env

back/config/config.env:

```
RANDOM_TOKEN_SECRET=<secret token>
```

## Auth import

#### User routes update

back/routes/user_routes.js:

```javascript
const auth = require("../middlewares/auth");

router.get("/", auth, userControllers.findAllUser);
router.get("/:id", auth, userControllers.findOneUser);
router.put("/:id", auth, userControllers.updateUser);
router.delete("/:id", auth, userControllers.deleteUser);

router.patch("/:id/follow", auth, userControllers.followUser);
router.patch("/:id/unfollow", auth, userControllers.unfollowUser);
```

#### Post routes update

back/routes/post_routes.js:

```javascript
const auth = require("../middlewares/auth");

router.get("/", auth, postControllers.findAllPost);
router.get("/:id", auth, postControllers.FindOnePost);
router.post("/:id", auth, postControllers.createPost);
router.put("/:id", auth, postControllers.updatePost);
router.delete("/:id", auth, postControllers.deletePost);

router.patch("/:id/like", auth, postControllers.likePost);
router.patch("/:id/unlike", auth, postControllers.unlikePost);

router.patch("/:id/comment", auth, postControllers.createComment);
router.patch("/:id/uncomment", auth, postControllers.deleteComment);
```
