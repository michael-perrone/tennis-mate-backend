const mongoose = require("mongoose");

const TimeSlotbookedSchema = new mongoose.Schema({
  timeStart: String,
  timeEnd: String,
  courtNumber: String,
  courtId: Number
});

const TimeSlotBooked = mongoose.model("timeSlotBooked", TimeSlotbookedSchema);

export default TimeSlotBooked;
