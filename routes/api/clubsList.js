const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const ClubProfile = require("../../models/ClubProfile");
const TennisClub = require("../../models/TennisClub");
const authUser = require("../../middleware/authUser");

router.get("/clubsFromCurrentLocation", authUser, async (req, res) => {
  let user = await User.findOne({ _id: req.user.id });
  console.log("WDWHDJWHDJAHDWJHDJWAHDJWAHDAJWHD", user);
  let tennisClubsFromCity = await TennisClub.find({ city: user.locationTown });
  if (tennisClubsFromCity.length > 0) {
    let clubsAndProfilesToSendBack = [];
    for (let i = 0; i < tennisClubsFromCity.length; i++) {
      let profile = ClubProfile.findOne({ tennisClub: tennisClubsFromCity[i] });
      if (profile) {
        clubsAndProfilesToSendBack.push({
          club: tennisClubsFromCity[i],
          profile
        });
      }
    }
    return res
      .status(200)
      .json({ clubsFromLocation: clubsAndProfilesToSendBack });
  } else {
    let tennisClubFromState = await TennisClub.find({
      state: user.locationState
    });
    let clubsAndProfileFromState = [];
    if (tennisClubFromState.length > 0) {
      for (let z = 0; z < tennisClubFromState.length; z++) {
        let profileFromState = await ClubProfile.findOne({
          tennisClub: tennisClubFromState[z]._id
        });
        console.log(profileFromState);
        if (profileFromState) {
          clubsAndProfileFromState.push({
            club: tennisClubFromState[z],
            profile: profileFromState
          });
        }
      }
    }

    return res
      .status(200)
      .json({ clubsFromLocation: clubsAndProfileFromState });
  }
});

router.post("/clubSearch", authUser, async (req, res) => {
  if (req.body.state !== "" && req.body.zip === "" && req.body.city === "") {
    let tennisClubsByState = await TennisClub.find({ state: req.body.state });
    if (tennisClubsByState.length > 0) {
      let clubAndProfileState = [];
      for (let i = 0; i < tennisClubsByState.length; i++) {
        let clubProfileFound = await ClubProfile.findOne({
          tennisClub: tennisClubsByState[i]._id
        });
        if (clubProfileFound) {
          console.log("hello");
          clubAndProfileState.push({
            club: tennisClubsByState[i],
            profile: clubProfileFound
          });
        }
      }
      return res.json({ tennisClubsBack: clubAndProfileState });
    }
  } else if (
    req.body.state === "" &&
    req.body.zip !== "" &&
    req.body.city === ""
  ) {
    let tennisClubsByZip = await TennisClub.find({ zip: req.body.zip });
    if (tennisClubsByZip.length > 0) {
      let clubsAndProfileZip = [];
      for (let i = 0; i < tennisClubsByZip.length; i++) {
        let clubProfileFound = await ClubProfile.findOne({
          tennisClub: tennisClubsByZip[i]._id
        });
        if (clubProfileFound) {
          clubsAndProfileZip.push({
            club: tennisClubsByZip[i],
            profile: clubProfileFound
          });
        }
      }
      return res.json({ tennisClubsBack: clubsAndProfileZip });
    }
  } else if (
    req.body.state === "" &&
    req.body.zip === "" &&
    req.body.city !== ""
  ) {
    let tennisClubsByCity = await TennisClub.find({ city: req.body.city });
    if (tennisClubsByCity.length > 0) {
      let clubAndProfileCity = [];
      for (let i = 0; i < tennisClubsByCity.length; i++) {
        let profileFound = await ClubProfile.findOne({
          tennisClub: tennisClubsByCity[i]._id
        });
        if (profileFound) {
          clubAndProfileCity.push({
            club: tennisClubsByCity[i],
            profile: profileFound
          });
        }
      }
      return res.json({ tennisClubsBack: clubAndProfileCity });
    } else {
      let allClubs = await TennisClub.find({});
      let clubsThatMatchCity = [];
      for (let i = 0; i < allClubs.length; i++) {
        if (allClubs[i].city.includes(req.body.city)) {
          clubsThatMatchCity.push(allClubs[i]);
        }
      }
      let clubsAndProfile = [];
      for (let z = 0; z < clubsThatMatchCity.length; z++) {
        let clubProfileFound = await ClubProfile.findOne({
          tennisClub: clubsThatMatchCity[z]._id
        });
        if (clubProfileFound) {
          clubsAndProfile.push({
            club: clubsThatMatchCity[z],
            profile: clubProfileFound
          });
        }
      }
      if (clubsAndProfile.length > 0) {
        return res.status(200).json({ tennisClubsBack: clubsAndProfile });
      }
    }
  }
});

module.exports = router;
