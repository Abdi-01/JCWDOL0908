const express = require("express");
const router = express.Router();
const { MutationController } = require("../controller");
const { tokenDecoder, isAdmin, isUser } = require("../middleware/TokenDecoder");
const { isSuperAdmin } = require("../middleware/IsSuperAdmin");

router.post("/", tokenDecoder, isAdmin, MutationController.createNewMutationRequest);

module.exports = router;
