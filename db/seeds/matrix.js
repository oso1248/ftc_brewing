const data = require('../../data/matrixData')

exports.seed = function(knex) {
   return knex('mtx_hop_std').del()
    .then(() => {
      return knex('mtx_hop_dry').del()
    })
    .then(() => {
      return knex('mtx_sac_supr').del()
    })
   
    .then(() => {
      return knex('mtx_material').del()
    })
  
    .then(() => {
      return knex('mtx_material').insert(data.mtx_material)
    })
    .then(() => {
      return knex('mtx_sac_supr').insert(data.mtx_sac_supr)
    })
    .then(() => {
      return knex('mtx_hop_dry').insert(data.mtx_hop_dry)
    })
    .then(() => {
      return knex('mtx_hop_std').insert(data.mtx_hop_std)
    })
}