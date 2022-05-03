// *************************************************************************************** IMPORT(S)

const router = require("express").Router();
const postControllers = require("../controllers/post_controllers");
const auth = require("../middlewares/auth");

// **************************************************************************************** ROUTE(S)

router.get("/", auth, postControllers.findAllPost);
router.get("/:id", auth, postControllers.FindOnePost);
router.post("/:id", auth, postControllers.createPost);
router.put("/:id", auth, postControllers.updatePost);
router.delete("/:id", auth, postControllers.deletePost);

router.patch("/:id/like", auth, postControllers.likePost);
router.patch("/:id/unlike", auth, postControllers.unlikePost);

router.patch("/:id/comment", auth, postControllers.createComment);
router.patch("/:id/uncomment", auth, postControllers.deleteComment);

// *************************************************************************************** EXPORT(S)

module.exports = router;
