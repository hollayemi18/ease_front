const passport = require('passport');

userAuth = passport.authenticate('jwt', { session: false });

module.exports = userAuth;
