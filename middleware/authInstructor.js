const jwt = require("./node_modules/jsonwebtoken");
const config = require("./node_modules/config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  try {
    const decodedToken = jwt.verify(token, config.get("instructorSecret"));

    req.instructor = decodedToken.instructor;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Also not authorized" });
  }
};
