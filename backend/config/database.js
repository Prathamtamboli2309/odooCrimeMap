// database.js

const mongoose = require("mongoose");
require("dotenv").config(); // Corrected syntax to execute dotenv config function

const connectDB = async () => {
  try {
    // MongoDB connection string
    const uri = process.env.DATABASE_URL;

    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
