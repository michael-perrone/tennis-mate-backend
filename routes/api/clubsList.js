const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ClubProfile = require("../../models/ClubProfile");
const TennisClub = require("../../models/TennisClub");

router.get("/", async (req, res) => {
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
  

  const clubInfoToSendBack = [];

  res.status(200).json({ clubs: clubProfiles });
});

module.exports = router;
