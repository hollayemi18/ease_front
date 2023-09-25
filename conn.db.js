const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.CONNECTION,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
