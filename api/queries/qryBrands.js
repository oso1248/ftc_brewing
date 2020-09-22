const db = require('../dbConfig')

//Brand brw
async function addBrw(data) {
  const [{brand}]= await db('brnd_brw').insert(data, ['brand'])
  return getByNameBrw(brand)
}
function getAllBrw() {
  return db('brnd_brw')
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
function getAllFin() {
  return db('brnd_fin AS fin')
    .join('brnd_brw AS brw','fin.brw_id','=','brw.id')
    .select(
      'fin.brand AS brndFin',
      'brw.brand AS brndBrw',
      'fin.note'
    )
    .orderBy('fin.brand')
}
function getByNameFin(name) {
  return db('brnd_fin AS fin')
    .join('brnd_brw AS brw','fin.brw_id','=','brw.id')
    .select(
      'fin.brand AS brndFin',
      'brw.brand AS brndBrw',
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
function getAllPck() {
  return db('brnd_pck AS pck')
    .join('brnd_fin AS fin','pck.fin_id','=','fin.id')
    .select(
      'pck.brand AS brndPck',
      'brw.brand AS brndBrw',
      'pck.note'
    )
    .orderBy('pck.brand')
}
function getByNamePck(name) {
  return db('brnd_pck AS pck')
    .join('brnd_fin AS fin','pck.fin_id','=','fin.id')
    .select(
      'pck.brand AS brndPck',
      'fin.brand AS brndFin',
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
  destroyPck
}
