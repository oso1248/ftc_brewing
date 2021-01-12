const db = require('../dbConfig')

// function to convert name to id number
async function brand(data){
  let rtn = await db('brnd_brw').select('id').where('brand', data.brw_id)
  let {id} = rtn[0]
  data.brw_id = id
  return data
}
async function add(data) {
  await brand(data)
  const [{id}] = await db('hibernated').insert(data, ['id'])
  return getById(id)
}
function getById(id) {
  return db('hibernated AS hib')
    .join('brnd_brw as brw', 'hib.brw_id', '=', 'brw.id')
    .select(
      'hib.org_vessel',
      'hib.org_vol',
      'hib.int_vessel',
      'hib.int_vol',
      'hib.end_vessel',
      'hib.end_vol',
      'brw.brand',
      'hib.note',
      'hib.created_at',
      'hib.updated_at',
    )
  .where({'hib.id': id})
}
function getHibernatedTankList() {
  return db('hibernated AS hib')
    .select(
      'hib.id',
      'hib.int_vessel',
      'hib.note',
    )
  .where('hib.end_vol', '=', 0)
  .orderBy('hib.org_vessel', 'asc')
}
async function update(id, changes) {
  return db('hibernated')
    .where({id: id})
    .update(changes)
    .then(() => {
    return getById(id)
    })
}
function getHibernatedLog() {
  return db('hibernated AS hib')
    .join('brnd_brw as brw', 'hib.brw_id', '=', 'brw.id')
    .select(
      'hib.org_vessel',
      'hib.org_vol',
      'hib.int_vessel',
      'hib.int_vol',
      'hib.end_vessel',
      'hib.end_vol',
      'brw.brand',
      'hib.note',
      'hib.username1',
      'hib.username2',
      'hib.created_at',
      'hib.updated_at',
    )
  .orderBy('hib.created_at', 'desc')
}


module.exports = {
  add,
  getById,
  getHibernatedTankList,
  update,
  getHibernatedLog,
}