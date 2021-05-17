const db = require('../dbConfig');

async function add(data) {
  const [{ id }] = await db('brewery').select('id').where('brewery', data.brewery_id);
  data.brewery_id = id;
  const [{ username }] = await db('users').insert(data, ['username']);
  return await getByName(username);
}

function getAll() {
  return db('users as use').select('use.username', 'use.email', 'use.permissions', 'brw.brewery').join('brewery as brw', 'brw.id', '=', 'use.brewery_id').orderBy('use.username');
}

function getByName(name) {
  return db('users as use').select('use.username', 'use.email', 'use.permissions', 'brw.brewery').join('brewery as brw', 'brw.id', '=', 'use.brewery_id').where({ username: name }).first();
}

async function change(name, changes) {
  const [{ id }] = await db('brewery').select('id').where('brewery', changes.brewery_id);
  changes.brewery_id = id;
  let response = await db('users').where({ username: name }).update(changes);
  return getByName(name);
}

async function destroy(name) {
  let remove = await db('users').where('username', name).del();
  return getByName(name);
}

async function addManpower(data) {
  let { rows } = await db.raw(`
    INSERT INTO manpower (brewer, position, shift, note, updated_by)
    VALUES  ('${data.brewer}', '${data.position}', '${data.shift}', '${data.note}', '${data.updated_by}')
    RETURNING brewer, position
  `);
  return rows;
}

async function getManpower(data) {
  let { rows } = await db.raw(`
    SELECT id, brewer, position, note, shift
    FROM manpower
    WHERE shift = '${data.shift}' AND created_at >= '${data.start}' AND created_at <= '${data.stop}'
    ORDER BY brewer;
  `);
  return rows;
}

async function deleteManpower(id) {
  let { rows } = await db.raw(`
    DELETE
    FROM manpower
    WHERE id = ${id}
    RETURNING brewer, position
  `);
  return rows;
}

module.exports = { add, getAll, getByName, change, destroy, addManpower, getManpower, deleteManpower };
