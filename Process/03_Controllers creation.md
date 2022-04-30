# 03 - Create controllers

## Controllers file(s)/folder(s) creation

back:

    > (back) "mkdir controllers"
    > (back) "mkdir routes"
    > (back/controllers) "touch user_controllers.js"
    > (back/controllers) "touch post_controllers.js"
    > (back/routes) "touch user_routes.js"
    > (back/routes) "touch post_routes.js"

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

router.patch("/follow/:id", userControllers.followUser);
router.patch("/unfollow/:id", userControllers.unfollowUser);

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

router.patch("/like/:id", postControllers.likePost);
router.patch("/unlike/:id", postControllers.unlikePost);

router.patch("/post-comment/:id", postControllers.createCommentPost);
router.patch("/delete-comment/:id", postControllers.deleteCommentPost);

module.exports = router;
```

## Controllers

back/controllers/user_controllers.js:

```javascript
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
