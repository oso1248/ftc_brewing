const dbEngine = 'oracleDB';
const config = require('../knexfile')[dbEngine];

module.exports = require('knex')(config);
