const mongoose = require("mongoose");

const instructorProfileSchema = new mongoose.Schema({
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instructor"
  },
  yearsTeaching: String,
  previousCurrentRanking: String,
  location: String,
  certifications: [
    {
      certificationName: String,
      certificationDate: String,
      certificationDescription: String
    }
  ],
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
  bio: String,
  ageRangePreffered: String,
  levelPreffered: String,
  photo: String,
  lessonRate: String
});

const InstructorProfile = mongoose.model(
  "instructorProfile",
  instructorProfileSchema
);

module.exports = InstructorProfile;
