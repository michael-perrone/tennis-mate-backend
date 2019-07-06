const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const Instructor = require("../../models/Instructor");

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
        let instructor = await Instructor.findOne({ email: req.body.email });
        if (instructor) {
          return res
            .status(400)
            .json({ errors: [{ msg: "That email is already being used" }] });
        }

        console.log(req.body);

        let newInstructor = new Instructor({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: req.body.createPassword,
          tennisClub: req.body.tennisClub,
          age: req.body.age,
          gender: req.body.gender
        });
        console.log(newInstructor);

        const salt = await bcrypt.genSalt(10);

        newInstructor.password = await bcrypt.hash(
          req.body.createPassword,
          salt
        );

        await newInstructor.save();

        res.status(200).json({ success: "Thanks for registering" });
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
      }
    }
  }
);

module.exports = router;
