exports.up = function (knex) {
  return knex.schema
    .createTable('mtl_uom', (tbl) => {
      tbl.increments();
      tbl.string('uom', 25).notNullable().unique();
      tbl.string('note', 256);
      tbl.timestamps(true, true);
    })
    .createTable('mtl_type', (tbl) => {
      tbl.increments();
      tbl.string('type', 25).notNullable().unique();
      tbl.string('note', 256);
      tbl.timestamps(true, true);
    })
    .createTable('mtl_location', (tbl) => {
      tbl.increments();
      tbl.string('location', 25).notNullable().unique();
      tbl.string('note', 256);
      tbl.timestamps(true, true);
    })
    .createTable('mtl_enviro', (tbl) => {
      tbl.increments();
      tbl.string('enviro', 25).notNullable().unique();
      tbl.string('note', 256);
      tbl.timestamps(true, true);
    })
    .createTable('mtl_container', (tbl) => {
      tbl.increments();
      tbl.string('container', 25).notNullable().unique();
      tbl.string('note', 256);
      tbl.timestamps(true, true);
    })
    .createTable('mtl_supplier', (tbl) => {
      tbl.increments();
      tbl.string('company', 100).notNullable().unique();
      tbl.string('contact', 100);
      // .notNullable()
      tbl.string('email', 100);
      // .notNullable()
      tbl.string('phone', 50);
      // .notNullable()
      tbl.string('address', 250);
      // .notNullable()
      tbl.string('note', 250);
      tbl.timestamps(true, true);
    })
    .createTable('mtl_commodity', (tbl) => {
      tbl.increments();
      tbl.string('commodity', 50).notNullable().unique();
      tbl.string('active', 5).notNullable();
      tbl.string('sap', 50).notNullable();
      tbl.string('inventory', 25).notNullable();
      tbl.decimal('threshold', 8, 2).notNullable();
      tbl.decimal('per_pallet', 8, 2).notNullable();
      tbl.decimal('unit_total', 8, 2).notNullable();
      tbl.string('note', 250);
      tbl.string('updated_by', 64).notNullable().defaultTo('pending');
      tbl.timestamps(true, true);
      tbl.integer('uom_id').unsigned().notNullable().references('id').inTable('mtl_uom').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.integer('type_id').unsigned().notNullable().references('id').inTable('mtl_type').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.integer('location_id').unsigned().notNullable().references('id').inTable('mtl_location').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.integer('enviro_id').unsigned().notNullable().references('id').inTable('mtl_enviro').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.integer('container_id').unsigned().notNullable().references('id').inTable('mtl_container').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.integer('supplier_id').unsigned().notNullable().references('id').inTable('mtl_supplier').onDelete('CASCADE').onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('mtl_commodity')
    .dropTableIfExists('mtl_uom')
    .dropTableIfExists('mtl_type')
    .dropTableIfExists('mtl_location')
    .dropTableIfExists('mtl_enviro')
    .dropTableIfExists('mtl_container')
    .dropTableIfExists('mtl_supplier');
};
