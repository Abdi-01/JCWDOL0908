const express = require("express");
const router = express.Router();
const { CategoryController } = require("../controller");
const { tokenDecoder } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.post("/", tokenDecoder, isSuperAdmin, CategoryController.createNewCategory);

module.exports = router;
