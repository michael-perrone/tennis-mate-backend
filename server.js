const express = require("express");
const app = express();
const cors = require("cors");
const connectedDatabase = require("./config/db");

app.use(cors());
connectedDatabase();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api/usersSignup", require("./routes/api/usersSignup"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/instructorSignup", require("./routes/api/instructorSignup"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/adminSignup", require("./routes/api/adminSignup"));
app.use("/api/clubsList", require("./routes/api/clubsList"));
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("we here");
});
