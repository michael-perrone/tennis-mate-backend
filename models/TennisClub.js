const mongoose = require("mongoose");

const TennisClubSchema = new mongoose.Schema({
  clubNameAllLower: {
    type: String
  },
  clubName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  instructors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "instructor"
  },
  numberCourts: {
    type: String,
    required: true
  },
  clubOpenTimeNumber: {
    type: String,
    required: true
  },
  clubOpenTimeAMPM: {
    type: String,
    required: true
  },
  clubCloseTimeNumber: {
    type: String,
    required: true
  },
  clubCloseTimeAMPM: {
    type: String,
    required: true
  },
  clubWebsite: {
    type: String
  },

  events: {
    type: String
  },
  services: {
    type: [String]
  },
  bio: {
    type: String
  },
  subscribers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user"
  }
});
const TennisClub = mongoose.model("tennisClub", TennisClubSchema);

module.exports = TennisClub;
