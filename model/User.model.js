const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "username Existed"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email Existed"],
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    confirm_password: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("client", UserSchema);
