const express = require("express");
const router = express.Router();

//@route POST api/users
// desc register user
// access public
router.post("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
