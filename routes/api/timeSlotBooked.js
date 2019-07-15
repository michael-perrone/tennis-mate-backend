const express = require("express");
const router = express.Router();
const TimeSlotBooked = require("../../models/TimeSlotBooked");

router.post("/", async (req, res) => {
  if (req.body) {
    let newTimeSlotBooked = new TimeSlotBooked({
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
      courtNumber: req.body.courtNumber,
      courtId: req.body.courtId
    });

    await newTimeSlotBooked.save();
  }
});
