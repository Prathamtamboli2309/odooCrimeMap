const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const CrimeReportSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  location: {
    type: LocationSchema,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  media: {
    type: [String],
    default: [],
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "resolved"],
    default: "pending",
  },
});

module.exports = mongoose.model("CrimeReport", CrimeReportSchema);
