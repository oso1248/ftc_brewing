const db = require('../oracleDBconfig');

function getBrewPlan() {
  console.log('query');
  return db.raw(`
    SELECT *
    FROM countries
  `);
}

module.exports = {
  getBrewPlan,
};
