const WasteLog = require("../models/WasteLog");

const logWaste = async (req, res) => {
  try {
    const { itemName, wastedAmount, reason } = req.body;
    const wasteEntry = new WasteLog({ itemName, wastedAmount, reason });
    await wasteEntry.save();
    res.json({ message: "Waste Logged", wasteEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { logWaste };
