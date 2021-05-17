exports.up = function (knex) {
  return knex.schema
    .createTable('brewery', (tbl) => {
      tbl.increments();
      tbl.string('brewery', 32).notNullable().unique();
      tbl.string('note', 256);
      tbl.timestamps(true, true);
    })
    .createTable('users', (tbl) => {
      tbl.increments();
      tbl.string('username', 128).notNullable().unique().index();
      tbl.string('password', 512).notNullable();
      tbl.string('email', 128).notNullable().unique();
      tbl.integer('permissions', 8).notNullable();
      tbl.integer('brewery_id').unsigned().notNullable().references('id').inTable('brewery').onDelete('CASCADE').onUpdate('CASCADE');
      tbl.timestamps(true, true);
    })
    .raw(
      `
    CREATE TABLE IF NOT EXISTS session (
    sid varchar NOT NULL COLLATE "default",
    sess json NOT NULL,
    expire timestamp(6) NOT NULL,
    CONSTRAINT "session_pkey" PRIMARY KEY ("sid"));
    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON session ("expire");
  `
    )
    .createTable('manpower', (tbl) => {
      tbl.increments();
      tbl.string('brewer', 128).notNullable();
      tbl.string('position', 128).notNullable();
      tbl.string('note', 512);
      tbl.string('shift', 10);
      tbl.string('updated_by', 512).notNullable();
      tbl.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('brewery').dropTableIfExists('session').dropTableIfExists('manpower');
};
