const express = require("express");
const router = express.Router();
const Instructor = require("../../models/Instructor");

router.post("/instructorSearch", async (req, res) => {
  let allInstructors = await Instructor.find({});
  let instructorsFromSearch = [];
  for (let i = 0; i < allInstructors.length; i++) {
    if (
      allInstructors[i].fullName
        .toLowerCase()
        .includes(req.body.name.toLowerCase())
    ) {
      instructorsFromSearch.push(allInstructors[i]);
    }
  }

  if (instructorsFromSearch.length > 0) {
    res.status(200).json({ instructors: instructorsFromSearch });
  }
});

module.exports = router;
