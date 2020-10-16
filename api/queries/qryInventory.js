const db = require('../dbConfig')

async function com(data){
  let rtn = await db('mtl_commodity').select('id').where('commodity', data['com_id'])
  let {id} = rtn[0]
  data['com_id'] = id
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


module.exports = {add, getInvDateMaterial, getByID, getByDate}