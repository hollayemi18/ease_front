const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
async function connect() {
  const URI = process.env.MONGO_DB;

  mongoose.set("strictQuery", true);
  // const db = await mongoose.connect(getUri);
  const db = await mongoose.connect(URI);
  console.log("Database Connected");
  return db;
}

module.exports = connect;
