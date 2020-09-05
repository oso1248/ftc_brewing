
exports.up = function(knex) {
  return knex.schema.createTable('brewery', tbl => {
    tbl.increments()
    tbl.string('brewery', 32)
      .notNullable()
      .unique()
    tbl.string('note', 256)
    tbl.timestamps(true, true)
  })
  .createTable('users', tbl => {
    tbl.increments()
    tbl.string('username', 128)
      .notNullable()
      .unique()
      .index()
    tbl.string('password', 256)
      .notNullable()
    tbl.string('email', 128)
      .notNullable()
      .unique()
    tbl.integer('permissions', 8)
      .notNullable()
    tbl.integer('brewery_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('brewery')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('brewery')
};
