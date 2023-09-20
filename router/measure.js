const express = require("express");
const route = express.Router();
const getAll = require("../controllers/measure");

route.get("/", getAll);

module.exports = route;
