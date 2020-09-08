const db = require('../dbConfig')


async function add(data) {
  const [{container}]= await db('mtl_container').insert(data, ['container'])
  return getByName(container)
}

function getAll() {
  return db('mtl_container').orderBy('container')
}

function getByName(name) {
  return db('mtl_container')
    .where({container: name})
    .first() 
}

async function change(name, changes) {
  console.log(changes)
  let response = await db('mtl_container').where({container: name}).update(changes)
  return getByName(name)

}

async function destroy(name) {
  let remove = await db('mtl_container').where('container', name).del()
  return getByName(name)
}

module.exports = {add, getAll, getByName, change, destroy}