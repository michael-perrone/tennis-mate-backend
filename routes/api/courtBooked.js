const express = require("express");
const router = express.Router();
const CourtBooked = require("../../models/CourtBooked");

router.post("/", async (req, res) => {
  try {
    let newCourtBooked = new CourtBooked({
      bookingType: req.body.bookingType,
      instructorBooked: req.body.instructorId,
      instructorName: req.body.instructorName,
      bookedBy: req.body.bookedBy,
      clubName: req.body.clubName,
      courtIds: req.body.courtIds,
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
      minutes: req.body.minutes,
      date: req.body.date
    });
    await newCourtBooked.save();

    if (newCourtBooked) {
      const bookings = await CourtBooked.find({ clubName: req.body.clubName });
      res.status(200).json({ bookings });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/getcourts", async (req, res) => {
  console.log("hi");
  console.log(req.body.clubName);
  try {
    const bookings = await CourtBooked.find({ clubName: req.body.clubName });
    console.log(bookings);
    if (bookings.length > 0) {
      res.status(200).json({ bookings });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
