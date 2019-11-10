const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  age: {
    type: String
  },
  gender: {
    type: String
  },
  skillLevel: {
    type: String
  },
  locationState: {
    type: String,
    default: "No Location Saved"
  },
  locationTown: {
    type: String,
    default: "No Location Saved"
  },
  locationSaved: {
    type: Boolean
  },
  locationDenied: {
    type: Boolean,
    default: false
  },
  clubsSubscribedTo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "tennisClub"
  }
});

module.exports = User = mongoose.model("user", UserSchema);
