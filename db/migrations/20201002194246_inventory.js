exports.up = function (knex) {
  return knex.schema
    .createTable('inv_mat_weekly', (tbl) => {
      tbl.increments();
      tbl
        .integer('com_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_commodity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.decimal('total_per_unit', 8, 2).notNullable();
      tbl.decimal('total_count', 8, 2).notNullable();
      tbl.decimal('total_end', 8, 2).notNullable();
      tbl.string('username', 50).notNullable();
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('inv_mat_monthly', (tbl) => {
      tbl.increments();
      tbl
        .integer('com_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_commodity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.decimal('total_per_unit', 8, 2).notNullable();
      tbl.decimal('total_count', 8, 2).notNullable();
      tbl.decimal('total_end', 8, 2).notNullable();
      tbl.string('username', 50).notNullable();
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('mat_archive', (tbl) => {
      tbl.increments();
      tbl.decimal('count_final', 8, 2).notNullable();
      tbl.decimal('total_end', 8, 2).notNullable();
      tbl.string('username', 50).notNullable();
      tbl
        .integer('com_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_commodity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('inv_hop_daily', (tbl) => {
      tbl.increments();
      tbl
        .integer('brw_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_brw')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.decimal('sets', 8, 2).notNullable();
      tbl.string('username', 50).notNullable();
      tbl.timestamps(true, true);
    })
    .createTable('inv_hop_weekly', (tbl) => {
      tbl.increments();
      tbl
        .integer('com_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_commodity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.decimal('lbs', 8, 2).notNullable();
      tbl.string('lot', 50);
      // .notNullable()
      tbl.string('username', 50).notNullable();
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('inv_hop_monthly', (tbl) => {
      tbl.increments();
      tbl
        .integer('com_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_commodity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.decimal('lbs', 8, 2).notNullable();
      tbl.string('lot', 50);
      // .notNullable()
      tbl.string('username', 50).notNullable();
      tbl.string('note', 1024);
      tbl.timestamps(true, true);
    })
    .createTable('inv_last_brews', (tbl) => {
      tbl.increments();
      tbl.string('bh1', 50).notNullable();
      tbl.string('bh2', 50).notNullable();
      tbl.string('username', 50).notNullable();
      tbl.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('inv_mat_weekly')
    .dropTableIfExists('inv_mat_monthly')
    .dropTableIfExists('mat_archive')
    .dropTableIfExists('inv_hop_daily')
    .dropTableIfExists('inv_hop_weekly')
    .dropTableIfExists('inv_hop_monthly')
    .dropTableIfExists('inv_last_brews');
};
