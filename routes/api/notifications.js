const express = require("express");
const router = express.Router();
const instructorAuth = require("../../middleware/authInstructor");
const Instructor = require("../../models/Instructor");
const Notification = require("../../models/Notification");
const TennisClub = require("../../models/TennisClub");

router.get("/instructornotifications", instructorAuth, async (req, res) => {
  try {
    let instructor = await Instructor.findOne({ _id: req.instructor.id });
    let notificationArray = [];
    for (let i = 0; i < instructor.notifications.length; i++) {
      let notification = await Notification.findOne({
        _id: instructor.notifications[i]
      });
      if (notification) {
        notificationArray.push(notification);
      }
    }
    res.status(200).json({ notifications: notificationArray });
  } catch (error) {
    console.log(error);
  }
});

router.post("/updateread", async (req, res) => {
  if (req.body.notificationIds.length > 0) {
    try {
      for (let i = 0; i < req.body.notificationIds.length; i++) {
        let notification = await Notification.findOne({
          _id: req.body.notificationIds[i]
        });
        notification.notificationRead = true;
        notification.save();
      }
      res.status(200).send();
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(200).json({ failure: "notificationIds.length was less than 0" });
  }
});

router.post("/instructorclickedyes", async (req, res) => {
  try {
    const instructor = await Instructor.findOne({ _id: req.body.instructorId });
    instructor.tennisClubTeachingAt = req.body.clubId;
    instructor.tennisClub = req.body.clubName;
    instructor.clubAccepted = true;
    await instructor.save();
    res.status(200).json({ instructor: instructor });
  } catch (error) {
    console.log(error);
  }
});

router.post("/instructoraddedtoclubnotification", async (req, res) => {
  try {
    const tennisClub = await TennisClub.findById({
      _id: req.body.tennisClubId
    });
    const notification = new Notification({
      notificationType: "Club Added Instructor",
      notificationDate: new Date(),
      notificationFromTennisClub: tennisClub._id,
      notificationMessage: `You have been added as an instructor by ${tennisClub.clubName}. If you work here, accept this request and you will now be a registered employee of this Tennis Club.`
    });
    for (let i = 0; i < req.body.instructors.length; i++) {
      console.log(req.body.instructors[i], "HELLLLLO");
      const instructor = await Instructor.findById({
        _id: req.body.instructors[i]
      });
      const instructorNotifications = [
        notification,
        ...instructor.notifications
      ];
      instructor.notifications = instructorNotifications;
      await instructor.save();
    }
    await notification.save();
    res.status(200).json({ mike: "all good" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
