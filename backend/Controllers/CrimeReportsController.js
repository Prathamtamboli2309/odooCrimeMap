const CrimeReport = require("../models/CrimeReports");
const upload = require("../config/multerConfig"); // Adjust path as per your Multer setup
const path = require("path");
// Create a new crime report

exports.createReport = async (req, res) => {
  try {
    // Data retrieval
    const { type, location, description, anonymous } = req.body;

    // Parse location string into an object
    const [latitude, longitude] = location
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    const locationObj = { latitude, longitude };

    // Image file retrieval
    const mediaFiles = req.files || [];

    // Validate image types (if applicable)
    for (const file of mediaFiles) {
      const supportedTypes = ["jpg", "png", "jpeg"];
      const fileType = path.extname(file.originalname).toLowerCase();
      if (!supportedTypes.includes(fileType.substr(1))) {
        return res.status(400).json({
          success: false,
          message: "Unsupported file type",
        });
      }
    }

    // Create paths array for database storage
    const mediaPaths = mediaFiles.map((file) => file.path.replace(/\\/g, "/"));

    // Create new crime report
    const newReport = new CrimeReport({
      type,
      location: locationObj,
      description,
      media: mediaPaths, // Store array of file paths with forward slashes
      anonymous,
      status: "pending",
      date: Date.now(),
    });

    // Save the new report
    await newReport.save();

    res.status(201).json({
      success: true,
      message: "Report created successfully",
      report: newReport,
    });
  } catch (error) {
    console.error("Create report error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Additional CRUD operations for crime reports (if needed)
exports.getAllReports = async (req, res) => {
  try {
    const reports = await CrimeReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await CrimeReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status500.json({ error: error.message });
  }
};

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

// Update report status by ID
exports.updateReportStatus = async (req, res) => {
  const { id, action } = req.params;

  try {
    let updatedStatus;
    if (action === "accept") {
      updatedStatus = "accepted";
    } else if (action === "reject") {
      updatedStatus = "rejected";
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action" });
    }

    const updatedReport = await CrimeReport.findByIdAndUpdate(
      id,
      { status: updatedStatus },
      { new: true }
    );

    if (!updatedReport) {
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });
    }

    res.status(200).json({ success: true, data: updatedReport });
  } catch (error) {
    console.error("Error updating report status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getSearch = async (req, res) => {
  const { type, startDate, endDate, location } = req.query;
  console.log(req.query);
  try {
    let query = {};

    // Build query based on provided search criteria
    if (type) {
      query.type = type;
    }
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (location) {
      query.location = { $regex: location, $options: "i" }; // Case-insensitive search
    }

    const reports = await CrimeReport.find(query);
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error searching reports:", error);
    res.status(500).json({ error: "Error searching reports" });
  }
};
