const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  try {
    const decodedToken = jwt.verify(token, config.get("instructorSecret"));
    console.log(decodedToken, "am i null");
    req.instructor = decodedToken.instructor;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Also not authorized" });
  }
};
