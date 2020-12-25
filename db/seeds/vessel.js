const data = require('../../data/vesselData')

exports.seed = function(knex) {
  return knex('vessel').del()
    .then(() => {
      return knex('vessel_type').del()
    })
    .then(() => {
      return knex('vessel_type').insert(data.vessel_type)
    })
    .then(() => {
      return knex('vessel').insert(data.vessel)
    })
 }