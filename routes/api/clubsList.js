const express = require("express");
const router = express.Router();
const ClubProfile = require("../../models/ClubProfile");
const TennisClub = require("../../models/TennisClub");
const authUser = require("../../middleware/authUser");

router.get("/", authUser, async (req, res) => {
  console.log(req.user);
  let clubProfiles = [];
  let allClubs = await TennisClub.find({}).populate("clubProfile", [
    "instructors",
    "services",
    "bio"
  ]);

  for (let i = 0; i < allClubs.length; i++) {
    let clubProfile = await ClubProfile.findOne({
      tennisClub: allClubs[i]._id
    });
    clubProfiles.push({ profile: clubProfile, clubs: allClubs[i] });
  }

  res.status(200).json({ clubs: clubProfiles });
});

module.exports = router;
