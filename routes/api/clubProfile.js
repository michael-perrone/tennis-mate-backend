const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/authAdmin");
const ClubProfile = require("../../models/ClubProfile");
const Instructor = require("../../models/Instructor");
const Notification = require("../../models/Notification");
const TennisClub = require("../../models/TennisClub");

router.get("/myclub", adminAuth, async (req, res) => {
  try {
    let clubProfile = await ClubProfile.findOne({
      tennisClub: req.admin.clubId
    }).populate("tennisClub", ["clubname"]);
    if (clubProfile) {
      const instructorsToSendBack = await Instructor.find({
        _id: clubProfile.instructorsToSendInvite
      });

      clubProfile.instructorsToSendInvite = instructorsToSendBack;

      const instructorsAlreadyHere = await Instructor.find({
        _id: clubProfile.instructorsWhoAccepted
      });

      clubProfile.instructorsWhoAccepted = instructorsAlreadyHere;
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
    tennisClubProfile.instructorsWhoAccepted = req.body.instructors;
    for (let i = 0; i < req.body.deletedInstructors.length; i++) {
      let instructor = await Instructor.findOne({
        _id: req.body.deletedInstructors[i]._id
      });
      instructor.tennisClub = "No Current Club";
      instructor.clubAccepted = false;
    }
    await tennisClubProfile.save();
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
          for (
            let y = 0;
            y < tennisClubProfile.instructorsToSendInvite.length;
            y++
          ) {
            if (
              req.body.instructors[x] ==
              tennisClubProfile.instructorsToSendInvite[y]
            ) {
              sendError = "You can not add the same instructor twice.";
              return sendError;
            }
            for (
              let z = 0;
              z < tennisClubProfile.instructorsWhoAccepted.length;
              z++
            ) {
              if (
                req.body.instructors[x] ==
                tennisClubProfile.instructorsWhoAccepted[z]
              ) {
                sendError =
                  "One of these instructors is already registered at your club.";
              }
            }
          }
        }
        return sendError;
      }
      if (checkIfDuplicates() === "No Error") {
        let tennisClub = await TennisClub.findOne({
          _id: req.body.tennisClub
        });
        let instructorsForInstantAdd = [];
        tennisClubProfile.instructorsToSendInvite.push(...req.body.instructors);
        tennisClubProfile.save();
        for (let z = 0; z < req.body.instructors.length; z++) {
          let instructor = await Instructor.findOne({
            _id: req.body.instructors[z]
          });
          instructorsForInstantAdd.push(instructor);
          instructor.requestFrom = req.body.tennisClub;
          instructor.requestPending = true;

          let newNotification = new Notification({
            notificationType: "Club Added Instructor",
            notificationDate: new Date(),
            notificationFromTennisClub: tennisClub._id,
            notificationMessage: `You have been added as an instructor by ${tennisClub.clubName}. If you work here, accept this request and you will now be a registered employee of this Tennis Club.`
          });
          instructor.notifications.push(newNotification);
          console.log(newNotification);
          await newNotification.save();
          await instructor.save();
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
          instructorsToSendInvite: req.body.instructors,
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
