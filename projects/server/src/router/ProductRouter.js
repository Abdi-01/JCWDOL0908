const express = require("express");
const router = express.Router();
const { ProductController } = require("../controller");
const { tokenDecoder, isAdmin, isUser } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.post("/", tokenDecoder, isAdmin, isSuperAdmin, ProductController.postNewProduct);
router.get("/", tokenDecoder, isUser, ProductController.getProducts);

module.exports = router;
