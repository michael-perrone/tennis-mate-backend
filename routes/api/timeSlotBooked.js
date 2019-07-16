const express = require("express");
const router = express.Router();
const TimeSlotBooked = require("../../models/TimeSlotBooked");

router.post("/", async (req, res) => {
  let newTimeSlotBooked = new TimeSlotBooked({
    courtId: req.body.courtId
  });

  if (newTimeSlotBooked) {
    res.status(200).json({ newTimeSlot: newTimeSlotBooked });
  }

  await newTimeSlotBooked.save();
});

router.get("/", async (req, res) => {
  const matchingTimeSlot = await TimeSlotBooked.find({});
  res.status(200).json({ bookedCourts: matchingTimeSlot });
});

module.exports = router;
