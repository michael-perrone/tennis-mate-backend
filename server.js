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
app.use("/api/courtBooked", require("./routes/api/courtBooked"));
app.use("/api/timeSlotBooked", require("./routes/api/timeSlotBooked"));
app.use("/api/club", require("./routes/api/club"));
app.use("/api/usersSignup", require("./routes/api/usersSignup"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/instructorSignup", require("./routes/api/instructorSignup"));
app.use("/api/instructorProfile", require("./routes/api/instructorProfile"));
app.use("/api/userProfile", require("./routes/api/userProfile"));
app.use("/api/adminSignup", require("./routes/api/adminSignup"));
app.use("/api/clubsList", require("./routes/api/clubsList"));
app.use("/api/clubProfile", require("./routes/api/clubProfile"));
app.use("/api/instructorList", require("./routes/api/instructorList"));
app.use("/api/getInstructors", require("./routes/api/getInstructors"));
app.use("/api/saveLocation", require("./routes/api/saveLocation"));
app.use(
  "/api/getUserLocationInfo",
  require("./routes/api/getUserLocationInfo")
);
app.use("/api/clubProfileEvents", require("./routes/api/clubProfileEvents"));
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("we here");
});
