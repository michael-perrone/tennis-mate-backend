const router = require("express").Router();
const TennisClub = require("../../models/TennisClub");

router.post("/", async (req, res) => {
  const individualTennisClub = await TennisClub.findOne({
    clubNameAllLower: req.body.clubName
  });

  res.status(200).json({ tennisClub: individualTennisClub });
});

module.exports = router;
