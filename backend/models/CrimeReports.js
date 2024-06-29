const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrimeReportSchema = new Schema({
  type: { type: String, required: true },
  location: { type: { lat: Number, lng: Number }, required: true },
  time: { type: Date, default: Date.now },
  description: { type: String },
  media: { type: [String] }, // URLs to photos/videos
  anonymous: { type: Boolean, default: false },
});

module.exports = mongoose.model("crimereports", CrimeReportSchema);
