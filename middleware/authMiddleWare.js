const jwt = require("jsonwebtoken");
const User = require("../model/User.model.js");
const asynchandler = require("express-async-handler");
const verifyToken = asynchandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS, (err, decoded) => {
      if (err) {
        res.status(401).send("invalid token");
      }
      req.user = decoded.username;
      console.log(req.user);

      next();
    });
    if (!token) {
      res.status(401).send("not auth");
    }
  }
});

module.exports = verifyToken;
