const User = require("../model/onlineOrder.model");
const jwt = require("jsonwebtoken");

const clientCntrl = {
  order: async (req, res) => {
    const {} = req.body;
    const newProfile = await User({});
    newProfile.save();
  },
};
module.exports = clientCntrl;
