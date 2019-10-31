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
      console.log(instructor.notifications[i]);
      let notification = await Notification.findOne({
        _id: instructor.notifications[i]
      });

      console.log(notification);
      if (notification) {
        notificationArray.push(notification);
      }
    }
    res.status(200).json(notificationArray);
  } catch (erorr) {
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
      instructor.save();
    }
    notification.save();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
