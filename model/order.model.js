const monoogse = require("mongoose");

const orderModel = new monoogse.Schema({
  Date: {
    type: String,
    unique: false,
    required: true,
  },
  Address: {
    type: String,
    unique: false,
    required: true,
  },
  availNumber: {
    type: String,
    unique: false,
    required: true,
  },
});
module.exports = monoogse.model("order", orderModel);
