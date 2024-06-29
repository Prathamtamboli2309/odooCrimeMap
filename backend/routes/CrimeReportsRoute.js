const express = require("express");
const router = express.Router();
const crimeReportController = require("../Controllers/CrimeReportsController");
const upload = require("../config/multerConfig");

// Create a new crime report with media uploads
// Create a new crime report
router.post("/new", upload.array("media"), crimeReportController.createReport);

// Other routes...

// Get all crime reports
router.get("/all", crimeReportController.getAllReports);

// Get a single crime report by ID
router.get("/reports/:id", crimeReportController.getReportById);

// PUT request to update report status by ID
router.put("/:id/:action", crimeReportController.updateReportStatus);

// Delete a crime report
router.delete("/reports/:id", crimeReportController.deleteReport);

module.exports = router;
