const data = require('../../data/brewplan');

exports.seed = function (knex) {
  return knex('brewplan')
    .del()
    .then(async function () {
      return await knex('brewplan').insert(data.brewplan);
    });
};
