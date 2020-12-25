
exports.up = function(knex) {
  return knex.schema.createTable('vessel_type', tbl => {
    tbl.increments()
    tbl.string('type', 50)
      .notNullable()
      .unique()
    tbl.timestamps(true, true)
  })
  .createTable('vessel', tbl => {
    tbl.increments()
    tbl.string('vessel', 50)
      .notNullable()
      .unique()
    tbl.string('active', 5)
      .notNullable()
    tbl.string('note', 250)
    tbl.timestamps(true, true)
    tbl.integer('loc_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('mtl_location')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.integer('type_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('vessel_type')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('vessel').dropTableIfExists('vessel_type')
}