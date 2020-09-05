const knex = require('knex')
const config = require('../../knexfile')
const db = knex(config.development)


async function add(data) {
  const [{company}]= await db('mtl_supplier').insert(data, ['company'])
  return getByName(company)
}

function getAll() {
  return db('mtl_supplier')
}

function getByName(name) {
  return db('mtl_supplier')
    .where({company: name})
    .first() 
}

async function change(name, changes) {
  let response = await db('mtl_supplier').where({company: name}).update(changes)
  return getByName(name)

}

async function destroy(name) {
  let remove = await db('mtl_supplier').where('company', name).del()
  return getByName(name)
}

module.exports = {add, getAll, getByName, change, destroy}