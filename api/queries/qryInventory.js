const db = require('../dbConfig')


function getByDateCombinedBrwWeekly(data) {
  return db.raw(`
  SELECT z.commodity, z.sap, SUM(z.total) AS total, z.uom, null AS complete
  FROM
    (SELECT com.commodity, com.sap, inv.lbs AS total, uom.uom
    FROM inv_hop_weekly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startHop}' AND inv.created_at < '${data.endHop}' AND com.inventory = 'Brw'
    UNION ALL
    SELECT com.commodity, com.sap, inv.total_end AS total, uom.uom
    FROM inv_mat_weekly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startMat}' AND inv.created_at < '${data.endMat}' AND com.inventory = 'Brw') AS z
  GROUP BY z.commodity, z.sap, z.uom
  ORDER BY z.sap DESC
  `)
}
function getByDateCombinedFinWeekly(data) {
  return db.raw(`
  SELECT z.commodity, z.sap, SUM(z.total) AS total, z.uom, null AS complete
  FROM
    (SELECT com.commodity, com.sap, inv.lbs AS total, uom.uom
    FROM inv_hop_weekly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startHop}' AND inv.created_at < '${data.endHop}' AND com.inventory = 'Fin'
    UNION ALL
    SELECT com.commodity, com.sap, inv.total_end AS total, uom.uom
    FROM inv_mat_weekly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startMat}' AND inv.created_at < '${data.endMat}' AND com.inventory = 'Fin') AS z
  GROUP BY z.commodity, z.sap, z.uom
  ORDER BY z.sap DESC
  `)
}
function getByDateCombinedLogWeekly(data) {
  return db.raw(`
  SELECT z.commodity, z.sap, SUM(z.total) AS total, z.uom, null AS complete
  FROM
    (SELECT com.commodity, com.sap, inv.lbs AS total, uom.uom
    FROM inv_hop_weekly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startHop}' AND inv.created_at < '${data.endHop}' AND com.inventory = 'Log'
    UNION ALL
    SELECT com.commodity, com.sap, inv.total_end AS total, uom.uom
    FROM inv_mat_weekly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startMat}' AND inv.created_at < '${data.endMat}' AND com.inventory = 'Log') AS z
  GROUP BY z.commodity, z.sap, z.uom
  ORDER BY z.sap DESC
  `)
}

function getByDateCombinedBrwMonthly(data) {
  return db.raw(`
  SELECT z.commodity, z.sap, SUM(z.total) AS total, z.uom, null AS complete
  FROM
    (SELECT com.commodity, com.sap, inv.lbs AS total, uom.uom
    FROM inv_hop_monthly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startHop}' AND inv.created_at < '${data.endHop}' AND com.inventory = 'Brw'
    UNION ALL
    SELECT com.commodity, com.sap, inv.total_end AS total, uom.uom
    FROM inv_mat_monthly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startMat}' AND inv.created_at < '${data.endMat}' AND com.inventory = 'Brw') AS z
  GROUP BY z.commodity, z.sap, z.uom
  ORDER BY z.sap DESC
  `)
}
function getByDateCombinedFinMonthly(data) {
  return db.raw(`
  SELECT z.commodity, z.sap, SUM(z.total) AS total, z.uom, null AS complete
  FROM
    (SELECT com.commodity, com.sap, inv.lbs AS total, uom.uom
    FROM inv_hop_monthly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startHop}' AND inv.created_at < '${data.endHop}' AND com.inventory = 'Fin'
    UNION ALL
    SELECT com.commodity, com.sap, inv.total_end AS total, uom.uom
    FROM inv_mat_monthly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startMat}' AND inv.created_at < '${data.endMat}' AND com.inventory = 'Fin') AS z
  GROUP BY z.commodity, z.sap, z.uom
  ORDER BY z.sap DESC
  `)
}
function getByDateCombinedLogMonthly(data) {
  return db.raw(`
  SELECT z.commodity, z.sap, SUM(z.total) AS total, z.uom, null AS complete
  FROM
    (SELECT com.commodity, com.sap, inv.lbs AS total, uom.uom
    FROM inv_hop_monthly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startHop}' AND inv.created_at < '${data.endHop}' AND com.inventory = 'Log'
    UNION ALL
    SELECT com.commodity, com.sap, inv.total_end AS total, uom.uom
    FROM inv_mat_monthly AS inv
    JOIN mtl_commodity AS com ON inv.com_id = com.id
    JOIN mtl_uom AS uom on com.uom_id = uom.id
    WHERE inv.created_at > '${data.startMat}' AND inv.created_at < '${data.endMat}' AND com.inventory = 'Log') AS z
  GROUP BY z.commodity, z.sap, z.uom
  ORDER BY z.sap DESC
  `)
}



//Material weekly
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
async function finId(data){
  let rtn = await db('brnd_fin').select('id').where('brand', data.fin_id)
  let {id} = rtn[0]
  data.fin_id = id
  return data
}

async function add(data) {
  await com(data)
  const [{id}] = await db('inv_mat_weekly').insert(data, ['id'])
  return getByID(id)
}
function getInvDateMaterial() {
  return db.raw(`
  SELECT DISTINCT DATE_TRUNC('day',created_at) 
  FROM inv_mat_weekly
  WHERE EXTRACT(DOW FROM created_at) = 1
    AND created_at > NOW() - INTERVAL '365 days'
  ORDER BY DATE_TRUNC('day',created_at) DESC
  `)
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
      'inv.id',
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
async function destroy(id) {
  let remove = await db('inv_mat_weekly').where('id', id).del()
  return getByID(id)
}


//Material monthly
async function addMonthly(data) {
  await com(data)
  const [{id}] = await db('inv_mat_monthly').insert(data, ['id'])
  return getByID(id)
}
function getByIDMonthly(id) {
  return db('inv_mat_monthly as inv')
    .join('mtl_commodity as com', 'inv.com_id', '=', 'com.id' )
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .select(
      'com.commodity',
      'inv.total_end',
      'uom.uom'
    )
    .where({'inv.id': id})
}
async function destroyMonthly(id) {
  let remove = await db('inv_mat_monthly').where('id', id).del()
  return getByID(id)
}
function getByDateMonthly(data) {
  
  return db('inv_mat_monthly as inv')
    .join('mtl_commodity as com', 'inv.com_id', '=', 'com.id' )
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .select(
      'inv.id',
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
function getInvDateMaterialMonthly() {
  return db.raw(`
  SELECT DISTINCT DATE_TRUNC('month',created_at) 
  FROM inv_mat_monthly
  ORDER BY DATE_TRUNC('month',created_at) DESC
  `)
}


// hop inv weekly
async function addInvHopWeekly(data) {
  await com(data)
  const [{id}] = await db('inv_hop_weekly').insert(data, ['id'])
  return getByIDHopWeekly(id)
}
function getByIDHopWeekly(id) {
  return db('inv_hop_weekly as inv')
    .join('mtl_commodity as com', 'inv.com_id', '=', 'com.id')
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .select(
      'com.commodity',
      'inv.lbs',
      'uom.uom'
    )
    .where({'inv.id': id})
}
function getHopWeeklyInvCombined(data) {
  return db('inv_hop_weekly as inv')
    .rightOuterJoin('mtl_commodity as com', function(){
      this.on(function(){
        this.on('inv.com_id', '=', 'com.id')
        this.andOnVal('inv.created_at', '>', data.start)
        this.andOnVal('inv.created_at', '<', data.end)
      })
    })
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .select(
      'com.commodity',
      db.raw('SUM(inv.lbs) as lbs'),
    )
    .groupBy('com.commodity')
    .where('typ.type', 'hop')
    // .andWhere('com.active', 'Yes')
    .orderBy('com.commodity')

}
function getHopWeeklyInvHard(data) {
  return db('inv_hop_weekly as inv')
    .join('mtl_commodity as com', function(){
      this.on(function(){
        this.on('inv.com_id', '=', 'com.id')
        this.andOnVal('inv.created_at', '>', data.startDate)
        this.andOnVal('inv.created_at', '<', data.endDate)
      })
    })
    .select(
      'inv.id',
      'com.commodity',
      'com.sap',
      'inv.lot',
      'inv.lbs',
      'inv.username',
      'inv.created_at'
    )
    .orderBy('com.commodity')

}
async function getInvHopWeeklyDate() {
  let {rows} = await db.raw(`
  SELECT DISTINCT DATE_TRUNC('day',created_at) 
  FROM inv_hop_weekly
  WHERE EXTRACT(DOW FROM created_at) = 0
    AND created_at > NOW() - INTERVAL '365 days'
  ORDER BY DATE_TRUNC('day',created_at) DESC
  `)
  return rows
}
async function destroyHopInvWeekly(id) {
  let remove = await db('inv_hop_weekly').where('id', id).del()
  return getByIDHopWeekly(id)
}


// hop inv monthly
async function addInvHopMonthly(data) {
  await com(data)
  const [{id}] = await db('inv_hop_monthly').insert(data, ['id'])
  return getByIDHopMonthly(id)
}
function getByIDHopMonthly(id) {
  return db('inv_hop_monthly as inv')
    .join('mtl_commodity as com', 'inv.com_id', '=', 'com.id')
    .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
    .select(
      'com.commodity',
      'inv.lbs',
      'uom.uom'
    )
    .where({'inv.id': id})
}
function getHopMonthlyInvHard(data) {
  return db('inv_hop_monthly as inv')
    .join('mtl_commodity as com', function(){
      this.on(function(){
        this.on('inv.com_id', '=', 'com.id')
        this.andOnVal('inv.created_at', '>', data.startDate)
        this.andOnVal('inv.created_at', '<', data.endDate)
      })
    })
    .select(
      'inv.id',
      'com.commodity',
      'com.sap',
      'inv.lot',
      'inv.lbs',
      'inv.username',
      'inv.created_at'
    )
    .orderBy('com.commodity')
}
async function getInvHopMonthlyDate() {
  let {rows} = await db.raw(`
  SELECT DISTINCT DATE_TRUNC('month',created_at) 
  FROM inv_hop_monthly
  ORDER BY DATE_TRUNC('month',created_at) DESC
  `)
  return rows
}
async function destroyHopInvMonthly(id) {
  let remove = await db('inv_hop_monthly').where('id', id).del()
  return getByIDHopWeekly(id)
}


//hop daily
async function getInvHopDailyDate() {
  let {rows} = await db.raw(`
  SELECT DISTINCT DATE_TRUNC('day',created_at) 
  FROM inv_hop_daily 
  WHERE DATE_TRUNC('day',created_at) > NOW() - INTERVAL '365 days'
  ORDER BY DATE_TRUNC('day',created_at) DESC
  `)
  
  return rows
}
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




//hop view
async function getSets(data) {
  return await db('inv_hop_daily as inv')
    .join('brnd_brw as brw', 'inv.brw_id', '=', 'brw.id')
    .select(
      'brw.brand',
      'inv.sets',
      'inv.username'
    )
    .where('inv.created_at', '>', data.startSets)
    .andWhere('inv.created_at', '<', data.end)
}
function getSetsCombined(data) {
  return db('inv_hop_daily as inv')
    .join('brnd_brw as brw', function(){
      this.on(function(){
        this.on('inv.brw_id', '=', 'brw.id')
        this.andOnVal('inv.created_at', '>', data.startSets)
        this.andOnVal('inv.created_at', '<', data.end)
      })
    })
    .select(
      'brw.brand',
      db.raw('SUM(inv.sets) as sets'),
    )
    .groupBy('brw.brand')
    .orderBy('brw.brand')
}
async function getHopMtx(brand) {
  return await db('mtx_hop_std as mtx')
    .join('mtl_commodity as com', 'mtx.com_id', '=', 'com.id')
    .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
    .select(
      'com.commodity',
      `${brand} as brand`,
    )
    .where('typ.type', 'hop')
    .andWhere('com.active', 'Yes')
    .orderBy('com.commodity')
}
async function getHopList() {
  return db.raw(`
      SELECT com.commodity, com.threshold - com.threshold AS total
      FROM mtx_hop_std AS mtx
      JOIN mtl_commodity AS com ON mtx.com_id = com.id
      JOIN mtl_type AS typ ON com.type_id = typ.id
      WHERE typ.type = 'hop'
      ORDER BY com.commodity
  `)
}
async function getHopDaily(data) {
  let sets = await getSets(data)
  let {rows: mtx} = await getHopList()
  
  for (let i = 0; i < sets.length; i++) {
    let hops = await getHopMtx(sets[i].brand)
    for (let x = 0; x < hops.length; x++) {
      mtx[x].total = parseFloat(mtx[x].total) + (sets[i].sets * hops[x].brand)
      mtx[x].username = sets[0].username
    }
  }

   lastBrews = await getLastBrews(data)
  if(lastBrews.length > 0) {
    mtx.push(lastBrews)
  } else {
    mtx.push([{bh1: 'null', bh2:'null'}])
  }

  return mtx
}
async function getHopRollingInv(data) {
  let sets = await getSetsCombined(data)
  let invWeek = await getHopWeeklyInvCombined(data)
  
  for (let i = 0; i < sets.length; i++) {
    let hops = await getHopMtx(sets[i].brand)
    for (let x = 0; x < hops.length; x++) {
      if(invWeek[x].lbs === null) {
        invWeek[x].lbs = 0
      }
      invWeek[x].lbs = parseFloat(invWeek[x].lbs) - (sets[i].sets * hops[x].brand)
    }
  }
  return invWeek
}
function getLastBrews(data) {
  return db('inv_last_brews')
    .select(
      'bh1',
      'bh2',
    )
    .where('created_at','>=',data.startSets)
    .andWhere('created_at','<=',data.end)
    .limit(1)
    .orderBy('created_at', 'desc')

}
function getHopLots(data) {
  return db('inv_hop_weekly as hop')
    .join('mtl_commodity as com', 'com.id', '=','hop.com_id')
    .select('hop.lot')
    .where('com.commodity', data.commodity)
    .limit(5)
    .orderBy('hop.created_at', 'desc')
}

// fin injection log
async function addFinInjectionLog(data) {
  for (let i = 0; i < data.length; i++) {
    await com(data[i])
    await finId(data[i])
  }
  return db.transaction(trx => {
    let queries = []
    data.forEach(elem => {
      const query = db('fin_injection_log')
        .insert(elem)
        .transacting(trx)
      queries.push(query)
    })
    Promise.all(queries) 
      .then(trx.commit)
      .catch(trx.rollback)
  })
}
async function finInjectionLogDatesWeekly() {
  let {rows} = await db.raw(`
  SELECT DISTINCT DATE_TRUNC('week',created_at) 
  FROM fin_injection_log
  ORDER BY DATE_TRUNC('week',created_at) DESC
  `)
  return rows
}
async function finInjectionLogDatesMonthly() {
  let {rows} = await db.raw(`
  SELECT DISTINCT DATE_TRUNC('month',created_at) 
  FROM fin_injection_log
  ORDER BY DATE_TRUNC('month',created_at) DESC
  `)
  return rows
}
function finInjectionLogGet(data) {
  return db('fin_injection_log as inv')
    .join('brnd_fin as fin', 'inv.fin_id', '=', 'fin.id' )
    .join('mtl_commodity as com', 'inv.com_id', '=', 'com.id' )
    .select(
      'inv.fbt',
      'fin.brand',
      'inv.vol_fbt',
      'com.commodity',
      'inv.vol_ing',
      'inv.lot',
      'inv.username',
      'inv.created_at',
    )
    .where('inv.created_at', '>', data.start)
    .andWhere('inv.created_at', '<', data.end)
    .orderBy([{ column: 'inv.created_at' }, { column: 'inv.fbt', order: 'desc' }, { column: 'com.commodity', order: 'asc' }])
}


// material archive
async function addMatArchiveLog(data) {

  await com(data)  
  await setComActiveNo(data.com_id)

  const [{id}] = await db('mat_archive').insert(data, ['id'])
  
  return getByIdArchive(id)
}
function getByIdArchive(id) {
  return db('mat_archive as inv')
    .join('mtl_commodity as com', 'inv.com_id', '=', 'com.id' )
    .select(
      'com.commodity',
      'inv.count_final',
      'inv.total_end',
      'inv.note',
      'inv.username',
      
    )
    .where({'inv.id': id})
}
function setComActiveNo(id) {
  db('mtl_commodity')
    .update({active: 'No'})
    .where({id})
  .then()
}
function getMatArchiveLog() {
  return db('mat_archive as arc')
    .join('mtl_commodity as com', 'com.id', '=', 'arc.com_id')
    .select(
      'arc.id',
      'com.commodity',
      'arc.count_final',
      'arc.total_end',
      'arc.username',
      'arc.created_at',
      'arc.note'
    )
    .orderBy('com.commodity')
}
async function destroyArchive(id) {
  let remove = await db('mat_archive').where('id', id).del()
  return getByIdArchive(id)
}



// finishing process loss wad add transfer
async function addProcessWad(data) {
  const [{id}] = await db('fin_wad_add').insert(data, ['id'])

  return getProcessWadById(id)
}
function getProcessWadById(id) {
  return db('fin_wad_add')
    .select(
      'id',
      'brand',
      'tank',
      'vol_start',
      'vol_stop',
      'username',
      'note',
      'created_at',
    )
    .where({id})
}
function getProcessWad() {
  return db('fin_wad_add')
    .select(
      'id',
      'brand',
      'tank',
      'vol_start',
      'vol_stop',
      'username',
      'note',
      'created_at',
    )
}

async function addProcessTrans(data) {
  const [{id}] = await db('fin_trans_add').insert(data, ['id'])

  return getProcessTransById(id)
}
function getProcessTransById(id) {
  return db('fin_trans_add')
    .select(
      'id',
      'brand_from',
      'brand_to',
      'tank_from',
      'tank_to',
      'volume',
      'username',
      'note',
      'created_at',
    )
    .where({id})
}
function getProcessTrans() {
  return db('fin_trans_add')
    .select(
      'id',
      'brand_from',
      'brand_to',
      'tank_from',
      'tank_to',
      'volume',
      'username',
      'note',
      'created_at',
    )
}

async function addProcessLoss(data) {
  const [{id}] = await db('fin_loss_add').insert(data, ['id'])

  return getProcessLossById(id)
}
function getProcessLossById(id) {
  return db('fin_loss_add')
    .select(
      'id',
      'brand',
      'tank',
      'volume',
      'username',
      'note',
      'created_at',
    )
    .where({id})
}
function getProcessLoss() {
  return db('fin_loss_add')
    .select(
      'id',
      'brand',
      'tank',
      'volume',
      'username',
      'note',
      'created_at',
    )
}



module.exports = {
  getByDateCombinedBrwWeekly,
  getByDateCombinedFinWeekly,
  getByDateCombinedLogWeekly,
  getByDateCombinedBrwMonthly,
  getByDateCombinedFinMonthly,
  getByDateCombinedLogMonthly,
  add, 
  getInvDateMaterial, 
  getByID, 
  getByDate, 
  addInvHopWeekly,
  addInvHopDaily,
  getHopDaily,
  getInvHopDailyDate, 
  getInvHopWeeklyDate,
  getHopRollingInv,
  getLastBrews,
  getHopLots,
  getHopWeeklyInvCombined,
  getHopWeeklyInvHard,
  getSetsCombined,
  destroy,
  destroyHopInvWeekly,
  destroyHopInvMonthly,
  addMonthly,
  getByIDMonthly,
  destroyMonthly,
  getByDateMonthly,
  getInvDateMaterialMonthly,
  addFinInjectionLog,
  finInjectionLogDatesWeekly,
  finInjectionLogDatesMonthly,
  finInjectionLogGet,
  addMatArchiveLog,
  getMatArchiveLog,
  destroyArchive,
  addProcessWad,
  addProcessTrans,
  addProcessLoss,
  getProcessWad,
  getProcessTrans,
  getProcessLoss,
  getHopMonthlyInvHard,
  addInvHopMonthly,
  getInvHopMonthlyDate
}