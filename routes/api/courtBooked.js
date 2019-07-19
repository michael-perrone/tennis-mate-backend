const express = require("express");
const router = express.Router();
const CourtBooked = require("../../models/CourtBooked");

router.post("/", async (req, res) => {
  console.log(req.body);
  let newCourtBooked = new CourtBooked({
    clubName: req.body.clubName,
    courtIds: req.body.courtIds,
    timeStart: req.body.timeStart,
    timeEnd: req.body.timeEnd,
    minutes: req.body.minutes,
    date: req.body.date
  });

  if (newCourtBooked) {
    res.status(200).json({ courtBooked: newCourtBooked });
  }

  await newCourtBooked.save();
});

router.get("/", async (req, res) => {
  const bookings = await CourtBooked.find({});
  if (bookings.length > 0) {
    res.status(200).json({ bookings });
  }
});

module.exports = router;
