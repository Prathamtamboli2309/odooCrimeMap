const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crimeReportRoutes = require("./routes/CrimeReportsRoute");
const connectDB = require("./config/database");
const users = require("./routes/UsersRoute");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/report", crimeReportRoutes);
app.use("/api/users", users);

// MongoDB connection
connectDB();
// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
