const monoogse = require('mongoose');

const measurementModel = new monoogse.Schema({
  back: {
    type: String,
    required: true,
  },
  neckRound: {
    type: String,
    required: true,
  },
  headRound: {
    type: String,
    required: true,
  },
  chest: {
    type: String,
    required: true,
  },
  slim: {
    type: String,
    required: true,
  },
  slevelength_long: {
    type: String,
    required: true,
  },
  slevelength_short: {
    type: String,
    required: true,
  },
  slevelength_quarter: {
    type: String,
    required: true,
  },
  topLenght: {
    type: String,
    required: true,
  },
  waist: {
    type: String,
    required: true,
  },
  hips: {
    type: String,
    required: true,
  },
  trouserLenght: {
    type: String,
    required: true,
  },
  thigh: {
    type: String,
    required: true,
  },
  ankleLeg: {
    type: String,
    required: true,
  },
  insideTrouser: {
    type: String,
    required: true,
  },
  agbada: {
    type: String,
    required: true,
  },
  agbadaLenght: {
    type: String,
    required: true,
  },
  agbadaSleeve: {
    type: String,
    required: true,
  },
});

module.exports = monoogse.model('measurement', measurementModel);
