const express = require("express");
const { logWaste } = require("../controllers/wasteController");
const router = express.Router();

router.post("/log", logWaste);

module.exports = router;
