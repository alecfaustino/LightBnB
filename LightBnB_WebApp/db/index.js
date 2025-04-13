const { Pool } = require('pg');

const pool = new Pool();

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = {
  query,
};