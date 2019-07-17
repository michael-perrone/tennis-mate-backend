const mongoose = require("mongoose");

const CourtBookedSchema = new mongoose.Schema({
  timeStart: String,
  timeEnd: String,
  bookedBy: String,
  courtIds: [String],
  minutes: String,
  clubName: String
});
