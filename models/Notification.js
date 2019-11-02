const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  notificationType: String,
  notificationDate: Date,
  notificationRead: {
    type: Boolean,
    default: false
  },
  notificationMessage: String,
  notificationFrom: String,
  notificationFromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  notificationFromTennisClub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tennisClub"
  }
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;