const express = require("express");
const router = express.Router();
const { AdminTransactionController } = require("../controller");
const { tokenDecoder, isAdmin } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.get("/", tokenDecoder, isAdmin, AdminTransactionController.getUserTransactions);
router.patch("/:id_transaction/reject", tokenDecoder, isAdmin, AdminTransactionController.rejectPayment);
router.patch("/:id_transaction/approve", tokenDecoder, isAdmin, AdminTransactionController.approvePayment);

module.exports = router;
