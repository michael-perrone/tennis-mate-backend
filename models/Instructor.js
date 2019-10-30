const mongoose = require("mongoose");

const InstructorSignUpSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  fullName: String,
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tennisClub: {
    type: String
  },
  clubAccepted: {
    type: Boolean,
    default: false
  },
  clubLeftOrDenied: {
    type: Boolean,
    default: false
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courtBooked"
    }
  ],
  tennisClubTeachingAt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tennisClub"
  },
  requestPending: {
    type: Boolean,
    default: false
  },
  requestFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tennisClub"
  },
  notifications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "notification"
  }
});

const Instructor = mongoose.model("instructor", InstructorSignUpSchema);

module.exports = Instructor;
