const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const connectToDatabase = async () => {
  try {
    console.log(`Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = { connectToDatabase };
