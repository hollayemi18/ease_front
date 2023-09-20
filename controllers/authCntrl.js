const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../conn.db');
// Function to generate a JWT token
const generateToken = (user) => {
  const payload = {
    username: user.username,
    // You can include more data in the payload if needed
  };

  return jwt.sign(payload, process.env.ACCESS, { expiresIn: '3h' });
};

//functions for auth controller
const cntrl = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const passwordHash = await bycrpt.hash(password, 10);
      const userDetails = pool.query(
        'INSERT INTO users(username, email, password ) VALUES ($1,$2,$3)',
        [username, email, passwordHash]
      );

      res.status(200).send('User details saved ');
    } catch (error) {}
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
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
        res.cookie('accesstoken', token, { httpOnly: true });
        res.status(200).json({ result: token, success });
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
    const data = req.user;
    res.json(data);
  },
};

module.exports = cntrl;
