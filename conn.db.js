const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  password: 'hollasunkanmi',
  host: 'localhost',
  port: 5432,
  database: 'ease',
});

module.exports = { query: (text, params) => pool.query(text, params) };
