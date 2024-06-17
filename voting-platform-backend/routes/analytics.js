const express = require("express");
const router = express.Router();
const {
  getExperienceAnalytics,
  getIssueAnalytics,
} = require("../controllers/analyticsController");

// @route   GET /api/analytics/experiences
// @desc    Get analytics for experiences
// @access  Public
router.get("/experiences", getExperienceAnalytics);

// @route   GET /api/analytics/issues
// @desc    Get analytics for issues
// @access  Public
router.get("/issues", getIssueAnalytics);

module.exports = router;
