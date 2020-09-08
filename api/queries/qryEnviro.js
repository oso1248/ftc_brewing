const db = require('../dbConfig')


async function add(data) {
  const [{enviro}]= await db('mtl_enviro').insert(data, ['enviro'])
  return getByName(enviro)
}

function getAll() {
  return db('mtl_enviro').orderBy('enviro')
}

function getByName(name) {
  return db('mtl_enviro')
    .where({enviro: name})
    .first() 
}

async function change(name, changes) {
  let response = await db('mtl_enviro').where({enviro: name}).update(changes)
  return getByName(name)

}

async function destroy(name) {
  let remove = await db('mtl_enviro').where('enviro', name).del()
  return getByName(name)
}

module.exports = {add, getAll, getByName, change, destroy}