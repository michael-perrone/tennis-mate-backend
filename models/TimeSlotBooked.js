const mongoose = require("mongoose");

const TimeSlotbookedSchema = new mongoose.Schema({
  courtId: String,
  clubName: String
});

const TimeSlotBooked = mongoose.model("timeSlotsBooked", TimeSlotbookedSchema);

module.exports = TimeSlotBooked;
