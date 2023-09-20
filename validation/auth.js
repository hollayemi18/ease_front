const pool = require('../conn.db');

const registerUser = async (req, res, next) => {
  const { username, email } = req.body;
  try {
    if (username.length < 3 || username.length > 12) {
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
    next();
  } catch (error) {}
};

module.exports = [registerUser];
