const db = require('../conn.db');

const getAll = async (req, res) => {
  try {
    const response = await db.query('SELECT * FROM users');
    res.send(response);
    console.log(response);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = getAll;
