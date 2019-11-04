const express = require("express");
const router = express.Router();
const TennisClub = require("../../models/TennisClub");
const adminAuth = require("../../middleware/authAdmin");
const ClubProfile = require("../../models/ClubProfile");
const Instructor = require("../../models/Instructor");

router.get("/myclub", adminAuth, async (req, res) => {
  try {
    let clubs = await ClubProfile.find({});
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
    let instructorsArray = [];
    let servicesArray = [];
    let otherServices = [];

    if (req.body.instructors && req.body.instructors.length > 0) {
      let tennisClub = await ClubProfile.findOne({
        tennisClub: req.body.tennisClub
      });

      if (tennisClub && tennisClub.instructors.length > 0) {
        const previousInstructorsAndNew = [...tennisClub.instructors];
        for (let i = 0; i < req.body.instructors.length; i++) {
          let loneInstructor = await Instructor.findById({
            _id: req.body.instructors[i]
          });
          loneInstructor.requestFrom = req.admin.clubId;
          loneInstructor.requestPending = true;
          instructorsBeingCurrentlyAdded.push({
            fullName: loneInstructor.fullName
          });
          previousInstructorsAndNew.push(req.body.instructors[i]);
          await loneInstructor.save();
        }
        clubProfileFields.instructors = previousInstructorsAndNew;
      } else {
        console.log("running");
        for (let i = 0; i < req.body.instructors.length; i++) {
          let loneInstructor = await Instructor.findById({
            _id: req.body.instructors[i]
          });
          loneInstructor.requestFrom = req.admin.clubId;
          loneInstructor.requestPending = true;
          instructorsBeingCurrentlyAdded.push({
            fullName: loneInstructor.fullName
          });
          await loneInstructor.save();
          instructorsArray.push(req.body.instructors[i]);
        }
        clubProfileFields.instructors = instructorsArray;
      }
    }
    const instructorsForInstantAdd = [];

    if (req.body.instructors && req.body.instructors.length < 1) {
      clubProfileFields.instructors = [];
    }

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
    res.status(200).send({ newInstructors: tennisClubProfile.instructors });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post("/addInstructorsToClub", async (req, res) => {
  try {
    let tennisClubProfile = await ClubProfile.findOne({
      tennisClub: req.body.tennisClub
    });
    function checkIfDuplicates() {
      const instructorIds = [
        ...req.body.instructors,
        ...tennisClubProfile.instructors
      ];
      let sendError = "No Error";
      for (let x = 0; x < instructorIds.length; x++) {
        for (let y = 0; y < instructorIds.length; y++) {
          console.log(
            instructorIds[x] === instructorIds[y],
            instructorIds[x],
            instructorIds[y]
          );
          if (instructorIds[x] === instructorIds[y] && x !== y) {
            console.log("ding ding");
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
      }
      res.status(200).json({
        tennisClubProfile,
        instructorsForInstantAdd: instructorsForInstantAdd
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
