const express = require("express");
const router = express.Router();
const TennisClub = require("../../models/TennisClub");
const adminAuth = require("../../middleware/authAdmin");
const ClubProfile = require("../../models/Admin");

router.get("/adminprofile", adminAuth, async (req, res) => {
  try {
    let clubProfile = await ClubProfile.findOne({ admin });
  } catch (error) {
    console.log(error);
  }
});
