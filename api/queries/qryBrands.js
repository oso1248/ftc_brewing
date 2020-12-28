const db = require('../dbConfig')


//Brand brw
async function addBrw(data) {
  const [{brand, id}]= await db('brnd_brw').insert(data, ['brand', 'id'])
  let res = await db('csx_pre').insert({'brw_id': id})
  res = await db('csx_post').insert({'brw_id': id})
  res = await db('chp_params').insert({'brw_id': id})
  res = await db('chp_smpl').insert({'brw_id': id})
  res = await db('sch_params').insert({'brw_id': id})
  res = await db('sch_smpl').insert({'brw_id': id})
  res = await db('acx_pre').insert({'brw_id': id})
  res = await db('acx_post').insert({'brw_id': id})
  
  await db.schema.table('mtx_hop_dry', function (table) {
    table.decimal(brand, 50, 2)
    .notNullable()
    .defaultTo(0)
  })
  await db.schema.table('mtx_hop_std', function (table) {
    table.decimal(brand, 50, 2)
    .notNullable()
    .defaultTo(0)
  })
  await db.schema.table('mtx_sac_supr', function (table) {
    table.decimal(brand, 50, 2)
    .notNullable()
    .defaultTo(0)
  })
  await db.schema.table('mtx_material', function (table) {
    table.decimal(brand, 50, 2)
    .notNullable()
    .defaultTo(0)
  })
  return getByNameBrw(brand)
}
function getAllBrw(active) {
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


function getAllBrwStd(active) {
  if(active) {
  return db('brnd_brw AS brw')
  .where('active', '=', 'Yes')
  .andWhere('hop_std','=','Yes')
  .orderBy('brand')
  } else {
    return db('brnd_brw AS brw')
    .where('hop_std','=','Yes')
    .orderBy([{column:'active',order:'desc'},{ column:'brand'}])
  }
}
function getAllBrwCrft(active) {
  if(active) {
  return db('brnd_brw AS brw')
  .where('active', '=', 'Yes')
  .andWhere('hop_crft','=','Yes')
  .orderBy('brand')
  } else {
    return db('brnd_crft AS brw')
    .where('hop_std','=','Yes')
    .orderBy([{column:'active',order:'desc'},{ column:'brand'}])
  }
}
function getAllBrwDry(active) {
  if(active) {
  return db('brnd_brw AS brw')
  .where('active', '=', 'Yes')
  .andWhere('hop_dry','=','Yes')
  .orderBy('brand')
  } else {
    return db('brnd_brw AS brw')
    .where('hop_dry','=','Yes')
    .orderBy([{column:'active',order:'desc'},{ column:'brand'}])
  }
}
function getAllBrwSac(active) {
  if(active) {
  return db('brnd_brw AS brw')
  .where('active', '=', 'Yes')
  .andWhere('supr_sac','=','Yes')
  .orderBy('brand')
  } else {
    return db('brnd_brw AS brw')
    .where('supr_sac','=','Yes')
    .orderBy([{column:'active',order:'desc'},{ column:'brand'}])
  }
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
  const [{brand, id}]= await db('brnd_fin').insert(data, ['brand', 'id'])
  let res = await db('fin_smpl').insert({'fin_id': id})
  res = await db('fin_params').insert({'fin_id': id})
  res = await db('rel_pre').insert({'fin_id': id})
  res = await db('rel_post').insert({'fin_id': id})
  res = await db('fltr_pre').insert({'fin_id': id})
  res = await db('fltr_post').insert({'fin_id': id})

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
        'pck.active AS pckActive',
        'brw.brand AS brndBrw',
        'brw.active AS brwActive',
        'fin.injection AS injection',
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
        'pck.active AS pckActive',
        'brw.brand AS brndBrw',
        'brw.active AS brwActive',
        'fin.injection AS injection',
        'fin.note'
      )
      // .orderBy('fin.brand')
      .orderBy([{ column: 'fin.active', order: 'desc'}, { column: 'fin.brand' }])
  }
}
function getAllFinIngredient(active) {
  if(active) {
    return db('brnd_fin AS fin')
      .select(
        'fin.id',
        'fin.brand AS brndFin',
      )
      .where('fin.active', '=', 'Yes')
      .andWhere('fin.injection', '=', 'Yes')
      .orderBy('fin.brand')
  } else {
    return db('brnd_fin AS fin')
      .select(
        'fin.id',
        'fin.brand AS brndFin',
      )
      .where('fin.injection', '=', 'Yes')
      .orderBy('fin.brand')
      // .orderBy([{ column: 'fin.active', order: 'desc'}, { column: 'fin.brand' }])
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
      'brw.active AS brwActive',
      'pck.brand AS brndPck',
      'pck.active AS pckActive',
      'fin.injection AS injection',
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
function getDetailByNameCsxPre(name) {
  return db('brnd_brw AS brw')
    .join('csx_pre AS pre','pre.brw_id', '=', 'brw.id')
    .select(
      'brw.brand',
      'pre.tk_chp',
      'pre.tk_uni',
      'pre.lines',
      'pre.cooler',
      'pre.seps',
      'pre.acp',
      'pre.tk_sch',
      'pre.tk_fill',
      'pre.note',
      'brw.id'
      )
    .where({'brw.brand': name})
    .first() 
}
function getDetailByNameCsxPost(name) {
  return db('brnd_brw AS brw')
    .join('csx_post AS post','post.brw_id', '=', 'brw.id')
    .select(
      'brw.brand',
      'post.tk_chp',
      'post.tk_uni',
      'post.lines',
      'post.seps',
      'post.tk_sch',
      'post.note',
      'brw.id'
      )
    .where({'brw.brand': name})
    .first() 
}
function getDetailByNameFilPre(name) {
  return db('brnd_fin AS fin')
    .join('fltr_pre AS pre','pre.fin_id', '=', 'fin.id')
    .select(
      'fin.brand',
      'pre.tk_sch',
      'pre.lines',
      'pre.tk_trp',
      'pre.tk_fbt',
      'pre.tk_fill',
      'pre.inj',
      'pre.ctrl',
      'pre.note',
      'fin.id'
      )
    .where({'fin.brand': name})
    .first() 
}
function getDetailByNameFilPost(name) {
  return db('brnd_fin AS fin')
    .join('fltr_post AS post','post.fin_id', '=', 'fin.id')
    .select(
      'fin.brand',
      'post.tk_sch',
      'post.lines',
      'post.tk_trp',
      'post.tk_fbt',
      'post.recover',
      'post.note',
      'fin.id'
      )
    .where({'fin.brand': name})
    .first() 
}
function getDetailByNameRelPre(name) {
  return db('brnd_fin AS fin')
    .join('rel_pre AS pre','pre.fin_id', '=', 'fin.id')
    .select(
      'fin.brand',
      'pre.tk_fbt',
      'pre.lines',
      'pre.tk_lin',
      'pre.tk_dft',
      'pre.recover',
      'pre.ctrl',
      'pre.note',
      'fin.id'
      )
    .where({'fin.brand': name})
    .first() 
}
function getDetailByNameRelPost(name) {
  return db('brnd_fin AS fin')
    .join('rel_post AS post','post.fin_id', '=', 'fin.id')
    .select(
      'fin.brand',
      'post.tk_fbt',
      'post.lines',
      'post.tk_lin',
      'post.tk_dft',
      'post.recover',
      'post.note',
      'fin.id'
      )
    .where({'fin.brand': name})
    .first() 
}
async function patchDetail(changes) {
  await patchCsxPre(changes[0])
  await patchCsxPost(changes[1])
  await patchFltrPre(changes[2])
  await patchFltrPost(changes[3])
  await patchRelPre(changes[4])
  await patchRelPost(changes[5])
}
function patchCsxPre(changes) {
  changes.shift()
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('csx_pre')
        .where('brw_id', data.id_brnd)
        .update(data.db, data.method)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
function patchCsxPost(changes) {
  changes.shift()
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('csx_post')
        .where('brw_id', data.id_brnd)
        .update(data.db, data.method)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
function patchFltrPre(changes) {
  changes.shift()
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('fltr_pre')
        .where('fin_id', data.id_brnd)
        .update(data.db, data.method)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
function patchFltrPost(changes) {
  changes.shift()
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('fltr_post')
        .where('fin_id', data.id_brnd)
        .update(data.db, data.method)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
function patchRelPre(changes) {
  changes.shift()
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('rel_pre')
        .where('fin_id', data.id_brnd)
        .update(data.db, data.method)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
function patchRelPost(changes) {
  changes.shift()
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('rel_post')
        .where('fin_id', data.id_brnd)
        .update(data.db, data.method)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}



//Recipe
function getRecipeByNameChp(name) {
  return db('brnd_brw AS brw')
    .join('chp_params AS chp','chp.brw_id', '=', 'brw.id')
    .select(
      'brw.brand',
      'chp.param_d',
      'chp.param_p',
      'chp.param_aa',
      'chp.param_abw',
      'chp.param_rdf',
      'chp.note',
      'brw.id',      
      )
    .where({'brw.brand': name})
    .first() 
}
function getRecipeByNameSch(name) {
  return db('brnd_brw AS brw')
    .join('sch_params AS sch','sch.brw_id', '=', 'brw.id')
    .select(
      'brw.brand',
      'sch.cc',
      'sch.acp',
      'sch.note',
      'brw.id'
      )
    .where({'brw.brand': name})
    .first() 
}
function getRecipeByNameFin(name) {
  return db('brnd_fin AS fin')
    .join('fin_params AS prm','prm.fin_id', '=', 'fin.id')
    .select(
      'fin.brand',

      'prm.og_ftrctrl',
      'prm.alc_ftrctrl',
      'prm.cal_ftrctrl',
      'prm.crb_ftrctrl',
      'prm.rdf_ftrctrl',
      'prm.co2_ftrctrl',
      'prm.cc_ftrctrl',

      'prm.og_relctrl',
      'prm.alc_relctrl',
      'prm.cal_relctrl',
      'prm.crb_relctrl',
      'prm.rdf_relctrl',
      'prm.co2_relctrl',
      'prm.cc_relctrl',
      
      'prm.og_sp',
      'prm.og_losl',
      'prm.og_losh',

      'prm.alc_sp',
      'prm.alc_losl',
      'prm.alc_losh',

      'prm.cal_sp',
      'prm.cal_losl',
      'prm.cal_losh',

      'prm.crb_sp',
      'prm.crb_losl',
      'prm.crb_losh',

      'prm.rdf_sp',
      'prm.rdf_losl',
      'prm.rdf_losh',

      'prm.co2_sp',
      'prm.co2_losl',
      'prm.co2_losh',

      'prm.cc_sp',
      'prm.cc_losl',
      'prm.cc_losh',
      
      'prm.note',
      'fin.id'
      )
    .where({'fin.brand': name})
    .first() 
}
function patchRecipeChp(changes) {
  changes.shift()
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('chp_params')
        .where('brw_id', data.id_brnd)
        .update(data.db, data.method)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
function patchRecipeSch(changes) {
  changes.shift()
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('sch_params')
        .where('brw_id', data.id_brnd)
        .update(data.db, data.method)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
function patchRecipeFin(changes) {
  changes.shift()
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      // console.log(data.id_brnd, data.db, data.method)
      const query = db('fin_params')
        .where('fin_id', data.id_brnd)
        .update(data.db, data.method)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}


//Fin injection rates
function patchFinInjection(changes) {
  return db.transaction(trx => {
    let queries = []
    changes.forEach(data => {
      const query = db('fin_injection_bridge')
        .where('fin_id', data.fin_id)
        .andWhere('com_id', data.com_id)
        .update('rate', data.rate)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}


//methods
function getAllMethod() {
  return db('methods_cold')
  .orderBy('method')
}



module.exports = {
  addBrw, 
  getAllBrw, 
  getByNameBrw, 
  changeBrw, 
  destroyBrw,
  addFin, 
  getAllFin,
  getAllFinIngredient,
  getByNameFin, 
  changeFin, 
  destroyFin,
  addPck, 
  getAllPck, 
  getByNamePck, 
  changePck, 
  destroyPck,
  getDetailByNameCsxPre,
  getDetailByNameCsxPost,
  getDetailByNameFilPre,
  getDetailByNameFilPost,
  getDetailByNameRelPre,
  getDetailByNameRelPost,
  getRecipeByNameChp,
  getRecipeByNameSch,
  getRecipeByNameFin,
  getAllBrwStd,
  getAllBrwDry,
  getAllBrwSac,
  getAllBrwCrft,
  getAllMethod,
  patchDetail,
  patchRecipeChp,
  patchRecipeSch,
  patchRecipeFin,
  patchFinInjection
}
