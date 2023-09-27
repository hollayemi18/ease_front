const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (typeof authHeader !== 'undefined') {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS, (err, user) => {
      if (err) {
        res.status(403).send('Unauthorized ');
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401).send('Unauthorized');
  }
};
module.exports = verify;
