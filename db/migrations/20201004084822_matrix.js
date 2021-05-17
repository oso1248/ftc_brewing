exports.up = function (knex) {
  return knex.schema
    .createTable('mtx_hop_std', (tbl) => {
      tbl.increments();
      tbl.integer('com_id').unsigned().notNullable().references('id').inTable('mtl_commodity').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('mtx_hop_dry', (tbl) => {
      tbl.increments();
      tbl.integer('com_id').unsigned().notNullable().references('id').inTable('mtl_commodity').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('mtx_sac_supr', (tbl) => {
      tbl.increments();
      tbl.integer('com_id').unsigned().notNullable().references('id').inTable('mtl_commodity').onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('mtx_material', (tbl) => {
      tbl.increments();
      tbl.integer('com_id').unsigned().notNullable().references('id').inTable('mtl_commodity').onDelete('CASCADE').onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('mtx_sac_supr').dropTableIfExists('mtx_hop_dry').dropTableIfExists('mtx_hop_std').dropTableIfExists('mtx_material');
};
