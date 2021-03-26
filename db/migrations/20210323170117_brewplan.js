exports.up = function (knex) {
  return knex.schema.createTable('brewplan', (tbl) => {
    tbl.increments();
    tbl.string('brand', 64);
    tbl.string('house', 32);
    tbl.integer('brews', 8).unsigned();
    tbl.date('brew_date');
    tbl.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('brewplan');
};
