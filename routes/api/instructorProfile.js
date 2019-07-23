const express = require("express");
const router = express.Router();
const instructorAuth = require("../../middleware/authInstructor");
const InstructorProfile = require("../../models/InstructorProfile");

router.get("/myprofile", instructorAuth, async (req, res) => {
  try {
    let profile = await InstructorProfile.findOne({
      instructor: req.instructor.id
    }).populate("instructor", ["firstName", "lastName", "tennisClub"]);
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this instructor" });
    }

    if (profile) {
      return res.status(200).json({ profile });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.post("/", instructorAuth, async (req, res) => {
  try {
    let profileFields = {};
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

    console.log(profileFields, "im here");
    if (instructorProfile) {
      console.log("i exist");
      instructorProfile = await InstructorProfile.findOneAndUpdate(
        { instructor: req.instructor.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(instructorProfile);
    } else {
      console.log("im hereeeeee");
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
    const profiles = await InstructorProfile.find().populate("user", [
      "firstName",
      "lastName"
    ]);
    res.json(profiles);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});
router.get("/user/:user_id", async (req, res) => {
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
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User Removed" });
  } catch (error) {
    res.send(error.msg);
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

module.exports = router;
