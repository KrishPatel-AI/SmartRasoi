const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root Route to Prevent "Cannot GET /" Error
app.get("/", (req, res) => {
  res.send("Welcome to the AI-Powered Smart Kitchen API!");
});

// Predict Waste Amount (Dummy Response for Now)
app.post("/predict", async (req, res) => {
  try {
    const inputData = req.body;
    console.log("Received Data:", inputData);

    // Mock Prediction (Replace with Actual Logic Later)
    const predictedWaste = Math.random() * 100;

    res.json({ predicted_waste_amount: parseFloat(predictedWaste.toFixed(2)) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
