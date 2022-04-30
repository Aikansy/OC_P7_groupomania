// *************************************************************************************** IMPORT(S)

const router = require("express").Router();
const postControllers = require("../controllers/post_controllers");

// **************************************************************************************** ROUTE(S)

router.get("/", postControllers.findAllPost);
router.get("/:id", postControllers.FindOnePost);
router.post("/", postControllers.createPost);
router.put("/:id", postControllers.updatePost);
router.delete("/:id", postControllers.deletePost);

router.patch("/like/:id", postControllers.likePost);
router.patch("/unlike/:id", postControllers.unlikePost);

router.patch("/post-comment/:id", postControllers.createCommentPost);
router.patch("/delete-comment/:id", postControllers.deleteCommentPost);

// *************************************************************************************** EXPORT(S)

module.exports = router;
