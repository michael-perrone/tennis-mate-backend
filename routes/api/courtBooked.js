const express = require("express");
const router = express.Router();
const CourtBooked = require("../../models/CourtBooked");

router.post("/", async (req, res) => {
  console.log(req.body);
  let newCourtBooked = new CourtBooked({
    clubName: req.body.clubName,
    courtIds: req.body.courtIds,
    timeStart: req.body.timeStart,
    timeEnd: req.body.timeEnd
  });
});
