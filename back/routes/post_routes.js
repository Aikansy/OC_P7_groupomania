// *************************************************************************************** IMPORT(S)

const router = require("express").Router();
const postControllers = require("../controllers/post_controllers");
const auth = require("../middlewares/auth");

// **************************************************************************************** ROUTE(S)

router.get("/", auth, postControllers.findAllPosts);
router.get("/:id", auth, postControllers.FindOnePost);
router.post("/", auth, postControllers.createPost);
router.put("/:id", auth, postControllers.updatePost);
router.delete("/:id", auth, postControllers.deletePost);

router.patch("/:id/like", auth, postControllers.likePost);
router.patch("/:id/unlike", auth, postControllers.unlikePost);

router.get("/:id/comment", postControllers.findAllComments);
router.post("/:id/comment", auth, postControllers.createComment);
router.put("/:id/comment", auth, postControllers.updateComment);
router.delete("/:id/comment", auth, postControllers.deleteComment);

// *************************************************************************************** EXPORT(S)

module.exports = router;
