exports.up = function (knex) {
  return knex.schema
    .createTable('fin_wad_add', (tbl) => {
      tbl.increments();
      tbl.string('brand', 20).notNullable();
      tbl.string('tank', 20).notNullable();
      tbl.decimal('vol_start', 8, 2).notNullable();
      tbl.decimal('vol_stop', 8, 2).notNullable();
      tbl.string('username', 50).notNullable();
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('fin_trans_add', (tbl) => {
      tbl.increments();
      tbl.string('brand_from', 20).notNullable();
      tbl.string('brand_to', 20).notNullable();
      tbl.string('tank_from', 20).notNullable();
      tbl.string('tank_to', 20).notNullable();
      tbl.decimal('volume', 8, 2).notNullable();
      tbl.string('username', 50).notNullable();
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('fin_loss_add', (tbl) => {
      tbl.increments();
      tbl.string('brand', 20).notNullable();
      tbl.string('tank', 20).notNullable();
      tbl.decimal('volume', 8, 2).notNullable();
      tbl.string('username', 50).notNullable();
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('fin_wad_add')
    .dropTableIfExists('fin_trans_add')
    .dropTableIfExists('fin_loss_add');
};
