const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crimeReportRoutes = require("./routes/CrimeReportsRoute");
const connectDB = require("./config/database");
const users = require("./routes/UsersRoute");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinay");
const app = express();

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));
// Middleware
app.use(bodyParser.json());
app.use(cors());
// Routes
app.use("/api/report", crimeReportRoutes);
app.use("/api/users", users);

// MongoDB connection
connectDB();
cloudinaryConnect();
// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
