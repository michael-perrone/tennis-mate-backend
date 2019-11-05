const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/authAdmin");
const ClubProfile = require("../../models/ClubProfile");
const Instructor = require("../../models/Instructor");

router.get("/myclub", adminAuth, async (req, res) => {
  try {
    let clubProfile = await ClubProfile.findOne({
      tennisClub: req.admin.clubId
    }).populate("tennisClub", ["clubname"]);
    if (clubProfile) {
      const instructorsToSendBack = await Instructor.find({
        _id: clubProfile.instructors
      });

      clubProfile.instructors = instructorsToSendBack;
      return res.status(200).json({ clubProfile, profileCreated: true });
    }
    if (!clubProfile) {
      return res.status(200).json({ profileCreated: false });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", adminAuth, async (req, res) => {
  try {
    console.log(req.body);
    const instructorsBeingCurrentlyAdded = [];
    let clubProfileFields = {};
    let servicesArray = [];
    let otherServices = [];

    if (req.body.services && req.body.services.length > 0) {
      for (let i = 0; i < req.body.services.length; i++) {
        servicesArray.push(req.body.services[i]);
      }
      clubProfileFields.services = servicesArray;
    }

    if (req.body.otherServices && req.body.otherServices.length > 0) {
      for (let i = 0; i < req.body.otherServices.length; i++) {
        otherServices.push(req.body.otherServices[i]);
      }
    }

    if (req.body.otherServices && req.body.otherServices.length > 0) {
      clubProfileFields.otherServices = otherServices;
    }

    if (servicesArray.length > 0) {
      clubProfileFields.services = servicesArray;
    }

    if (req.body.bio) {
      clubProfileFields.bio = req.body.bio;
    }

    let clubProfile = await ClubProfile.findOne({
      tennisClub: req.admin.clubId
    });

    clubProfileFields.tennisClub = req.admin.clubId;

    if (clubProfile) {
      clubProfile = await ClubProfile.findOneAndUpdate(
        { tennisClub: req.admin.clubId },
        { $set: clubProfileFields },
        { new: true }
      );
      return res.json({
        clubProfile,
        instructorsForInstantAdd: instructorsBeingCurrentlyAdded
      });
    } else {
      clubProfile = new ClubProfile(clubProfileFields);
      await clubProfile.save();
      res.json(clubProfile);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/instructorDeleteFromClub", async (req, res) => {
  try {
    let tennisClubProfile = await ClubProfile.findOne({
      tennisClub: req.body.tennisClub
    });
    tennisClubProfile.instructors = req.body.instructors;
    await tennisClubProfile.save();
    const instructorsToSendBack = [];
    for (let i = 0; i < req.body.instructors.length; i++) {
      let instructorForSending = await Instructor.findOne({
        _id: req.body.instructors[i]
      });
      instructorsToSendBack.push(instructorForSending);
    }

    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/addInstructorsToClub", async (req, res) => {
  console.log(req.body.instructors);
  try {
    let tennisClubProfile = await ClubProfile.findOne({
      tennisClub: req.body.tennisClub
    });
    if (tennisClubProfile) {
      console.log("here");
      function checkIfDuplicates() {
        let sendError = "No Error";
        for (let x = 0; x < req.body.instructors.length; x++) {
          for (let y = 0; y < tennisClubProfile.instructors.length; y++) {
            if (req.body.instructors[x] == tennisClubProfile.instructors[y]) {
              sendError = "You can not add the same instructor twice.";
              return sendError;
            }
          }
        }
        return sendError;
      }
      if (checkIfDuplicates() === "No Error") {
        let instructorsForInstantAdd = [];
        tennisClubProfile.instructors.push(...req.body.instructors);
        tennisClubProfile.save();
        for (let z = 0; z < req.body.instructors.length; z++) {
          let instructor = await Instructor.findOne({
            _id: req.body.instructors[z]
          });
          instructorsForInstantAdd.push(instructor);
          instructor.requestFrom = req.body.tennisClub;
          instructor.requestPending = true;
        }
        res.status(200).json({
          tennisClubProfile,
          instructorsForInstantAdd: instructorsForInstantAdd
        });
      } else {
        res.status(406).json({ error: checkIfDuplicates() });
      }
    } else {
      if (req.body.instructors.length > 0) {
        let clubProfile = new ClubProfile({
          instructors: req.body.instructors,
          tennisClub: req.body.tennisClub
        });
        await clubProfile.save();
        let instructorsForInstantAdd = [];
        for (let f = 0; f < req.body.instructors.length; f++) {
          let instructorForInstant = await Instructor.findOne({
            _id: req.body.instructors[f]
          });
          instructorsForInstantAdd.push(instructorForInstant);
        }
        res.status(200).json({
          clubProfile,
          instructorsForInstantAdd: instructorsForInstantAdd
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
