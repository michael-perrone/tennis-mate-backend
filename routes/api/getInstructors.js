const express = require("express");
const router = express.Router();
const Instructor = require("../../models/Instructor");

router.post("/", async (req, res) => {
  const instructorsToSendBack = await Instructor.find({
    _id: req.body.instructors
  });
  try {
    if (instructorsToSendBack.length > 0) {
      res.status(200).json({ instructorsComingBack: instructorsToSendBack });
    } else {
      res.status(404).json({ error: "Instructors Not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
