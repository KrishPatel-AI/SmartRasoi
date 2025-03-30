const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const connectMongoDB = require("./config/mongoDB");

const inventoryRoutes = require("./routes/inventoryRoutes");
const wasteRoutes = require("./routes/wasteRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB Atlas
connectMongoDB();

const PORT = process.env.PORT || 8080;
const FLASK_API_URL = process.env.FLASK_API_URL || "http://127.0.0.1:5000/"; // Flask API URL

// ✅ Routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/waste", wasteRoutes);

// ✅ Route to interact with Flask AI Model (Waste Prediction)
app.post("/api/predict-waste", async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_API_URL}/predict`, req.body);

    res.json(response.data); // Send Flask AI prediction response to frontend
  } catch (error) {
    console.error("❌ Error connecting to Flask AI:", error.message);
    res.status(500).json({ error: "Failed to connect to AI model." });
  }
});

// ✅ Route to interact with Flask AI Model (AI Recipe Generator)
app.post("/api/generate-recipe", async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_API_URL}/generate_recipe`, req.body);

    res.json(response.data); // Send Flask AI recipe response to frontend
  } catch (error) {
    console.error("❌ Error connecting to AI Recipe Generator:", error.message);
    res.status(500).json({ error: "Failed to generate recipe." });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
