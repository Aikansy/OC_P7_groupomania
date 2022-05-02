// *************************************************************************************** IMPORT(S)

const router = require("express").Router();
const postControllers = require("../controllers/post_controllers");

// **************************************************************************************** ROUTE(S)

router.get("/", postControllers.findAllPost);
router.get("/:id", postControllers.FindOnePost);
router.post("/", postControllers.createPost);
router.put("/:id", postControllers.updatePost);
router.delete("/:id", postControllers.deletePost);

router.patch("/:id/like", postControllers.likePost);
router.patch("/:id/unlike", postControllers.unlikePost);

router.patch("/:id/comment", postControllers.createCommentPost);
router.patch("/:id/uncomment", postControllers.deleteCommentPost);

// *************************************************************************************** EXPORT(S)

module.exports = router;
