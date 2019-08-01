const express = require("express");
const router = express.Router();
const Instructor = require("../../models/Instructor");
const instructorAuth = require("../../middleware/authInstructor");
const InstructorProfile = require("../../models/InstructorProfile");

router.get("/myprofile", instructorAuth, async (req, res) => {
  try {
    let instructorProfile = await InstructorProfile.findOne({
      instructor: req.instructor.id
    }).populate("instructor", ["firstName", "lastName", "tennisClub"]);
    if (!instructorProfile) {
      return res.status(200).json({ profileCreated: false });
    }

    if (instructorProfile) {
      return res.status(200).json({ instructorProfile, profileCreated: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.post("/", instructorAuth, async (req, res) => {
  try {
    let profileFields = {};
    profileFields.instructor = req.instructor.id;
    if (req.body.jobTitle) profileFields.jobTitle = req.body.jobTitle;
    if (req.body.yearsTeaching) {
      profileFields.yearsTeaching = req.body.yearsTeaching;
    }
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.previousCurrentRanking) {
      profileFields.previousCurrentRanking = req.body.previousCurrentRanking;
    }
    if (req.body.location) {
      profileFields.location = req.body.location;
    }

    profileFields.clubName = req.instructor.clubName;

    let instructorProfile = await InstructorProfile.findOne({
      instructor: req.instructor.id
    });

    if (instructorProfile) {
      instructorProfile = await InstructorProfile.findOneAndUpdate(
        { instructor: req.instructor.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(instructorProfile);
    } else {
      instructorProfile = new InstructorProfile(profileFields);
      await instructorProfile.save();
      res.json(instructorProfile);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const instructorProfiles = await InstructorProfile.find().populate(
      "instructor",
      ["firstName", "lastName"]
    );
    res.json(instructorProfiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});
router.get("/instructor/:instructor_id", async (req, res) => {
  try {
    const profile = await InstructorProfile.findOne({
      instructor: req.params.instructor_id
    }).populate("instructor", ["firstName", "lastname"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile" });
    } else {
      res.send(profile);
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "There is no profile for tis user" });
    }
    res.status(500).send("server error");
  }
});

router.delete("/", instructorAuth, async (req, res) => {
  try {
    await InstructorProfile.findOneAndRemove({ instructor: req.instructor.id });
    await Instructor.findOneAndRemove({ _id: req.instructor.id });
    res.json({ msg: "Instructor Removed" });
  } catch (error) {
    console.log(error);
    res.json({ msg: error });
    res.send("not good");
  }
});

router.put("/experience", instructorAuth, async (req, res) => {
  if (req.body) {
    const {
      jobTitle,
      clubName,
      location,
      from,
      to,
      description,
      current
    } = req.body;

    const newExp = {
      jobTitle,
      clubName,
      location,
      from,
      to,
      description,
      current
    };
    try {
      const profile = await Profile.findOne({ instructor: req.instuctor.id });
      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("server error");
    }
  }
});

router.delete("/", instructorAuth, async (req, res) => {
  try {
    await InstructorProfile.findOneAndDelete({ instructor: req.instructor.id });
    await Instructor.findOneAndRemove({ _id: req.instructor.id });

    res.json({ msg: "User Removed" });
  } catch (error) {
    console.log(error);
    res.send(error.msg);
  }
});

module.exports = router;
