const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const cookieparse = require('cookie-parser');
const env = require('dotenv');
const route = require('./router/route');
const measure = require('./router/measure');
env.config();
const passport = require('passport');

/** middlewares */

require('./middleware/passportAuth');
app.use(
  cors({
    origin: process.env.ONLINE,
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(cookieparse());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', route);
app.use('/data', measure);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});
