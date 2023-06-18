const jwt = require("jsonwebtoken");
const User = require("../model/User.model.js");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.ACCESS, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded; // Store the decoded user details in the request object
    next();
  });
};

module.exports = verifyToken;
