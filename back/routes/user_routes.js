// *************************************************************************************** IMPORT(S)

const router = require("express").Router();
const userControllers = require("../controllers/user_controllers");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer_profile");
const checkRights = require("../middlewares/check_profilerights");

// **************************************************************************************** ROUTE(S)

router.post("/signup", userControllers.signup);
router.post("/signin", userControllers.signin);

router.get("/", auth, userControllers.findAllUsers);
router.get("/:id", auth, userControllers.findOneUser);
router.put("/:id", auth, userControllers.updateUser);
router.post("/:id", auth, checkRights, multer, userControllers.updateImageUser);
router.delete("/:id", auth, userControllers.deleteUser);

// *************************************************************************************** EXPORT(S)

module.exports = router;
