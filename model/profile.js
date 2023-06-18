const monoogse = require("mongoose");

const ProfileModel = new monoogse.Schema({
  fullNme: {
    type: String,
    unique: false,
    required: true,
  },
  homeAddress: {
    type: String,
    unique: false,
    required: true,
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: true,
  },
  deliveryAddress: {
    type: String,
    unique: false,
    required: true,
  },
  userPicture: {
    type: String,
    unique: false,
    required: true,
  },
});

module.exports = monoogse.model("profile", ProfileModel);
