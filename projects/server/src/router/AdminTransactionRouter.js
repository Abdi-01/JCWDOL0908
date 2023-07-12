const express = require("express");
const router = express.Router();
const { AdminTransactionController } = require("../controller");
const { tokenDecoder, isAdmin } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.get("/", tokenDecoder, isAdmin, AdminTransactionController.getUserTransactions);

module.exports = router;
