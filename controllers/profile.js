const User = require("../model/profile");
const jwt = require("jsonwebtoken");

const clientCntrl = {
  profile: async (req, res) => {
    const {} = req.body;
    const newProfile = await User({});
    newProfile.save();
  },
};
module.exports = clientCntrl;
