const express = require("express");
const router = express.Router();
const TennisClub = require("../../models/TennisClub");
const User = require("../../models/User");

router.post("/", async (req, res) => {
  const tennisClub = await TennisClub.findOne({
    clubNameAllLower: req.body.clubNameAllLower
  });
  console.log(req.body.clubNameAllLower);
  console.log(tennisClub);
  let users = await User.find({ _id: tennisClub.followers });

  const namesMatching = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].fullName.toLowerCase().includes(req.body.customerName)) {
      namesMatching.push({ name: users[i].fullName, id: users[i]._id });
    }
  }
  if (namesMatching.length > 0) {
    res.status(200).json({ customers: namesMatching });
  }
});

module.exports = router;
