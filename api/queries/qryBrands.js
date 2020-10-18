const db = require('../dbConfig')

//Brand brw
async function addBrw(data) {
  const [{brand}]= await db('brnd_brw').insert(data, ['brand'])
  return getByNameBrw(brand)
}
function getAllBrw(active) {
  console.log(active)
  if(active) {
  return db('brnd_brw AS brw')
  .where('active', '=', 'Yes')
  .orderBy('brand')
  } else {
    return db('brnd_brw AS brw')
    .orderBy([{column:'active',order:'desc'},{ column:'brand'}])
  }
}
function getByNameBrw(name) {
  return db('brnd_brw')
    .where({brand: name})
    .first() 
}
async function changeBrw(name, changes) {
  let response = await db('brnd_brw').where({brand: name}).update(changes)
  return getByNameBrw(name)

}
async function destroyBrw(name) {
  let remove = await db('brnd_brw').where('brand', name).del()
  return getByNameBrw(name)
}

//Brand fin
async function brwId(data){
  let rtn = await db('brnd_brw').select('id').where('brand', data['brw_id'])
  let {id} = rtn[0]
  data['brw_id'] = id
  return data
}
async function addFin(data) {
  await brwId(data)
  const [{brand}]= await db('brnd_fin').insert(data, ['brand'])
  return getByNameFin(brand)
}
function getAllFin(active) {
  if(active) {
    return db('brnd_fin AS fin')
      .join('brnd_brw AS brw','fin.brw_id','=','brw.id')
      .leftOuterJoin('brnd_pck as pck','pck.fin_id','=','fin.id')
      .select(
        'fin.brand AS brndFin',
        'fin.active AS active',
        'pck.brand AS brndPck',
        'brw.brand AS brndBrw',
        'fin.note'
      )
      .where('fin.active', '=', 'Yes')
      .orderBy('fin.brand')
  } else {
    return db('brnd_fin AS fin')
      .join('brnd_brw AS brw','fin.brw_id','=','brw.id')
      .leftOuterJoin('brnd_pck as pck','pck.fin_id','=','fin.id')
      .select(
        'fin.brand AS brndFin',
        'fin.active AS active',
        'pck.brand AS brndPck',
        'brw.brand AS brndBrw',
        'fin.note'
      )
      // .orderBy('fin.brand')
      .orderBy([{ column: 'fin.active', order: 'desc'}, { column: 'fin.brand' }])
  }
}
function getByNameFin(name) {
  return db('brnd_fin AS fin')
    .join('brnd_brw AS brw','fin.brw_id','=','brw.id')
    .leftOuterJoin('brnd_pck as pck','pck.fin_id','=','fin.id')
    .select(
      'fin.brand AS brndFin',
      'fin.active AS active',
      'brw.brand AS brndBrw',
      'pck.brand AS brndPck',
      'fin.note'
    )
    .where({'fin.brand': name})
    .first() 
}
async function changeFin(name, changes) {
  await brwId(changes)
  let response = await db('brnd_fin').where({brand: name}).update(changes)
  return getByNameFin(name)
}
async function destroyFin(name) {
  let remove = await db('brnd_fin').where('brand', name).del()
  return getByNameFin(name)
}

//Brand pck
async function finId(data){
  let rtn = await db('brnd_fin').select('id').where('brand', data['fin_id'])
  let {id} = rtn[0]
  data['fin_id'] = id
  return data
}
async function addPck(data) {
  await finId(data)
  console.log(data)
  const [{brand}]= await db('brnd_pck').insert(data, ['brand'])
  return getByNamePck(brand)
}
function getAllPck(active) {
  if(active) {
    return db('brnd_fin AS fin')
      .join('brnd_brw AS brw','fin.brw_id','=','brw.id')
      .join('brnd_pck as pck','pck.fin_id','=','fin.id')
      .select(
        'pck.brand AS brndPck',
        'pck.active as active',
        'fin.brand AS brndFin',
        'brw.brand AS brndBrw',
        'pck.note'
      )
      .where('pck.active', '=', 'Yes')
      .orderBy('pck.brand')
  } else {
    return db('brnd_fin AS fin')
      .join('brnd_brw AS brw','fin.brw_id','=','brw.id')
      .join('brnd_pck as pck','pck.fin_id','=','fin.id')
      .select(
        'pck.brand AS brndPck',
        'pck.active as active',
        'fin.brand AS brndFin',
        'brw.brand AS brndBrw',
        'pck.note'
      )
      .orderBy([{ column: 'pck.active', order: 'desc'}, { column: 'pck.brand' }])
    }
}
function getByNamePck(name) {
  return db('brnd_fin AS fin')
    .join('brnd_brw AS brw','fin.brw_id','=','brw.id')
    .join('brnd_pck as pck','pck.fin_id','=','fin.id')
    .select(
      'brw.brand AS brndBrw',
      'fin.brand AS brndFin',
      'pck.brand AS brndPck',
      'pck.active AS active',
      'pck.note'
    )
    .where({'pck.brand': name})
    .first() 
}
async function changePck(name, changes) {
  await finId(changes)
  let response = await db('brnd_pck').where({brand: name}).update(changes)
  return getByNamePck(name)
}
async function destroyPck(name) {
  let remove = await db('brnd_pck').where('brand', name).del()
  return getByNamePck(name)
}


// Detail
function getDetailByNameBrwPre(name) {
  return db('brnd_brw AS brw')
    .join('csx_pre AS pre','pre.brw_id', '=', 'brw.id')
    .select(
      'brw.brand AS Brand',
      'pre.tk_chp AS Chip Tank',
      'pre.tk_uni AS Uni Tank',
      'pre.lines AS Lines',
      'pre.cooler AS Cooler',
      'pre.seps AS Separators',
      'pre.acp AS ACP',
      'pre.tk_sch AS Schoene Tank',
      'pre.tk_fill AS Fill Tank',
      'pre.note AS Note'
      )
    .where({'brw.brand': name})
    .first() 
}
function getDetailByNameBrwPost(name) {
  return db('brnd_brw AS brw')
    .join('csx_post AS post','post.brw_id', '=', 'brw.id')
    .select(
      'brw.brand AS Brand',
      'post.tk_chp AS Chip Tank',
      'post.tk_uni AS Uni Tank',
      'post.lines AS Lines',
      'post.seps AS Separators',
      'post.tk_sch AS Schoene Tank',
      'post.note AS Note'

      )
    .where({'brw.brand': name})
    .first() 
}



module.exports = {
  addBrw, 
  getAllBrw, 
  getByNameBrw, 
  changeBrw, 
  destroyBrw,
  addFin, 
  getAllFin,
  getByNameFin, 
  changeFin, 
  destroyFin,
  addPck, 
  getAllPck, 
  getByNamePck, 
  changePck, 
  destroyPck,
  getDetailByNameBrwPre,
  getDetailByNameBrwPost
}
