const mongoose = require("mongoose");

const TennisClubStarterSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const TennisClubStarter = mongoose.model(
  "tennisClubStarter",
  TennisClubStarterSchema
);

module.exports = TennisClubStarter;
