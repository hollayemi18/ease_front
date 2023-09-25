const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../conn.db');
require('dotenv').config();
// Function to generate a JWT token
const generateToken = (user) => {
  const payload = {
    username: user.username,
    email: user.email,
    // You can include more data in the payload if needed
  };

  return jwt.sign(payload, process.env.ACCESS, { expiresIn: '3h' });
};

//functions for auth controller
const cntrl = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (username.length < 4 || username.length > 12) {
        return res
          .status(400)
          .json({ error: 'username must be between 3 and 12.' });
      }
      const validName = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      const validEmail = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      if (validName.rows.length > 0) {
        res.status(401).send('Username taken');
      }
      if (validEmail.rows.length > 0) {
        res.status(401).send('Email is already registered');
      }
      const passwordHash = await bycrpt.hash(password, 10);
      if (validEmail && validName) {
        const userDetails = await pool.query(
          'INSERT INTO users(username, email, password ) VALUES ($1,$2,$3)',
          [username, email, passwordHash]
        );
        if (userDetails) {
          res.status(200).send('User details saved ');
        }
      } else {
        res.status(400).send('Cant register');
      }
    } catch (error) {}
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const userLogin = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (userLogin.rows.length === 0) {
        res.status(401).send('User not found');
      }
      const user = userLogin.rows[0];
      const comparePassword = await bycrpt.compare(password, user.password);
      if (comparePassword) {
        const success = 'successfully login';
        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({ result: token, success });
      } else {
        res.status(400).send('wrong password');
      }
    } catch (err) {}
  },
  logout: async (req, res) => {
    res.cookie('token', '', {
      path: '/',
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).send('successful logout!');
  },
  getuser: async (req, res) => {
    const { username } = req.user;
    res.send(username);
  },
};

module.exports = cntrl;
