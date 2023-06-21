const express = require("express");
const router = express.Router();
const { ProductController } = require("../controller");
const { tokenDecoder } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.post("/", tokenDecoder, isSuperAdmin, ProductController.postNewProduct);

module.exports = router;
