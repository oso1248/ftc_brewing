const db = require('../dbConfig')


async function add(data) {
  const [{brewery}]= await db('brewery').insert(data, ['brewery'])
  return getByName(brewery)
}

function getAll() {
  return db('brewery')
}

function getByName(name) {
  return db('brewery')
    .where({brewery: name})
    .first() 
}

async function change(name, changes) {
  let response = await db('brewery').where({brewery: name}).update(changes)
  return getByName(name)

}

async function destroy(name) {
  let remove = await db('brewery').where('brewery', name).del()
  return getByName(name)
}

module.exports = {add, getAll, getByName, change, destroy}