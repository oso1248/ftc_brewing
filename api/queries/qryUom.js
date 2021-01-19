const db = require('../dbConfig');

async function add(data) {
  const [{ uom }] = await db('mtl_uom').insert(data, ['uom']);
  return getByName(uom);
}

function getAll() {
  return db('mtl_uom').orderBy('uom');
}

function getByName(name) {
  return db('mtl_uom').where({ uom: name }).first();
}

async function change(name, changes) {
  let response = await db('mtl_uom').where({ uom: name }).update(changes);
  return getByName(name);
}

async function destroy(name) {
  let remove = await db('mtl_uom').where('uom', name).del();
  return getByName(name);
}

module.exports = { add, getAll, getByName, change, destroy };
