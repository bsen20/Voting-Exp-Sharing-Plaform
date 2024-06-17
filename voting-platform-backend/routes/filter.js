const express = require("express");
const router = express.Router();
const {
  filterExperience,
  filterIssue,
} = require("../controllers/filterController");

router.post("/experiences", filterExperience);

router.post("/issues", filterIssue);

module.exports = router;
