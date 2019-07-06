const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult, body } = require("express-validator");
const User = require("../../models/User");

//@route POST api/users
// desc register user
// access public
router.post(
  "/",
  [
    check("firstName", "Please enter your first name")
      .not()
      .isEmpty(),
    check("lastName", "Please enter your last name")
      .not()
      .isEmpty(),
    check("email", "Enter a Valid Email").isEmail(),
    check("createPassword", "Password must be 6 characters long").isLength({
      min: 6
    }),
    check("phoneNumber", "Please enter a valid Phone Number").isMobilePhone()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (
      req.body.createPassword != req.body.passwordConfirm ||
      errors.array().length !== 0
    ) {
      if (req.body.passwordConfirm != req.body.createPassword) {
        const passConfirmError = {
          msg: "Password's do not match",
          param: "passwordConfirm",
          location: "body"
        };
        const newErrors = [...errors.array(false), passConfirmError];
        if (newErrors.length !== 0) {
          return res.status(400).json({ errors: newErrors });
        }
      } else {
        return res.status(400).json({ errors: errors.array() });
      }
    } else {
      try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "That email is already being used" }] });
        }

        console.log(req.body.gender);

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

        res.status(200).json({ success: "Thanks for registering" });
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
      }
    }
  }
);

module.exports = router;
