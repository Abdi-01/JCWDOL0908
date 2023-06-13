const express = require("express");
const router = express.Router();
const { AdminWarehouseController } = require("../controller");
const { tokenDecoder } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.get("/", tokenDecoder, isSuperAdmin, AdminWarehouseController.getAllWarehouse);
router.patch("/delete/:id_warehouse", tokenDecoder, isSuperAdmin, AdminWarehouseController.deleteWarehouse);

module.exports = router;
