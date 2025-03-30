const Inventory = require("../models/Inventory");

const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addItem = async (req, res) => {
  try {
    const { itemName, quantity } = req.body;
    const newItem = new Inventory({ itemName, quantity });
    await newItem.save();
    res.json({ message: "Item Added", item: newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getInventory, addItem };
