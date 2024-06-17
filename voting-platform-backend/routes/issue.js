const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createIssue, getIssues } = require("../controllers/issueController");

// @route   POST /api/issues
// @desc    Create an issue
// @access  Private
router.post("/", auth, createIssue);

// @route   GET /api/issues
// @desc    Get all issues
// @access  Public
router.get("/", getIssues);

module.exports = router;
