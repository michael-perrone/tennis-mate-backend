const express = require("express");
const router = express.Router();
const TennisClub = require("../../models/TennisClub");
const adminAuth = require("../../middleware/authAdmin");
const ClubProfile = require("../../models/ClubProfile");

router.get("/myclub", adminAuth, async (req, res) => {
  console.log(req.admin);
  try {
    let clubs = await ClubProfile.find({});
    let clubProfile = await ClubProfile.findOne({
      tennisClub: req.admin.clubId
    }).populate("tennisClub", ["clubname"]);
    if (!clubProfile) {
      return res.status(200).json({ profileCreated: false });
    }
    if (clubProfile) {
      return res.status(200).json({ clubProfile, profileCreated: true });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", adminAuth, async (req, res) => {
  try {
    console.log(req.body.instructors, "hi");
    let clubProfileFields = {};
    let instructorsArray = [];
    let servicesArray = [];

    if (req.body.instructors && req.body.instructors.length > 0) {
      for (let i = 0; i < req.body.instructors.length; i++) {
        instructorsArray.push(req.body.instructors[i]);
      }
      clubProfileFields.instructors = instructorsArray;
    }

    if (req.body.services && req.body.services.length > 0) {
      for (let i = 0; i < req.body.services.length; i++) {
        servicesArray.push(req.body.services[i]);
      }
      clubProfileFields.services = servicesArray;
    }

    if (servicesArray.length > 0) {
      clubProfileFields.services = servicesArray;
    }

    if (req.body.bio) {
      clubProfileFields.bio = req.body.bio;
    }

    let clubProfile = await ClubProfile.findOne({
      tennisClub: req.admin.clubId
    });

    clubProfileFields.tennisClub = req.admin.clubId;

    if (clubProfile) {
      console.log("HER3WJWKJQWKEJQKWJEQWKEJQKWJEWKQJEK");
      clubProfile = await ClubProfile.findOneAndUpdate(
        { tennisClub: req.admin.clubId },
        { $set: clubProfileFields },
        { new: true }
      );
      return res.json(clubProfile);
    } else {
      console.log("creating");
      clubProfile = new ClubProfile(clubProfileFields);
      await clubProfile.save();
      res.json(clubProfile);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
