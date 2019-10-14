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
      certificationBy: String,
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
        type: String
      }
    }
  ],
  bio: String,
  photo: String,
  lessonRate: String,
  tennisClubTeachingAt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tennisClub"
  },
  requestPending: Boolean,
  requestFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tennisClub"
  }
});

const InstructorProfile = mongoose.model(
  "instructorProfile",
  instructorProfileSchema
);

module.exports = InstructorProfile;
