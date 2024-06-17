const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  problems: [String],
  description: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  date: { type: Date, default: Date.now },
});

IssueSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Issue", IssueSchema);
