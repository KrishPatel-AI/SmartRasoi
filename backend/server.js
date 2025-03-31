const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
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
const FLASK_API_URL = process.env.FLASK_API_URL || "http://127.0.0.1:5000"; // Flask API URL

// ✅ Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Routes
app.use("/api/inventory", inventoryRoutes);
app.use("/api/waste", wasteRoutes);

// ✅ Route to send images to Flask AI Model for classification
app.post("/api/classify-fruit", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    const response = await axios.post(`${FLASK_API_URL}/predict`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    res.json(response.data); // Send Flask AI prediction response to frontend
  } catch (error) {
    console.error("❌ Error connecting to Flask AI:", error.message);
    res.status(500).json({ error: "Failed to connect to AI model." });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
