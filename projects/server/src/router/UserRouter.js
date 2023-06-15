const express = require("express");
const router = express.Router();
const { UserController } = require("../controller");
const { CheckAuth } = require("../middleware/UserMiddleware");

router.get("/", UserController.GetUser);
router.put("/update-bio", CheckAuth, UserController.UpdateBio);
router.put("/update-password", CheckAuth, UserController.UpdatePassword);
router.put("/update-avatar", CheckAuth, UserController.UpdateProfilePicture);


module.exports = router;