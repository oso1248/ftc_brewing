const db = require('../dbConfig')


async function add(data) {
  const [{type}]= await db('mtl_type').insert(data, ['type'])
  return getByName(type)
}

function getAll() {
  return db('mtl_type').orderBy('type')
}

function getByName(name) {
  return db('mtl_type')
    .where({type: name})
    .first() 
}

async function change(name, changes) {
  console.log(changes)
  let response = await db('mtl_type').where({type: name}).update(changes)
  return getByName(name)

}

async function destroy(name) {
  let remove = await db('mtl_type').where('type', name).del()
  return getByName(name)
}

module.exports = {add, getAll, getByName, change, destroy}