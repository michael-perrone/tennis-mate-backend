const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  notificationType: String,
  notificationDate: Date,
  notificationRead: {
    type: Boolean,
    default: false
  },
  notificationMessage: String
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
