const express = require("express");
const route = express.Router();
const cntrl = require("../controllers/authCntrl");
const verifyToken = require("../middleware/authMiddleWare");

route.post("/register", cntrl.register);
route.post("/login", cntrl.login);
route.get("/logout", cntrl.logout);
route.get("/user", cntrl.getuser);
module.exports = route;
