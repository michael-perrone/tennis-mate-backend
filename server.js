const express = require("express");
const app = express();
const connectedDatabase = require("./config/db");
const TennisClub = require("./models/TennisClubSignUp");

connectedDatabase();

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("we here");
});
