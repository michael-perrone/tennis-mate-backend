const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Not authorized" });
  }
  console.log(token)

  try {
    const decodedToken = jwt.verify(token, config.get("instructorSecret"));
    console.log(decodedToken, "am i null");
    req.instructor = decodedToken.instructor;
    console.log(decodedToken.instructor, "Im working")
    req.clubName = decodedToken.clubName;
    next();
  } catch (error) {
    const decodedToken = jwt.verify(token, config.get("instructorSecret"));
    console.log(decodedToken)
    console.log()
    res.status(401).json({ msg: "Also not authorized" });
  }
};
