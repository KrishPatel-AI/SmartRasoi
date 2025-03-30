const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI; // ✅ Use environment variable

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectMongoDB() {
  try {
    await client.connect(); // ✅ Connect to MongoDB Atlas
    await client.db("admin").command({ ping: 1 }); // ✅ Ping the DB
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); // ❌ Exit the process if connection fails
  }
}

module.exports = connectMongoDB;
