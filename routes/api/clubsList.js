const mongoose = require("mongoose");
const express = "express";
const router = express.Router();
const TennisClub = require("../../models/TennisClub");

router.get("/", async (req, res) => {
  let clubs = TennisClub.find({});
  res.status(200).json({ clubs });
});
