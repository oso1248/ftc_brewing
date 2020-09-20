const db = require('../dbConfig')

// function to convert name to id number
async function uom(data){
  let rtn = await db('mtl_uom').select('id').where('uom', data['uom_id'])
  let {id} = rtn[0]
  data['uom_id'] = id
  return data
}
async function type(data){
  let rtn = await db('mtl_type').select('id').where('type', data['type_id'])
  let {id} = rtn[0]
  data['type_id'] = id
  return data
}
async function location(data){
  let rtn = await db('mtl_location').select('id').where('location', data['location_id'])
  let {id} = rtn[0]
  data['location_id'] = id
  return data
}
async function enviro(data){
  let rtn = await db('mtl_enviro').select('id').where('enviro', data['enviro_id'])
  let {id} = rtn[0]
  data['enviro_id'] = id
  return data
}
async function container(data){
  let rtn = await db('mtl_container').select('id').where('container', data['container_id'])
  let {id} = rtn[0]
  data['container_id'] = id
  return data
}
async function supplier(data){
  let rtn = await db('mtl_supplier').select('id').where('company', data['supplier_id'])
  let {id} = rtn[0]
  data['supplier_id'] = id
  return data
}


async function add(data) {
  await uom(data)  
  await type(data)
  await location(data)
  await enviro(data)
  await container(data)
  await supplier(data)
  
  const [{commodity}] = await db('mtl_commodity').insert(data, ['commodity'])
  return getByName(commodity)
}

function getAll() {
  return db('mtl_commodity AS com')
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .join('mtl_location AS loc', 'com.location_id', 'loc.id' )
    .join('mtl_enviro as env', 'com.enviro_id', '=', 'env.id')
    .join('mtl_container as con', 'com.container_id', '=', 'con.id')
    .join('mtl_supplier as sup', 'com.supplier_id', '=', 'sup.id')
    .select(
      'com.commodity',
      'com.sap',
      'com.active',
      'com.inventory',
      'loc.location',
      'sup.company',
      'typ.type',
      'con.container',
      'env.enviro',
      'com.threshold',
      'com.per_pallet',
      'com.unit_total',
      'uom.uom',
      'com.note'
    )
    .orderBy('commodity', 'asc')
}

function getByName(name) {
  return db('mtl_commodity AS com')
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .join('mtl_location AS loc', 'com.location_id', 'loc.id' )
    .join('mtl_enviro as env', 'com.enviro_id', '=', 'env.id')
    .join('mtl_container as con', 'com.container_id', '=', 'con.id')
    .join('mtl_supplier as sup', 'com.supplier_id', '=', 'sup.id')
    .select(
      'com.commodity',
      'com.sap',
      'com.active',
      'com.inventory',
      'loc.location',
      'sup.company',
      'typ.type',
      'con.container',
      'env.enviro',
      'com.threshold',
      'com.per_pallet',
      'com.unit_total',
      'uom.uom',
      'com.note'
    )
  .where({'com.commodity': name})
  .first() 
}

async function change(name, changes) {
  await uom(changes)  
  await type(changes)
  await location(changes)
  await enviro(changes)
  await container(changes)
  await supplier(changes)
  return db('mtl_commodity')
    .where({commodity: name})
    .update(changes)
    .then(() => {
    return getByName(name)
    })
}

async function destroy(name) {
  let remove = await db('mtl_commodity').where('commodity', name).del()
  return getByName(name)
}

module.exports = {add, getAll, getByName, change, destroy}