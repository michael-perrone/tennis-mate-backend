const express = require("express");
const router = express.Router();
const authUser = require("../../middleware/authUser");

const UserProfile = require("../../models/UserProfile");
const User = require("../../models/User");

router.get("/myprofile", authUser, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id }).populate(
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
  try {
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

    let userProfile = await UserProfile.findOne({ user: req.user.id });
    if (userProfile) {
      console.log("fuck");
      userProfile = await UserProfile.findByIdAndUpdate(
        { userProfile: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(userProfile);
    } else {
      userProfile = new UserProfile(profileFields);
      await userProfile.save();
      res.json(userProfile);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const profiles = await UserProfile.find().populate("user", [
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
    const profile = await UserProfile.findOne({
      user: req.params.user_id
    }).populate("user", ["firstName", "lastName"]);
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile" });
    } else {
      res.send(profile);
    }
  } catch (error) {
    console.log(error.message);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "There is no user" });
    }
    res.status(500).send("server error");
  }
});

router.delete("/", authUser, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });

    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Removed" });
  } catch (error) {
    console.log(error);
    res.send(error.msg);
  }
});

module.exports = router;
