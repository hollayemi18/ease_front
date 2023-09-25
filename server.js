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

app.use(passport.initialize());
app.use(cookieparse());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', route);
app.use('/data', measure);
require('./middleware/passportAuth');
app.use(
  cors({
    origin: 'https://tailor-3e4r.onrender.com',
    credentials: true,
  })
);
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});
