exports.up = function (knex) {
  return knex.schema
    .createTable('craft_trailer_number', (tbl) => {
      tbl.increments();
      tbl.string('user_create', 128).notNullable();
      tbl.string('user_receive', 128);
      tbl.timestamps(true, true);
    })
    .createTable('craft_tied_inv', (tbl) => {
      tbl.increments();
      tbl.integer('com_id').unsigned().notNullable().references('id').inTable('mtl_commodity').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.string('user_tied', 128).notNullable();
      tbl.string('user_loaded', 128);
      tbl.timestamps(true, true);
    })
    .createTable('craft_trailer_inv', (tbl) => {
      tbl.increments();
      tbl.integer('trailer_id').unsigned().notNullable().references('id').inTable('craft_trailer_number').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.integer('com_id').unsigned().notNullable().references('id').inTable('mtl_commodity').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.string('user_load', 128).notNullable();
      tbl.string('user_receive', 128);
      tbl.timestamps(true, true);
    })
    .createTable('craft_floor_inv', (tbl) => {
      tbl.increments();
      tbl.integer('com_id').unsigned().notNullable().references('id').inTable('mtl_commodity').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.string('user_used', 128);
      tbl.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('craft_tied_inv').dropTableIfExists('craft_trailer_inv').dropTableIfExists('craft_floor_inv').dropTableIfExists('craft_trailer_number');
};
