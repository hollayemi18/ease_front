const User = require("../model/User.model");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cntrl = {
  register: async (req, res, next) => {
    const { username, email, password, confirm_password } = req.body;
    const validDetails = await User.findOne({ email });
    const validName = await User.findOne({ username });
    try {
      if (validName) {
        res.status(400).send("username is taken");
      } else {
        if (validDetails) {
          res.status(401).send("Email is registered ");
        } else {
          const hashPassword = await bycrpt.hash(password, 10);

          if (password === confirm_password) {
            const user = new User({
              ...req.body,
              password: hashPassword,
              confirm_password: hashPassword,
            });
            await user.save();
            res.status(200).send("data saved");
          } else {
            res.status(404).send("password not matched");
          }
        }
      }
    } catch (err) {
      next(err);
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
        return res.status(401).send("'wrong password or username");
      }
      const token = jwt.sign({ id: data._id }, process.env.ACCESS);
      const { password, confirm_password, ...info } = data._doc;
      res
        .cookie("accessToken", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: "none",
          secure: true,
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
      sameSite: "none",
      secure: true,
    });
    res.status(200).send("successful logout!");
  },
};

module.exports = cntrl;
