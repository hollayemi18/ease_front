const mongoose = require("mongoose");
const measure = require("../model/measurement.model");

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
    measurement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "measurement",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("details", UserSchema);
