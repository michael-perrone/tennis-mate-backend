const express = require("express");
const router = express.Router();
const authUser = require("../../middleware/authUser");

const UserProfile = require("../../models/UserProfile");
const User = require("../../models/User");

router.get("/myprofile", authUser, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["firstName", "lastName"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    if (profile) {
      console.log("im here!");
      res.status(200).json({ profile });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", authUser, async (req, res) => {
  if (req.body) {
    const profileFields = {};
    profileFields.user = req.user.id;
    console.log(profileFields.user);
    if (req.body.yearsOfPlaying) {
      profileFields.yearsOfPlaying = req.body.yearsOfPlaying;
    }
    if (req.body.experience) {
      profileFields.experience = req.body.experience;
    }
    if (req.body.lookingFor) {
      profileFields.lookingFor = req.body.lookingFor;
    }
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }
  }
});

module.exports = router;
