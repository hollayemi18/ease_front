const monogoose = require("mongoose");

const newScheme = new monogoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = monogoose.model("login", newScheme);
