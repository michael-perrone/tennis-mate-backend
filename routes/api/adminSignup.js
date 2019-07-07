const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../../models/Admin");
const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("tennisClub", "Please enter the club's name you wish to register"),
    check("firstName", "Please enter your first name")
      .not()
      .isEmpty(),
    check("lastName", "Please enter your last name")
      .not()
      .isEmpty(),

    check("email", "Enter a valid Email").isEmail(),
    check(
      "createPassword",
      "Enter a password eight characters or longer"
    ).isLength({ min: 8 }),
    check("phoneNumber", "Please enter a valid phone number").isMobilePhone()
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
        return res.status(400).json({ errors: errors.array(false) });
      } else {
        try {
          let admin = await Admin.findOne({ email: req.body.email });
          if (admin) {
            return res
              .status(400)
              .json({ errors: [{ msg: "That email is being used" }] });
          }
          let newAdmin = new Admin({
            tennisClub: req.body.tennisClub,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.createPassword,
            tennisClub: req.body.tennisClub,
            phoneNumber: req.body.phoneNumber
          });
          const salt = await bcrypt.genSalt(10);
          newAdmin.password = await bcrypt.hash(req.body.createPassword, salt);
          await newAdmin.save();
          return res.status(200).json({ success: "good shit bro" });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
);
module.exports = router;
