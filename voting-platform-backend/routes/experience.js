const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createExperience,
  getExperiences,
} = require("../controllers/experienceController");

// @route   POST /api/experiences
// @desc    Create an experience
// @access  Private
router.post("/", auth, createExperience);

// @route   GET /api/experiences
// @desc    Get all experiences
// @access  Public
router.get("/", getExperiences);

module.exports = router;
