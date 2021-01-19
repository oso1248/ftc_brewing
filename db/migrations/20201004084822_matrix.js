exports.up = function (knex) {
  return knex.schema
    .createTable('mtx_hop_std', (tbl) => {
      tbl.increments();
      tbl
        .integer('com_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_commodity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.decimal('BH40', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('BH50', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('NL50', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('PT90', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('EL20', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('GI19', 50, 2).notNullable().defaultTo(0);
    })
    .createTable('mtx_hop_dry', (tbl) => {
      tbl.increments();
      tbl
        .integer('com_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_commodity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.decimal('BH40', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('BH50', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('NL50', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('PT90', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('EL20', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('GI19', 50, 2).notNullable().defaultTo(0);
    })
    .createTable('mtx_sac_supr', (tbl) => {
      tbl.increments();
      tbl
        .integer('com_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_commodity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.decimal('BH40', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('BH50', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('NL50', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('PT90', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('EL20', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('GI19', 50, 2).notNullable().defaultTo(0);
    })
    .createTable('mtx_material', (tbl) => {
      tbl.increments();
      tbl
        .integer('com_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('mtl_commodity')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.decimal('BH40', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('BH50', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('NL50', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('PT90', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('EL20', 50, 2).notNullable().defaultTo(0);
      tbl.decimal('GI19', 50, 2).notNullable().defaultTo(0);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('mtx_sac_supr')
    .dropTableIfExists('mtx_hop_dry')
    .dropTableIfExists('mtx_hop_std')
    .dropTableIfExists('mtx_material');
};
