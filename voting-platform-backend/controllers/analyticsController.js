const Experience = require("../models/Experience");
const Issue = require("../models/Issue");

exports.getExperienceAnalytics = async (req, res) => {
  try {
    const experienceCount = await Experience.countDocuments();
    const locationAnalytics = await Experience.aggregate([
      { $group: { _id: "$location", count: { $sum: 1 } } },
    ]);
    const ratingAnakytics = await Experience.aggregate([
      { $group: { _id: "$rating", count: { $sum: 1 } } },
    ]);

    res.json({ experienceCount, locationAnalytics, ratingAnakytics });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getIssueAnalytics = async (req, res) => {
  try {
    const issueCount = await Issue.countDocuments();
    const locationAnalytics = await Issue.aggregate([
      { $group: { _id: "$location", count: { $sum: 1 } } },
    ]);
    const severityAnalytics = await Issue.aggregate([
      { $group: { _id: "$severity", count: { $sum: 1 } } },
    ]);

    res.json({ issueCount, severityAnalytics, locationAnalytics });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
