const express = require("express");
const route = express.Router();
const cntrl = require("../controllers/authCntrl");
const client = require("../controllers/clientCntrl");

route.post("/register", cntrl.register);
route.post("/login", cntrl.login);
route.delete("/del/:id", client.deleteUser);
route.get("/logout", cntrl.logout);
module.exports = route;
