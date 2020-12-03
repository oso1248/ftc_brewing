const db = require('../dbConfig')

async function com(data){
  let rtn = await db('mtl_commodity').select('id').where('commodity', data['com_id'])
  let {id} = rtn[0]
  data['com_id'] = id
  return data
}
async function brewId(data){
  let rtn = await db('brnd_brw').select('id').where('brand', data.brand)
  let {id} = rtn[0]
  data.brw_id = id
  return data
}

async function add(data) {
  await com(data)
  const [{id}] = await db('inv_mat_weekly').insert(data, ['id'])
  return getByID(id)
}

function getInvDateMaterial() {
  return db.raw(`SELECT DISTINCT DATE_TRUNC('day',created_at) FROM inv_mat_weekly ORDER BY DATE_TRUNC('day',created_at) DESC`)
  // return db('inv_mat_weekly')
    // .distinct('created_at')
}

function getByID(id) {
  return db('inv_mat_weekly as inv')
    .join('mtl_commodity as com', 'inv.com_id', '=', 'com.id' )
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .select(
      'com.commodity',
      'inv.total_end',
      'uom.uom'
    )
    .where({'inv.id': id})
}
function getByDate(data) {
  return db('inv_mat_weekly as inv')
    .join('mtl_commodity as com', 'inv.com_id', '=', 'com.id' )
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .select(
      'com.commodity',
      'com.sap',
      'inv.total_per_unit',
      'inv.total_count',
      'inv.total_end',
      'uom.uom',
      'inv.username',
      'inv.created_at',
      'inv.note'
    )
    .where('inv.created_at', '>', data.startDate)
    .andWhere('inv.created_at', '<', data.endDate)
}

function getByDatetwo(date) {
  return db('inv_mat_weekly as inv')
    .join('mtl_commodity as com', 'inv.com_id', '=', 'com.id' )
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .select(
      'com.commodity',
      'com.sap',
      'inv.total_count',
      'inv.total_end',
      'uom.uom'
    )
    .where('inv.created_at', '>', date)
    .andWhere('created_at', '<', date)
}

//hop weekly
async function addInvHopWeekly(data) {
  await com(data)
  const [{id}] = await db('inv_hop_weekly').insert(data, ['id'])
  return getByIDHopWeekly(id)
}
function getByIDHopWeekly(id) {
  return db('inv_hop_weekly as inv')
    .join('mtl_commodity as com', 'inv.com_id', '=', 'com.id' )
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .select(
      'com.commodity',
      'inv.lbs',
      'uom.uom'
    )
    .where({'inv.id': id})
}
function getByDate(data) {
  return db('inv_hop_weekly as inv')
    .join('mtl_commodity as com', 'inv.com_id', '=', 'com.id' )
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .select(
      'com.commodity',
      'com.sap',
      'inv.lbs',
      'uom.uom',
      'inv.lot',
      'inv.username',
      'inv.created_at',
      'inv.note'
    )
    .where('inv.created_at', '>', data.startDate)
    .andWhere('inv.created_at', '<', data.endDate)
}

//hop daily
async function deleteSets(time) {
  await db('inv_hop_daily')
    .del()
    .where('created_at', '>', time.start)
    .andWhere('created_at', '<', time.end)
}
async function deleteBrews(time) {
  await db('inv_last_brews')
    .del()
    .where('created_at', '>', time.start)
    .andWhere('created_at', '<', time.end)
}
async function addSets(data) {
  await db('inv_hop_daily').insert(data)
}
async function addBrews(data) {
  await db('inv_last_brews').insert(data)
}
async function addInvHopDaily(data, user) {
  let time = data[0]
  data.shift()
  let brews = data[0]
  brews.username = user
  data.shift()
  for (let i = 0; i < data.length; i++) {
    data[i].brand = await brewId(data[i])
    data[i].username = user
    delete data[i].brand
  }
  await deleteSets(time)
  await deleteBrews(time)
  await addSets(data)
  await addBrews(brews)
}

module.exports = {
  add, 
  getInvDateMaterial, 
  getByID, 
  getByDate, 
  addInvHopWeekly,
  addInvHopDaily
}