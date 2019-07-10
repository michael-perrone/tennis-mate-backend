const mongoose = require("mongoose");

const TennisClubSchema = new mongoose.Schema({
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
  timeClubOpens: {
    type: String,
    required: true
  },
  timeClubCloses: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  clubWebsite: {
    type: String,
    required: true
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
