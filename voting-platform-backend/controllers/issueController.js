const Issue = require("../models/Issue");

let io;

const init = (socketio) => {
  io = socketio;
};

const createIssue = async (req, res) => {
  const { description, location, severity, problems } = req.body;

  try {
    const newIssue = new Issue({
      user: req.user.id,
      description,
      location,
      severity,
      problems,
    });

    const issue = await newIssue.save();
    io.emit("newIssue", issue); // Emit event
    res.json(issue);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("user", ["username"]);
    res.json(issues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { createIssue, getIssues, init };
