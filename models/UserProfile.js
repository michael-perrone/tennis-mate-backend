const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  yearsOfPlaying: Number,
  experience: String,
  lookingFor: String,
  bio: String
});

const UserProfile = mongoose.model("userProfile", userProfileSchema);

module.exports = UserProfile;
