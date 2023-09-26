const monoogse = require('mongoose');

const OnlineModel = new monoogse.Schema({
  design: {
    type: String,
    unique: false,
    required: true,
  },
  material: {
    type: String,
    unique: false,
    required: true,
  },
  measurement: {
    type: Number,
    unique: true,
    required: true,
  },
  deliveryDate: {
    type: String,
    unique: false,
    required: true,
  },
  deliveryAddress: {
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

module.exports = monoogse.model('online', OnlineModel);
