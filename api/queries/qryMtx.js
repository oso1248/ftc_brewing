const db = require('../dbConfig')


//hop
function getBrndHopUpdate(name) {
  return db('mtl_commodity AS com')
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .join('mtx_hop_std as hop', 'com.id', '=', 'hop.com_id')
    .select(  
      'hop.com_id',    
      'com.commodity as Hop',
      `hop.${name} as Pounds`,
    )
  .where('typ.type', '=','hop')
  .orderBy('com.commodity')
}
function getBrndHopView(name) {
  return db('mtl_commodity AS com')
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .join('mtx_hop_std as hop', 'com.id', '=', 'hop.com_id')
    .select(      
      'com.commodity as Hop',
      `hop.${name} as Pounds`,
    )
  .where('typ.type', '=','hop')
  .andWhere(`hop.${name}`, '>', 0)
  .orderBy('com.commodity')
}
async function patchBrndHopUpdate(name, changes){
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('mtx_hop_std')
        .where('com_id', data.com_id)
        .update(name, data.Pounds)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}


//Dry
function getBrndDryUpdate(name) {
  return db('mtl_commodity AS com')
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .join('mtx_hop_dry as hop', 'com.id', '=', 'hop.com_id')
    .select(  
      'hop.com_id',    
      'com.commodity as Hop',
      `hop.${name} as Pounds`,
    )
  .where('typ.type', '=','hop')
  .orderBy('com.commodity')
}
function getBrndDryView(name) {
  return db('mtl_commodity AS com')
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .join('mtx_hop_dry as hop', 'com.id', '=', 'hop.com_id')
    .select(      
      'com.commodity as Hop',
      `hop.${name} as Pounds`,
    )
  .where('typ.type', '=','hop')
  .andWhere(`hop.${name}`, '>', 0)
  .orderBy('com.commodity')
}
async function patchBrndDryUpdate(name, changes){
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('mtx_hop_dry')
        .where('com_id', data.com_id)
        .update(name, data.Pounds)
        .transacting(trx)
      queries.push(query) 
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
})

}


//sac
function getBrndSacUpdate(name) {
  return db('mtl_commodity AS com')
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .join('mtx_sac_supr as sac', 'com.id', '=', 'sac.com_id')
    .select(  
      'sac.com_id',    
      'com.commodity',
      `sac.${name} as Units`,
    )
  .where('typ.type', '=','malt')
  .orWhere('typ.type', '=','adjunct')
  .orderBy('com.commodity')
}
function getBrndSacView(name) {
  return db('mtl_commodity AS com')
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .join('mtx_sac_supr as sac', 'com.id', '=', 'sac.com_id')
    .select(      
      'com.commodity',
      `sac.${name} as Units`,
    )
  .where('typ.type', '=','malt')
  .andWhere(`sac.${name}`, '>', 0)
  .orWhere('typ.type', '=','adjunct')
  .andWhere(`sac.${name}`, '>', 0)
  .orderBy('com.commodity')
}
async function patchBrndSacUpdate(name, changes){
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('mtx_sac_supr')
        .where('com_id', data.com_id)
        .update(name, data.Units)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
})

}

module.exports = {
  getBrndHopUpdate, 
  getBrndHopView, 
  patchBrndHopUpdate,
  getBrndDryUpdate,
  getBrndDryView,
  patchBrndDryUpdate,
  getBrndSacUpdate,
  getBrndSacView,
  patchBrndSacUpdate
}