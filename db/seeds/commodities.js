const data = require('../../data/commoditiesData');

exports.seed = function (knex) {
  return knex('mtl_commodity')
    .del()
    .then(() => {
      return knex('mtl_supplier').del();
    })
    .then(() => {
      return knex('mtl_container').del();
    })
    .then(() => {
      return knex('mtl_enviro').del();
    })
    .then(() => {
      return knex('mtl_location').del();
    })
    .then(() => {
      return knex('mtl_type').del();
    })
    .then(() => {
      return knex('mtl_uom').del();
    })
    .then(() => {
      return knex('mtl_uom').insert(data.mtl_uom);
    })
    .then(() => {
      return knex('mtl_type').insert(data.mtl_type);
    })
    .then(() => {
      return knex('mtl_location').insert(data.mtl_location);
    })
    .then(() => {
      return knex('mtl_enviro').insert(data.mtl_enviro);
    })
    .then(() => {
      return knex('mtl_container').insert(data.mtl_container);
    })
    .then(() => {
      return knex('mtl_supplier').insert(data.mtl_supplier);
    })
    .then(() => {
      return knex('mtl_commodity').insert(data.mtl_commodidity);
    });
};
