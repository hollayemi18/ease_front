const User = require("../model/User.model");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cntrl = {
  register: async (req, res, next) => {
    const { username, email, password } = req.body;
    const validDetails = await User.findOne({ email });
    const validName = await User.findOne({ username });
    try {
      if (validName) {
        res.status(400).send("username is taken");
      }
      if (validDetails) {
        res.status(401).send("Email is registered ");
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
      }
    } catch (error) {}
  },
  login: async (req, res) => {
    try {
      const data = await User.findOne({ email: req.body.email });
      if (!data) {
        return res.status(401).send("email not found");
      }
      const compare = await bycrpt.compare(req.body.password, data.password);
      if (!compare) {
        return res.status(401).send("'wrong password or username");
      }
      const token = jwt.sign(
        {
          email: data.email,
          username: data.username,
        },
        process.env.ACCESS
      );
      const { password, confirm_password, ...info } = data._doc;
      res
        .cookie("myToken", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
        })
        .status(200)
        .send(info);
    } catch (err) {
      res.status(500).send("something went wrong");
    }
  },
  logout: async (req, res) => {
    res.cookie("accessToken", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).send("successful logout!");
  },
  getUser: async (req, res) => {
    const { email } = req.user;
    const data = await User.findOne({ email });
    if (data) {
      res.send(data.username);
    }
  },
};

module.exports = cntrl;
