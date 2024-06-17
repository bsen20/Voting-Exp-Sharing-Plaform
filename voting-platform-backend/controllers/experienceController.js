const Experience = require("../models/Experience");

let io;

const init = (socketio) => {
  io = socketio;
};

const createExperience = async (req, res) => {
  const { rating, description, location, tags } = req.body;

  try {
    const newExperience = new Experience({
      user: req.user.id,
      rating,
      description,
      location,
      tags,
    });

    const experience = await newExperience.save();
    io.emit("newExperience", experience); // Emit event
    res.json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().populate("user", ["username"]);
    res.json(experiences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { createExperience, getExperiences, init };
