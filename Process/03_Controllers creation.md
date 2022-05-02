# 03 - Create controllers

## Controllers file(s)/folder(s) creation

back:

    > (back) "mkdir controllers"
    > (back) "mkdir routes"
    > (back/controllers) "touch user_controllers.js"
    > (back/controllers) "touch post_controllers.js"
    > (back/routes) "touch user_routes.js"
    > (back/routes) "touch post_routes.js"
    > (back/models) "touch user_model.js)
    > (back/models) "touch post_model.js)

## Routes handlers

back/app/app.js:

```javascript
const userRoutes = require("../routes/user_routes");
const postRoutes = require("../routes/post_routes");

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
```

## Routes

back/routes/user_routes.js:

```javascript
const router = require("express").Router();
const userControllers = require("../controllers/user_controllers");

router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.signin);

router.get("/", userControllers.findAllUser);
router.get("/:id", userControllers.findOneUser);
router.post("/", userControllers.createUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

router.patch("/:id/follow", userControllers.followUser);
router.patch("/:id/unfollow", userControllers.unfollowUser);

module.exports = router;
```

back/routes/post_routes.js:

```javascript
const router = require("express").Router();
const postControllers = require("../controllers/post_controllers");

router.get("/", postControllers.findAllPost);
router.get("/:id", postControllers.FindOnePost);
router.post("/", postControllers.createPost);
router.put("/:id", postControllers.updatePost);
router.delete("/:id", postControllers.deletePost);

router.patch("/:id/like", postControllers.likePost);
router.patch("/:id/unlike", postControllers.unlikePost);

router.patch("/:id/comment", postControllers.createCommentPost);
router.patch("/:id/uncomment", postControllers.deleteCommentPost);

module.exports = router;
```

## Controllers

back/controllers/user_controllers.js:

```javascript
const db = require("../models/index");
const User = db.user;
const Post = db.posts;

exports.signup = async (req, res, next) => {};

exports.signin = async (req, res, next) => {};

exports.findAllUser = async (req, res, next) => {};

exports.findOneUser = async (req, res, next) => {};

exports.createUser = async (req, res, next) => {};

exports.updateUser = async (req, res, next) => {};

exports.deleteUser = async (req, res, next) => {};

exports.followUser = async (req, res, next) => {};

exports.unfollowUser = async (req, res, next) => {};
```

back/controllers/post_controllers.js:

```javascript
const db = require("../models/index");
const User = db.user;
const Post = db.posts;

exports.findAllPost = async (req, res, next) => {};

exports.FindOnePost = async (req, res, next) => {};

exports.createPost = async (req, res, next) => {};

exports.updatePost = async (req, res, next) => {};

exports.deletePost = async (req, res, next) => {};

exports.likePost = async (req, res, next) => {};

exports.unlikePost = async (req, res, next) => {};

exports.createCommentPost = async (req, res, next) => {};

exports.deleteCommentPost = async (req, res, next) => {};
```

## Models

back/models/user_model.js

```javascript
module.exports = (sequelize, Sequelize) => {};
```

back/models/post_model.js

```javascript
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {};
```
