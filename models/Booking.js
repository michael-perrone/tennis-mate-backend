const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  instructorBooking: {
    type: Boolean,
    required: true
  },
  customerBooking: {
    type: Boolean,
    required: true
  },
  numberOfMinutes: {
    type: String,
    required: true
  },
  dateBooked: {
    type: Date,
    required: true
  },
  bookingName: {
    type: String,
    required: true
  }
});

const Booking = mongoose.model("booking", BookingSchema);

module.exports = Booking;
