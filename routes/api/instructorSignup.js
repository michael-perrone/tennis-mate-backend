const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../../models/Admin");
const User = require("../../models/User");

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
    if (req.body.createPassword != req.body.passwordConfirm) {
      const passConfirmError = {
        msg: "Password's do not match",
        param: "passwordConfirm",
        location: "body"
      };
      const newErrors = [...errors.array(false), passConfirmError];
      return res.status(400).json({ errors: newErrors });
    } else {
      if (errors.array().length !== 0) {
        return res.status(400).json({ errors: errors.array() });
      } else {
        try {
          let user = await User.findOne({ email: req.body.email });
          let admin = await Admin.findOne({ email: req.body.email });
          let instructor = await Instructor.findOne({ email: req.body.email });
          if (instructor || admin || user) {
            return res
              .status(400)
              .json({ errors: [{ msg: "That email is already being used" }] });
          }
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
          const payload = {
            instructor: {
              id: newInstructor.id,
              instructor: true,
              clubName: newInstructor.clubName
            }
          };
          jwt.sign(
            payload,
            config.get("instructorSecret"),
            { expiresIn: 360000 },
            (error, token) => {
              if (error) {
                throw error;
              } else {
                res.status(200).json({ token });
              }
            }
          );
          console.log(payload);
        } catch (error) {
          console.log(error.message);
          res.status(500).send("Server Error");
        }
      }
    }
  }
);

module.exports = router;
