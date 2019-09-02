const express = require("express");
const router = express.Router();
const Instructor = require("../../models/Instructor");

router.get("/", async (req, res) => {
  const instructorPossibilities = await Instructor.find({});
  if (instructorPossibilities) {
    return res.status(200).json({ instructorPossibilities });
  }
});

module.exports = router;
