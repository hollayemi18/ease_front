const jwt = require("jsonwebtoken");
const User = require("../model/User.model.js");

const protect = async (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).send("You are not Authenticated");
  }
  jwt.verify(token, process.env.ACCESS, async (err, payload) => {
    if (err) {
      return res.status(401).send("Token not valid");
    }
    req.userId = payload.id;
  });
};
module.exports = protect;
