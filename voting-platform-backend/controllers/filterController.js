const Experience = require("../models/Experience");
const Issue = require("../models/Issue");

const loactionFiltering = (location, radius, query) => {
  if (location && location.coordinates && radius) {
    query.location = {
      $geoWithin: {
        $centerSphere: [
          [location.coordinates[0], location.coordinates[1]],
          radius / 6378.1, // radius in radians (Earth's radius in kilometers)
        ],
      },
    };
  }
};

const filterExperience = async (req, res) => {
  const { rating, tags, location, radius } = req.body;
  console.log(req.body);
  let query = {};
  if (rating) {
    query.rating = { $in: rating };
  }

  if (tags && tags.length > 0) {
    query.tags = { $in: tags };
  }
  if (location && radius) {
    loactionFiltering(location, radius, query);
  }
  try {
    // console.log(query);
    const experiences = await Experience.find(query);
    // console.log(experiences);
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const filterIssue = async (req, res) => {
  const { severity, problems, location, radius } = req.body;
  let query = {};
  if (severity) {
    query.severity = { $gte: severity };
  }

  if (problems && problems.length > 0) {
    query.problems = { $in: problems };
  }
  if (location && radius) {
    loactionFiltering(location, radius, query);
  }
  try {
    const issue = await Issue.find(query);
    res.status(200).json(issue);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { filterExperience, filterIssue };
