
exports.up = function(knex) {
  return knex.schema.createTable('inv_mat_weekly', tbl => {
    tbl.increments()
    tbl.integer('com_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('mtl_commodity')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.decimal('total_per_unit', 8, 2)
      .notNullable()
    tbl.decimal('total_count', 8, 2)
      .notNullable()
    tbl.decimal('total_end', 8, 2)
      .notNullable()
    tbl.string('username', 50)
      .notNullable()
    tbl.string('note', 1024)
    tbl.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('inv_mat_weekly')
};
