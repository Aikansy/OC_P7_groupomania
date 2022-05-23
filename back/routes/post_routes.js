// *************************************************************************************** IMPORT(S)

const router = require("express").Router();
const postControllers = require("../controllers/post_controllers");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer_post");
const checkRights = require("../middlewares/check_postrights");

// **************************************************************************************** ROUTE(S)

router.get("/", postControllers.findAllPosts);
router.get("/:id", postControllers.FindOnePost);
router.post("/", auth, multer, postControllers.createPost);
router.put("/:id", auth, postControllers.updatePost);
router.post("/:id", auth, checkRights, multer, postControllers.updateImagePost);
router.delete("/:id", auth, checkRights, postControllers.deletePost);

router.patch("/:id/like", auth, postControllers.likePost);

router.get("/:id/comment", postControllers.findAllComments);
router.post("/:id/comment", auth, postControllers.createComment);
router.delete("/:id/comment", auth, postControllers.deleteComment);

// *************************************************************************************** EXPORT(S)

module.exports = router;
