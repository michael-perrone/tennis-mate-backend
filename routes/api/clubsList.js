const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const TennisClub = require("../../models/TennisClub");

router.get("/", async (req, res) => {
  let clubs = await TennisClub.find({});
  res.status(200).json({ clubs });
});

module.exports = router;
