const express = require("express");
const router = express.Router();
const TennisClub = require("../../models/TennisClub");
const User = require("../../models/User");

router.post("/", async (req, res) => {
  try {
    let subscriberExists = await TennisClub.find({
      subscribers: req.body.userId
    });
    if (subscriberExists) {
      return res
        .status(406)
        .json({ error: "You have already subscribed to this club" });
    }
    let tennisClub = await TennisClub.findOne({ _id: req.body.tennisClubId });
    if (tennisClub) {
      tennisClub.subscribers.unshift(req.body.userId);
      tennisClub.save();
    }
    let user = await User.findOne({ _id: req.body.userId });
    if (user) {
      user.clubsSubscribedTo.unshift(req.body.tennisClubId);
      user.save();
    }

    if (user && tennisClub) {
      res.status(200).json({ user, tennisClub });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
