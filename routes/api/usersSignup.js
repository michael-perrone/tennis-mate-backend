const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");

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
  (req, res) => {
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
      res.status(200).json({ success: "Thanks for registering" });
    }
  }
);

module.exports = router;
