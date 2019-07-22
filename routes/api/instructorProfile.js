const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const InstructorProfile = require("../../models/InstructorProfile");

router.get("/myprofile", async (req, res) => {
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

router.post("/");

module.exports = router;
