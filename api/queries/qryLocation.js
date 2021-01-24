const db = require('../dbConfig');

async function add(data) {
  const [{ location }] = await db('mtl_location').insert(data, ['location']);
  return getByName(location);
}

function getAll() {
  return db('mtl_location').orderBy('location');
}

function getByName(name) {
  return db('mtl_location').where({ location: name }).first();
}

async function change(name, changes) {
  let response = await db('mtl_location').where({ location: name }).update(changes);
  return getByName(name);
}

async function destroy(name) {
  let remove = await db('mtl_location').where('location', name).del();
  return getByName(name);
}

module.exports = { add, getAll, getByName, change, destroy };
