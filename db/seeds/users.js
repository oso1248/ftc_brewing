const data = require('../../data/usersData');

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('brewery').del();
    })
    .then(() => {
      return knex('brewery').insert(data.brewery);
    })
    .then(() => {
      return knex('users').insert(data.user);
    });
};
