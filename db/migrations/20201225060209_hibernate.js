
exports.up = function(knex) {
  return knex.schema.createTable('hibernated', tbl => {
    tbl.increments()
    tbl.string('org_vessel', 50)
      .notNullable()
    tbl.string('int_vessel', 50)
      .notNullable()
    tbl.string('end_vessel', 50)
    tbl.decimal('org_vol', 50, 2)
      .notNullable()
      .defaultTo(0)
    tbl.decimal('int_vol', 50, 2)
      .notNullable()
      .defaultTo(0)
    tbl.decimal('end_vol', 50, 2)
      .notNullable()
      .defaultTo(0)
    tbl.string('note', 256)
    tbl.integer('brw_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('brnd_brw')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('hibernated')

}
