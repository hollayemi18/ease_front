const UserModel = require("../model/User.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    const { email, password } = req.body;
    //checking if email exist
    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      try {
        return res.status(500).send({ msg: "email exist" });
      } catch (error) {
        return res.status(500).send({ msg: error });
      }
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: passwordHash,
    });
    newUser.save();
    return res.status(200).send({ msg: "registered" });
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
}
module.exports = { register };
