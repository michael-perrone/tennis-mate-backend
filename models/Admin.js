const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  tennisClubAdminOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tennisClub"
  },
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
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tennisClub: {}
});
const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
