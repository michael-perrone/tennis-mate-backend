const mongoose = require("mongoose");

const tennisClubProfileSchema = new mongoose.Schema({
  tennisClub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tennisClub"
  },
  instructors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instructor"
    }
  ],
  services: [
    {
      nameOfService: String,
      serviceDetail: String
    }
  ],
  bio: String
});

const ClubProfile = mongoose.model("clubProfile", tennisClubProfileSchema);

module.exports = ClubProfile;
