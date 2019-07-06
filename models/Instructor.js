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
  yearsTeaching: {},

  experience: [
    {
      jobTitle: {
        type: String
      },
      clubName: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      description: {
        type: String
      }
    }
  ]
});

const Instructor = mongoose.model("instructor", InstructorSignUpSchema);

module.exports = Instructor;
