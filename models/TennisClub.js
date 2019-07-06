const mongoose = require("mongoose");

const TennisClubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  instructors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "instructor"
  },
  tennisCourts: {
    type: Number,
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
