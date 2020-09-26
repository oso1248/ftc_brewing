const data = require('../../data/brandData')

exports.seed = function(knex) {
   return knex('methods_cold').del()
    .then(() => {
      return knex('acx_pre').del()
    })
    .then(() => {
      return knex('acx_post').del()
    })
    .then(() => {
      return knex('csx_pre').del()
    })
    .then(() => {
      return knex('csx_post').del()
    })
    .then(() => {
      return knex('fltr_pre').del()
    })
    .then(() => {
      return knex('fltr_post').del()
    })
    .then(() => {
      return knex('rel_pre').del()
    })
    .then(() => {
      return knex('rel_post').del()
    })
    .then(() => {
      return knex('chp_params').del()
    })
    .then(() => {
      return knex('chp_smpl').del()
    })
    .then(() => {
      return knex('sch_params').del()
    })
    .then(() => {
      return knex('sch_smpl').del()
    })
    .then(() => {
      return knex('fin_params').del()
    })
    .then(() => {
      return knex('fin_smpl').del()
    })
    .then(() => {
      return knex('brnd_pck').del()
    })
    .then(() => {
      return knex('brnd_fin').del()
    })
    .then(() => {
      return knex('brnd_brw').del()
    })
    .then(() => {
      return knex('brnd_brw').insert(data.brnd_brw)
    })
    .then(() => {
      return knex('brnd_fin').insert(data.brnd_fin)
    })
    .then(() => {
      return knex('brnd_pck').insert(data.brnd_pck)
    })
    .then(() => {
      return knex('fin_smpl').insert(data.fin_smpl)
    })
    .then(() => {
      return knex('fin_params').insert(data.fin_params)
    })
    .then(() => {
      return knex('sch_smpl').insert(data.sch_smpl)
    })
    .then(() => {
      return knex('sch_params').insert(data.sch_params)
    })
    .then(() => {
      return knex('chp_smpl').insert(data.chp_smpl)
    })
    .then(() => {
      return knex('chp_params').insert(data.chp_params)
    })
    .then(() => {
      return knex('rel_post').insert(data.rel_post)
    })
    .then(() => {
      return knex('rel_pre').insert(data.rel_pre)
    })
    .then(() => {
      return knex('fltr_post').insert(data.fltr_post)
    })
    .then(() => {
      return knex('fltr_pre').insert(data.fltr_pre)
    })
    .then(() => {
      return knex('csx_post').insert(data.csx_post)
    })
    .then(() => {
      return knex('csx_pre').insert(data.csx_pre)
    })
    .then(() => {
      return knex('acx_post').insert(data.acx_post)
    })
    .then(() => {
      return knex('acx_pre').insert(data.acx_pre)
    })
    .then(() => {
      return knex('methods_cold').insert(data.methods_cold)
    })
}
