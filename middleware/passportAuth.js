const passport = require('passport');
const { Strategy } = require('passport-jwt');
const db = require('../conn.db');
require('dotenv').config();

const extract = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies['token'];
  return token;
};

const opts = {
  secretOrKey: process.env.ACCESS,
  jwtFromRequest: extract,
};

passport.use(
  new Strategy(opts, async ({ email }, done) => {
    try {
      const { rows } = await db.query(
        'SELECT id ,username FROM users WHERE email = $1',
        [email]
      );
      if (!rows.length) {
        throw new Error('401 not authorized');
      }
      let user = { id: rows[0].id, username: rows[0].username };
      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);
