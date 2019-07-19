const mongoose = require("mongoose");

const CourtBookedSchema = new mongoose.Schema({
  timeStart: String,
  timeEnd: String,
  bookedBy: String,
  courtIds: [String],
  minutes: String,
  clubName: String,
  date: String
});

const CourtBooked = mongoose.model("courtBooked", CourtBookedSchema);

module.exports = CourtBooked;
