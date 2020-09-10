// const { development } = require("../knexfile")
const dbEngine = process.env.DB_ENVIRONMENT || 'development'
const config = require('../knexfile')[dbEngine]

module.exports = require('knex')(config)