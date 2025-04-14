const db = require('./index');

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString =
    `SELECT email, password, name, id
    FROM users
    WHERE email = $1
    `;
  return db
    .query(queryString, [email])
    .then(result => {
      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    })
    .catch(err => console.log(err.message));

};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString =
    `SELECT users.id, name, password, email
    FROM users
    WHERE users.id = $1
    `;
  return db
    .query(queryString, [id])
    .then(result => {
      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0];
    })
    .catch(err => console.log(err.message));
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const queryString =
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const values = [user.name, user.email, user.password];
  return db
    .query(queryString, values)
    .then(result => result.rows[0])
    .catch(err => err.message);
};

module.exports = { getUserWithEmail, getUserWithId, addUser };