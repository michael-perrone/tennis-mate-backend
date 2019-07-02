const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDatabase = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });

    console.log("mongodb connected");
  } catch (err) {
    console.log(err.message);

    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDatabase;
