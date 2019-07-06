const mongoose = require("mongoose");

const InstructorSignUpSchema = new mongoose.Schema({
  instructorName: {
    type: String,
    required: true
  },
  instructorEmail: {
    type: String,
    required: true
  },
  instructorPassword: {
    type: String,
    required: true
  },
  worksAtTennisClub: {
    type: Boolean,
    required: true
  },
  tennisClubName: {
    type: String
  },
  currentLocation: {
    type: String
  }
});

const Instructor = mongoose.model("instructorSignUp", InstructorSignUpSchema);

module.exports = Instructor;
