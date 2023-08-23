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
    fullName: {
      type: String,
      unique: false,
      required: true,
    },
    address: {
      type: String,
      unique: false,
      required: true,
    },
    phoneNumber: {
      type: Number,
      unique: true,
      required: true,
    },

    userPicture: {
      type: String,
      unique: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("details", UserSchema);
