const express = require("express");
const router = express.Router();
const TennisClub = require("../../models/TennisClub");
const adminAuth = require("../../middleware/authAdmin");
const ClubProfile = require("../../models/ClubProfile");

router.get("/myclub", adminAuth, async (req, res) => {
  console.log(req.admin);
  try {
    let clubs = await ClubProfile.find({});
    console.log(clubs);
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
    let clubProfileFields = {};
    let instructorsArray = [];
    let servicesArray = [];

    for (let i = 0; i < req.body.instructors.length; i++) {
      instructorsArray.push(req.body.instructors[i.toString()]);
    }

    if (instructorsArray.length > 0) {
      clubProfileFields.instructors = instructorsArray;
    }

    for (let i = 0; i < req.body.services.length; i++) {
      servicesArray.push(req.body.services[i.toString()]);
    }

    if (servicesArray.length > 0) {
      clubProfileFields.services = servicesArray;
    }

    if (req.body.bio) {
      clubProfileFields.bio = req.body.bio;
    }

    let clubProfile = await ClubProfile.findOne({
      tennisClub: req.tennisClub.id
    });

    if (clubProfile) {
      clubProfile = await clubProfile.findOneAndUpdate(
        { tennisClub: req.tennisClub.id },
        { $set: clubProfileFields },
        { new: true }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
