exports.up = function (knex) {
  return knex.schema
    .createTable('hibernated', (tbl) => {
      tbl.increments();
      tbl.string('org_vessel', 50).notNullable();
      tbl.string('int_vessel', 50).notNullable();
      tbl.string('end_vessel', 50);
      tbl.decimal('org_vol', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('int_vol', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('end_vol', 50, 2).notNullable().defaultTo(0);
      tbl.string('username1', 50).notNullable();
      tbl.string('username2', 50);
      tbl.string('note', 256);
      tbl
        .integer('brw_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_brw')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.timestamps(true, true);
    })
    .createTable('fin_injection_bridge', (tbl) => {
      tbl.increments();
      tbl
        .integer('fin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_fin')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('com_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_commodity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.decimal('rate', 50, 3).defaultTo(0);
      tbl.timestamps(true, true);
    })
    .createTable('fin_injection_log', (tbl) => {
      tbl.increments();
      tbl.string('fbt', 10).notNullable();
      tbl.string('lot', 50).notNullable();
      tbl.decimal('vol_fbt', 50, 2).notNullable();
      tbl.decimal('vol_ing', 50, 2).notNullable();
      tbl.string('username', 50).notNullable();
      tbl
        .integer('fin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('brnd_fin')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('com_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_commodity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.timestamps(true, true);
    })
    .createTable('vessel_type', (tbl) => {
      tbl.increments();
      tbl.string('type', 15).unique().notNullable();
      tbl.string('note', 256);
    })
    .createTable('vessel', (tbl) => {
      tbl.increments();
      tbl.string('vessel', 15).unique().notNullable();
      tbl.integer('volume').unsigned().notNullable();
      tbl.string('active', 5).notNullable();
      tbl.string('note', 256);
      tbl
        .integer('type_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('vessel_type')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl
        .integer('loc_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_location')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('hibernated')
    .dropTableIfExists('fin_injection_bridge')
    .dropTableIfExists('fin_injection_log')
    .dropTableIfExists('vessel')
    .dropTableIfExists('vessel_type');
};
