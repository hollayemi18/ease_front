const User = require("../model/User.model");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to generate a JWT token
const generateToken = (user) => {
  const payload = {
    id: user.user_id,
    email: user.email,
    username: user.username,
    // You can include more data in the payload if needed
  };

  return jwt.sign(payload, process.env.ACCESS, { expiresIn: "3h" });
};

//functions for auth controller
const cntrl = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    const validDetails = await User.findOne({ email });
    const validName = await User.findOne({ username });
    try {
      if (validName) {
        res.send("username is taken");
      }
      if (validDetails) {
        res.send("Email is registered");
      }
      const passwordHash = await bycrpt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: passwordHash,
      });
      const data = await newUser.save();
      if (data) {
        return res.send("success");
      } else {
        return res.send("not successful");
      }
    } catch (err) {
      res.send(err.message);
    }
  },
  login: async (req, res) => {
    try {
      const data = await User.findOne({ email: req.body.email });
      if (!data) {
        return res.status(401).send("email not found");
      }
      const compare = await bycrpt.compare(req.body.password, data.password);
      if (!compare) {
        return res.status(401).send("wrong password or username");
      }
      const token = generateToken(data);
      //res.cookie("accesstoken", token, { httpOnly: true });
      res.json({ token });
    } catch (err) {
      res.status(500).send("something went wrong");
    }
  },
  logout: async (req, res) => {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).send("successful logout!");
  },
  getuser: async (req, res) => {
    const data = req.user;
    res.json(data);
  },
};

module.exports = cntrl;
