const mongoose = require("mongoose");

const WasteSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  wastedAmount: { type: Number, required: true },
  reason: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WasteLog", WasteSchema);
