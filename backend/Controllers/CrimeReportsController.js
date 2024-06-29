const CrimeReport = require("../models/CrimeReports");
const cloudinary = require("../config/cloudinay");
const fs = require("fs");
const path = require("path");

// Create a new crime report
exports.createReport = async (req, res) => {
  try {
    const { type, location, description, anonymous } = req.body;

    let media = [];

    if (req.files) {
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
          folder: "crime_reports",
        });
        media.push(result.secure_url);
        // Remove file after upload
        fs.unlinkSync(file.path);
      }
    }

    const report = new CrimeReport({
      type,
      location,
      description,
      media,
      anonymous,
    });

    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all crime reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await CrimeReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single crime report by ID
exports.getReportById = async (req, res) => {
  try {
    const report = await CrimeReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a crime report
exports.updateReport = async (req, res) => {
  try {
    const report = await CrimeReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a crime report
exports.deleteReport = async (req, res) => {
  try {
    const report = await CrimeReport.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
