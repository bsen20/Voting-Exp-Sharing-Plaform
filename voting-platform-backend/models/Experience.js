const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  tags: [String],
  date: { type: Date, default: Date.now },
});
ExperienceSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Experience", ExperienceSchema);
