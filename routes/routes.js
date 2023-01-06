const express = require("express");
const router = express.Router();
const cntrl = require("../controller/controller");

router.get("/login", cntrl.login);

module.exports = router;
