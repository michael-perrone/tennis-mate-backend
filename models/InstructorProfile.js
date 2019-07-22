const mongoose = require("mongoose");

const instructorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instructor"
  },
  yearsTeaching: String,

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
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  bio: String
});

const InstructorProfile = mongoose.model(
  "instructorProfile",
  instructorProfileSchema
);

module.exports = InstructorProfile;
