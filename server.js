const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hi");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("all good");
});
