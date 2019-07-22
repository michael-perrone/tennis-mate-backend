const express = require("express");
const router = express.Router();
const instructorAuth = require("../../middleware/authInstructor");
const InstructorProfile = require("../../models/InstructorProfile");

router.get("/myprofile", instructorAuth, async (req, res) => {
  let profile = InstructorProfile.findOne({ id: req.instructor.id }).populate(
    "instructor",
    ["firstName", "lastName", "tennisClub"]
  );
  try {
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    if (profile) {
      return res.status(200).json({ profile });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  if (req.body) {
    const profileFields = {};
    if (req.body.jobTitle) profileFields.jobTite === req.body.jobTitle;
    profileFields.clubName = req.instructor.clubName;
  }
});

module.exports = router;
