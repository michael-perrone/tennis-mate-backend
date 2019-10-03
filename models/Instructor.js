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
  age: {
    type: String
  },
  gender: {
    type: String
  },
  invitePending: {
    type: Boolean,
    default: false
  },
  clubAccepted: {
    type: Boolean,
    default: false
  },
  clubLeftOrDenied: {
    type: Boolean,
    default: false
  },
});

const Instructor = mongoose.model("instructor", InstructorSignUpSchema);

module.exports = Instructor;
