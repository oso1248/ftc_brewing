const db = require('../dbConfig')


//Brand brw
async function addBrw(data) {
  const [{brand}]= await db('brnd_brw').insert(data, ['brand'])
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
function getDetailByNameFinPre(name) {
  return db('brnd_fin AS fin')
    .join('fltr_pre AS pre','pre.fin_id', '=', 'fin.id')
    .select(
      'fin.brand AS Brand',
      'pre.tk_sch AS Schoene Tank',
      'pre.lines AS System',
      'pre.tk_trp AS Trap',
      'pre.tk_fbt AS Filter Beer Tank',
      'pre.tk_fill AS Fill Tank',
      'pre.inj AS Injection',
      'pre.ctrl AS Control',
      'pre.note AS Note'
      )
    .where({'fin.brand': name})
    .first() 
}
function getDetailByNameFinPost(name) {
  return db('brnd_fin AS fin')
    .join('fltr_post AS post','post.fin_id', '=', 'fin.id')
    .select(
      'fin.brand AS Brand',
      'post.tk_sch AS Schoene Tank',
      'post.lines AS System',
      'post.tk_trp AS Trap',
      'post.tk_fbt AS Filter Beer Tank',
      'post.recover AS Recover',
      'post.note AS Note'
      )
    .where({'fin.brand': name})
    .first() 
}
function getDetailByNamePckPre(name) {
  return db('brnd_pck AS pck')
    .join('rel_pre AS pre','pre.pck_id', '=', 'pck.id')
    .select(
      'pck.brand AS Brand',
      'pre.tk_fbt AS Filter Beer Tank',
      'pre.lines AS Release Line',
      'pre.tk_lin AS Package Line',
      'pre.tk_dft AS Draft Line',
      'pre.recover AS Recover',
      'pre.ctrl AS Control',
      'pre.note AS Note'
      )
    .where({'pck.brand': name})
    .first() 
}
function getDetailByNamePckPost(name) {
  return db('brnd_pck AS pck')
    .join('rel_post AS post','post.pck_id', '=', 'pck.id')
    .select(
      'pck.brand AS Brand',
      'post.tk_fbt AS Filter Beer Tank',
      'post.lines AS Release Line',
      'post.tk_lin AS Package Line',
      'post.tk_dft AS Draft Line',
      'post.recover AS Recover',
      'post.note AS Note'
      )
    .where({'pck.brand': name})
    .first() 
}


//Recipe
function getRecipeByNameChp(name) {
  return db('brnd_brw AS brw')
    .join('chp_params AS chp','chp.brw_id', '=', 'brw.id')
    .select(
      'brw.brand AS Brand',
      'chp.param_d AS Diacetyl',
      'chp.param_p AS Pentanedione',
      'chp.param_aa AS Acid Aldehyde',
      'chp.param_abw AS ABW',
      'chp.param_rdf AS RDF',
      'chp.note AS Note'
      )
    .where({'brw.brand': name})
    .first() 
}
function getRecipeByNameSch(name) {
  return db('brnd_brw AS brw')
    .join('sch_params AS sch','sch.brw_id', '=', 'brw.id')
    .select(
      'brw.brand AS Brand',
      'sch.cc AS Cell Count',
      'sch.acp AS ACP Rate',
      'sch.note AS Note'
      )
    .where({'brw.brand': name})
    .first() 
}
function getRecipeByNameFin(name) {
  return db('brnd_fin AS fin')
    .join('fin_params AS prm','prm.fin_id', '=', 'fin.id')
    .select(
      'fin.brand AS Brand',

      'prm.og_ftrctrl AS OG Fltr Control',
      'prm.alc_ftrctrl AS ALC Fltr Control',
      'prm.cal_ftrctrl AS CAL Fltr Control',
      'prm.crb_ftrctrl AS Carb Fltr Control',
      'prm.rdf_ftrctrl AS RDF Fltr Control',
      'prm.co2_ftrctrl AS Co2 Fltr Control',
      'prm.cc_ftrctrl AS CC Fltr Control',

      'prm.og_relctrl AS OG Rel Control',
      'prm.alc_relctrl AS ALC Rel Control',
      'prm.cal_relctrl AS CAL Rel Control',
      'prm.crb_relctrl AS Carb Rel Control',
      'prm.rdf_relctrl AS RDF Rel Control',
      'prm.co2_relctrl AS Co2 Rel Control',
      'prm.cc_relctrl AS CC Rel Control',
      
      'prm.og_sp AS OG Set Point',
      'prm.og_losl AS OG LOSL',
      'prm.og_losh AS OG LOSH',

      'prm.alc_sp AS ALC Set Point',
      'prm.alc_losl AS ALC LOSL',
      'prm.alc_losh AS ALC LOSH',

      'prm.cal_sp AS CAL Set Point',
      'prm.cal_losl AS CAL LOSL',
      'prm.cal_losh AS CAL LOSH',

      'prm.crb_sp AS Carb Set Point',
      'prm.crb_losl AS Carb LOSL',
      'prm.crb_losh AS Carb LOSH',

      'prm.rdf_sp AS RDF Set Point',
      'prm.rdf_losl AS RDF LOSL',
      'prm.rdf_losh AS RDF LOSH',

      'prm.co2_sp AS Co2 Set Point',
      'prm.co2_losl AS Co2 LOSL',
      'prm.co2_losh AS Co2 LOSH',

      'prm.cc_sp AS CC Set Point',
      'prm.cc_losl AS CC LOSL',
      'prm.cc_losh AS CC LOSH',
      
      'prm.note AS Note'
      )
    .where({'fin.brand': name})
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
  getDetailByNameBrwPost,
  getDetailByNameFinPre,
  getDetailByNameFinPost,
  getDetailByNamePckPre,
  getDetailByNamePckPost,
  getRecipeByNameChp,
  getRecipeByNameSch,
  getRecipeByNameFin,
  getAllBrwStd,
  getAllBrwDry,
  getAllBrwSac,
  getAllBrwCrft
}
