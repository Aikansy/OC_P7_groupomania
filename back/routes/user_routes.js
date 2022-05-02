// *************************************************************************************** IMPORT(S)

const router = require("express").Router();
const userControllers = require("../controllers/user_controllers");

// **************************************************************************************** ROUTE(S)

router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.signin);

router.get("/", userControllers.findAllUser);
router.get("/:id", userControllers.findOneUser);
router.post("/", userControllers.createUser);
router.put("/:id", userControllers.updateUser);
router.delete("/:id", userControllers.deleteUser);

router.patch("/:id/follow", userControllers.followUser);
router.patch("/:id/unfollow", userControllers.unfollowUser);

// *************************************************************************************** EXPORT(S)

module.exports = router;
