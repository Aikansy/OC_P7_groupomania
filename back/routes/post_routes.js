// *************************************************************************************** IMPORT(S)

const router = require("express").Router();
const postControllers = require("../controllers/post_controllers");
const auth = require("../middlewares/auth");

// **************************************************************************************** ROUTE(S)

router.get("/", auth, postControllers.findAllPost);
router.get("/:id", auth, postControllers.FindOnePost);
router.post("/", auth, postControllers.createPost);
router.put("/:id", auth, postControllers.updatePost);
router.delete("/:id", auth, postControllers.deletePost);

router.patch("/:id/like", auth, postControllers.likePost);
router.patch("/:id/unlike", auth, postControllers.unlikePost);

router.patch("/:id/comment", auth, postControllers.createCommentPost);
router.patch("/:id/uncomment", auth, postControllers.deleteCommentPost);

// *************************************************************************************** EXPORT(S)

module.exports = router;
