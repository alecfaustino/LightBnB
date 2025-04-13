const db = require('./index');

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  // Values for the parametrized SQL Query
  const values = [];
  // Conditions to be joined in the WHERE clauses with .join
  const conditions = [];
  let queryString =
    `SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id`;

  if (options.city) {
    values.push(`%${options.city}%`);
    conditions.push(`city LIKE $${values.length}`);
  }

  if (options.owner_id) {
    values.push(options.owner_id);
    conditions.push(`owner_id = $${values.length}`);
  }
  
  // if both the minimum price and maxumum are filled
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    values.push(options.minimum_price_per_night * 100, options.maximum_price_per_night * 100);
    conditions.push(`cost_per_night BETWEEN $${values.length - 1} AND $${values.length}`);
  } else if (options.minimum_price_per_night) {
    values.push(options.minimum_price_per_night * 100);
    conditions.push(`cost_per_night >= $${values.length}`);
  } else if (options.maximum_price_per_night) {
    values.push(options.maximum_price_per_night * 100);
    conditions.push(`cost_per_night <= $${values.length}`);
  }

  if (conditions.length > 0) {
    queryString += ` WHERE ${conditions.join(' AND ')}`;
  }

  queryString += ` GROUP BY properties.id`;

  if (options.minimum_rating) {
    values.push(options.minimum_rating);
    queryString += ` HAVING avg(property_reviews.rating) >= $${values.length}`;
  }

  values.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${values.length}
  `;
  return pool
    .query(queryString, values)
    .then(result => result.rows)
    .catch(err => console.log(err.message));
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryString = 
    `INSERT INTO properties (
    owner_id, 
    title, 
    description, 
    thumbnail_photo_url, 
    cover_photo_url, 
    cost_per_night, 
    street, 
    city, 
    province, 
    post_code, 
    country, 
    parking_spaces, 
    number_of_bathrooms, 
    number_of_bedrooms) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *`;
  const values = [
    property.owner_id, 
    property.title, 
    property.description, 
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];
  return pool
    .query(queryString, values)
    .then(result => result.rows[0])
    .catch(err => err.message);

};

module.exports = {
  getAllProperties,
  addProperty
};