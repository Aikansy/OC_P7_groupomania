// *************************************************************************************** IMPORT(S)

const router = require("express").Router();
const userControllers = require("../controllers/user_controllers");
const auth = require("../middlewares/auth");

// **************************************************************************************** ROUTE(S)

router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.signin);

router.get("/", auth, userControllers.findAllUsers);
router.get("/:id", auth, userControllers.findOneUser);
router.put("/:id", auth, userControllers.updateUser);
router.delete("/:id", auth, userControllers.deleteUser);

router.patch("/:id/follow", auth, userControllers.followUser);
router.patch("/:id/unfollow", auth, userControllers.unfollowUser);

// *************************************************************************************** EXPORT(S)

module.exports = router;
