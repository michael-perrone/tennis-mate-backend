const router = require("express").Router();
const TennisClub = require("../../models/TennisClub");
const ClubProfile = require("../../models/ClubProfile");

router.post("/", async (req, res) => {
  const clubAndProfileInfo = {};
  const individualTennisClub = await TennisClub.findOne({
    clubNameAllLower: req.body.clubName
  });
  clubAndProfileInfo.club = individualTennisClub;

  if (individualTennisClub) {
    const clubsProfile = await ClubProfile.findOne({
      tennisClub: individualTennisClub._id
    });
    clubAndProfileInfo.profile = clubsProfile;
  }

  res.status(200).json({ tennisClub: clubAndProfileInfo });
});

module.exports = router;
