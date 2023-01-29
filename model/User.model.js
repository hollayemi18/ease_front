const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Username Exist"],
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  firstName: { type: String },
  lastName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
});

module.exports = mongoose.model("client", UserSchema);
