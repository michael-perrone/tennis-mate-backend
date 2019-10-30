const express = require("express");
const router = express.Router();
const instructorAuth = require("../../middleware/authInstructor");
const Instructor = require("../../models/Instructor");
const Notification = require("../../models/Notification");
const TennisClub = require("../../models/TennisClub");

router.get("/instructornotifications", instructorAuth, async (req, res) => {
  const instructor = await Instructor.findById({ _id: req.instructor._id });
  const notifications = instructor.notifications;
  res.status(200).json(notifications);
});

router.get("/", async (req, res) => {
  const notification = await Notification.findById({
    _id: "5db93d4fe0d1650d8401d01c"
  });
  res.json(notification);
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
      console.log(instructor, "ME MEE MEMEMEE");
      const instructorNotifications = [
        notification,
        ...instructor.notifications
      ];
      instructor.notifications = instructorNotifications;
      instructor.save();
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
