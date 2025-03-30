const express = require("express");
const { getInventory, addItem } = require("../controllers/inventoryController");
const router = express.Router();

router.get("/", getInventory);
router.post("/add", addItem);

module.exports = router;
