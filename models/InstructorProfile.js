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
  jobExperience: [
    {
      jobTitle: String,
      clubName: {
        type: String
      },
      fromMonth: {
        type: String
      },
      fromYear: String,
      toMonth: {
        type: String
      },
      toYear: String,
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
  photo: String,
  lessonRate: String
});

const InstructorProfile = mongoose.model(
  "instructorProfile",
  instructorProfileSchema
);

module.exports = InstructorProfile;
