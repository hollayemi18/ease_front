const User = require("../model/User.model");
const jwt = require("jsonwebtoken");

const clientCntrl = {
  deleteUser: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.send("user not found");
    }
    const token = req.cookies.accessToken;
    if (!token) {
      return res.send("not authenticated");
    }
    jwt.verify(token, process.env.ACCESS, async (err, payload) => {
      if (payload.id !== user.id) {
        res.send("cant delete details");
      }
      await User.findByIdAndDelete(req.params.id);
      res.send("delted");
    });
  },
};
module.exports = clientCntrl;
