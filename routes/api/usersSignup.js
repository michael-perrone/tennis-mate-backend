const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult, body } = require("express-validator");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route POST api/users
// desc register user
// access public
router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "That email is already being used" }] });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }

  if (!user) {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.createPassword,
      age: req.body.age,
      gender: req.body.gender
    });
    console.log(newUser);

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(req.body.createPassword, salt);

    await newUser.save();

    const payload = {
      user: {
        user: true,
        id: newUser.id,
        userNameFirst: newUser.firstName,
        userNameLast: newUser.lastName
      }
    };
    jwt.sign(
      payload,
      config.get("userSecret"),
      { expiresIn: 36000000 },
      (error, token) => {
        if (error) {
          throw error;
        } else {
          console.log(config.get("userSecret"));
          res.status(200).json({ token });
        }
      }
    );
    console.log(payload);
  }
});

module.exports = router;
