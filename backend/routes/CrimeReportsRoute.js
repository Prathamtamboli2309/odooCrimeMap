const express = require("express");
const router = express.Router();
const crimeReportController = require("../Controllers/CrimeReportsController");
const upload = require("../config/multerConfig");

// Create a new crime report with media uploads
router.post(
  "/report",
  upload.array("media"),
  crimeReportController.createReport
);

// Other routes...

// Get all crime reports
router.get("/reports", crimeReportController.getAllReports);

// Get a single crime report by ID
router.get("/reports/:id", crimeReportController.getReportById);

// Update a crime report
router.put(
  "/reports/:id",
  upload.array("media"),
  crimeReportController.updateReport
);

// Delete a crime report
router.delete("/reports/:id", crimeReportController.deleteReport);

module.exports = router;
