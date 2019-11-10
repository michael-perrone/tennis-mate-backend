const express = require("express");
const router = express.Router();
const userAuth = require("../../middleware/authUser");
const User = require("../../models/User");

router.get("/", userAuth, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  console.log(user);
});

module.exports = router;
