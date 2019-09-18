const mongoose = require("mongoose");

const TennisClubSchema = new mongoose.Schema({
  phoneNumber: {
    type: String
  },
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
  bio: {
    type: String
  },
  subscribers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user"
  },
  photo: String,
  clubProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clubProfile"
  }
});
const TennisClub = mongoose.model("tennisClub", TennisClubSchema);

module.exports = TennisClub;
