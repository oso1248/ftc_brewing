const db = require('../dbConfig')

// function to convert name to id number
async function type(data){
  let rtn = await db('vessel_type').select('id').where('type', data.type_id)
  let {id} = rtn[0]
  data['type_id'] = id
  return data
}
async function location(data){
  let rtn = await db('mtl_location').select('id').where('location', data.loc_id)
  let {id} = rtn[0]
  data['loc_id'] = id
  return data
}

async function add(data) {
  await type(data)
  await location(data)
  
  const [{vessel}] = await db('vessel').insert(data, ['vessel'])
  return getByName(vessel)
}
function getAll(active) {
  if(active) {
    return db('vessel AS ves')
      .join('vessel_type as typ', 'ves.type_id', '=', 'typ.id')
      .join('mtl_location as loc', 'ves.loc_id', '=', 'loc.id')
      .select(
        'ves.id',
        'ves.vessel',
        'ves.active',
        'ves.note',
        'loc.location',
        'typ.type',
      )
      .where('ves.active', '=', 'Yes')
      .orderBy('ves.vessel')  
  } else {
    return db('vessel AS ves')
      .join('vessel_type as typ', 'ves.type_id', '=', 'typ.id')
      .join('mtl_location as loc', 'ves.loc_id', '=', 'loc.id')
      .select(
        'ves.id',
        'ves.vessel',
        'ves.active',
        'ves.note',
        'loc.location',
        'typ.type',
      )
      .orderBy([{column:'ves.active',order:'desc'},{ column:'ves.vessel'}])
  }
}
function getByName(name) {
  return db('vessel AS ves')
    .join('vessel_type as typ', 'ves.type_id', '=', 'typ.id')
    .join('mtl_location as loc', 'ves.loc_id', '=', 'loc.id')
    .select(
      'ves.id',
      'ves.vessel',
      'ves.active',
      'ves.note',
      'loc.location',
      'typ.type',
    )
  .where({'ves.vessel': name})
  .first() 
}
async function change(name, changes) {
  await type(changes)
  await location(changes)
  return db('vessel')
    .where({vessel: name})
    .update(changes)
    .then(() => {
    return getByName(name)
    })
}
async function destroy(name) {
  let remove = await db('mtl_commodity').where('commodity', name).del()
  return getByName(name)
}

// get tanks
function getAllHibernateTanks() {
  return db('vessel AS ves')
    .join('vessel_type as typ', 'ves.type_id', '=', 'typ.id')
    .select(
      'ves.vessel',
    )
    .where('ves.active', '=', 'Yes')
    .andWhere('typ.type', '=', 'Chip Beer Tank')
    .orWhere('typ.type', '=', 'Schoene Beer Tank')
    .orderBy('ves.vessel')
}
function getAllHibernateChipTanks() {
  return db('vessel AS ves')
    .join('vessel_type as typ', 'ves.type_id', '=', 'typ.id')
    .select(
      'ves.vessel',
    )
    .where('ves.active', '=', 'Yes')
    .andWhere('typ.type', '=', 'Chip Beer Tank')
    .orderBy('ves.vessel')
}
function getAllVesselTypes() {
  return db('vessel_type AS ves')
    .select(
      'ves.id',
      'ves.type',
    )
    .orderBy('ves.type')  
}
function getSchoeneTanks(active) {
  if(active) {
    return db('vessel AS ves')
      .join('vessel_type as typ', 'ves.type_id', '=', 'typ.id')
      .select(
        'ves.id',
        'ves.vessel',
        'ves.active',
        'ves.note',
        'typ.type',
      )
      .where('ves.active', '=', 'Yes')
      .andWhere('typ.type', '=', 'Schoene Beer Tank')
      .orderBy('ves.vessel')  
  } else {
    return db('vessel AS ves')
      .join('vessel_type as typ', 'ves.type_id', '=', 'typ.id')
      .select(
        'ves.id',
        'ves.vessel',
        'ves.active',
        'ves.note',
        'typ.type',
      )
      .where('typ.type', '=', 'Schoene Beer Tank')
      .orderBy([{column:'ves.active',order:'desc'},{ column:'ves.vessel'}])
  }
}


module.exports = {
  add,
  getAll,
  getByName,
  change,
  destroy,
  getAllVesselTypes, 
  getAllHibernateTanks, 
  getAllHibernateChipTanks,
  getSchoeneTanks
}