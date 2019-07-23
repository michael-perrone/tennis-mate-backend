const mongoose = require("mongoose");

const instructorProfileSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instructor"
  },
  yearsTeaching: String,
  previousCurrentRanking: String,
  location: String,
  experience: [
    {
      jobTitle: String,
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
