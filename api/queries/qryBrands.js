const db = require('../dbConfig');

function allReplace(obj) {
  return obj.replace(/\[/g, '(').replace(/\]/g, ')').replace(/"/g, `'`);
}

// SELECT brnd.brand, post.fin_id,
// 	UNNEST(ARRAY[post.tk_sch, post.lines, post.tk_trp, post.tk_fbt, post.recover]) AS params
// FROM fltr_post AS post
// JOIN brnd_fin AS brnd ON brnd.id = post.fin_id
// WHERE post.fin_id = 1

//Brand brw
async function addBrw(data) {
  const [{ brand, id }] = await db('brnd_brw').insert(data, ['brand', 'id']);
  let res = await db('csx_pre').insert({ brw_id: id });
  res = await db('csx_post').insert({ brw_id: id });
  res = await db('chp_params').insert({ brw_id: id });
  res = await db('chp_smpl').insert({ brw_id: id });
  res = await db('sch_params').insert({ brw_id: id });
  res = await db('sch_smpl').insert({ brw_id: id });
  res = await db('acx_pre').insert({ brw_id: id });
  res = await db('acx_post').insert({ brw_id: id });

  await db.schema.table('mtx_hop_dry', function (table) {
    table.decimal(brand, 50, 2).notNullable().defaultTo(0);
  });
  await db.schema.table('mtx_hop_std', function (table) {
    table.decimal(brand, 50, 2).notNullable().defaultTo(0);
  });
  await db.schema.table('mtx_sac_supr', function (table) {
    table.decimal(brand, 50, 2).notNullable().defaultTo(0);
  });
  await db.schema.table('mtx_material', function (table) {
    table.decimal(brand, 50, 2).notNullable().defaultTo(0);
  });
  return getByNameBrw(brand);
}
function getAllBrw(active) {
  if (active) {
    return db('brnd_brw AS brw').where('active', '=', 'Yes').orderBy('brand');
  } else {
    return db('brnd_brw AS brw').orderBy([{ column: 'active', order: 'desc' }, { column: 'brand' }]);
  }
}
function getByNameBrw(name) {
  return db('brnd_brw').where({ brand: name }).first();
}
async function changeBrw(name, changes) {
  let response = await db('brnd_brw').where({ brand: name }).update(changes);
  return getByNameBrw(name);
}
async function destroyBrw(name) {
  let remove = await db('brnd_brw').where('brand', name).del();
  return getByNameBrw(name);
}

function getAllBrwStd(active) {
  if (active) {
    return db('brnd_brw AS brw').where('active', '=', 'Yes').andWhere('hop_std', '=', 'Yes').orderBy('brand');
  } else {
    return db('brnd_brw AS brw')
      .where('hop_std', '=', 'Yes')
      .orderBy([{ column: 'active', order: 'desc' }, { column: 'brand' }]);
  }
}
function getAllBrwCrft(active) {
  if (active) {
    return db('brnd_brw AS brw').where('active', '=', 'Yes').andWhere('hop_crft', '=', 'Yes').orderBy('brand');
  } else {
    return db('brnd_crft AS brw')
      .where('hop_std', '=', 'Yes')
      .orderBy([{ column: 'active', order: 'desc' }, { column: 'brand' }]);
  }
}
function getAllBrwDry(active) {
  if (active) {
    return db('brnd_brw AS brw').where('active', '=', 'Yes').andWhere('hop_dry', '=', 'Yes').orderBy('brand');
  } else {
    return db('brnd_brw AS brw')
      .where('hop_dry', '=', 'Yes')
      .orderBy([{ column: 'active', order: 'desc' }, { column: 'brand' }]);
  }
}
function getAllBrwSac(active) {
  if (active) {
    return db('brnd_brw AS brw').where('active', '=', 'Yes').andWhere('supr_sac', '=', 'Yes').orderBy('brand');
  } else {
    return db('brnd_brw AS brw')
      .where('supr_sac', '=', 'Yes')
      .orderBy([{ column: 'active', order: 'desc' }, { column: 'brand' }]);
  }
}

//Brand fin
async function brwId(data) {
  let rtn = await db('brnd_brw').select('id').where('brand', data['brw_id']);
  let { id } = rtn[0];
  data['brw_id'] = id;
  return data;
}
async function addFin(data) {
  await brwId(data);
  const [{ brand, id }] = await db('brnd_fin').insert(data, ['brand', 'id']);
  let res = await db('fin_smpl').insert({ fin_id: id });
  res = await db('fin_params').insert({ fin_id: id });
  res = await db('rel_pre').insert({ fin_id: id });
  res = await db('rel_post').insert({ fin_id: id });
  res = await db('fltr_pre').insert({ fin_id: id });
  res = await db('fltr_post').insert({ fin_id: id });

  return getByNameFin(brand);
}
function getAllFin(active) {
  if (active) {
    return db('brnd_fin AS fin')
      .join('brnd_brw AS brw', 'fin.brw_id', '=', 'brw.id')
      .leftOuterJoin('brnd_pck as pck', 'pck.fin_id', '=', 'fin.id')
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
      .orderBy('fin.brand');
  } else {
    return db('brnd_fin AS fin')
      .join('brnd_brw AS brw', 'fin.brw_id', '=', 'brw.id')
      .leftOuterJoin('brnd_pck as pck', 'pck.fin_id', '=', 'fin.id')
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
      .orderBy([{ column: 'fin.active', order: 'desc' }, { column: 'fin.brand' }]);
  }
}
function getAllFinIngredient(active) {
  if (active) {
    return db('brnd_fin AS fin').select('fin.id', 'fin.brand AS brndFin').where('fin.active', '=', 'Yes').andWhere('fin.injection', '=', 'Yes').orderBy('fin.brand');
  } else {
    return db('brnd_fin AS fin').select('fin.id', 'fin.brand AS brndFin').where('fin.injection', '=', 'Yes').orderBy('fin.brand');
  }
}
function getBrandFinIngredient(brand) {
  return db('brnd_fin as fin')
    .join('fin_injection_bridge AS bridge', 'fin.id', '=', 'bridge.fin_id')
    .join('mtl_commodity AS com', 'com.id', '=', 'bridge.com_id')
    .select('bridge.fin_id', 'bridge.com_id', 'fin.brand', 'com.commodity', 'bridge.rate')
    .where('fin.brand', '=', brand);
}
function getByNameFin(name) {
  return db('brnd_fin AS fin')
    .join('brnd_brw AS brw', 'fin.brw_id', '=', 'brw.id')
    .leftOuterJoin('brnd_pck as pck', 'pck.fin_id', '=', 'fin.id')
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
    .where({ 'fin.brand': name })
    .first();
}
async function changeFin(name, changes) {
  await brwId(changes);
  let response = await db('brnd_fin').where({ brand: name }).update(changes);
  return getByNameFin(name);
}
async function destroyFin(name) {
  let remove = await db('brnd_fin').where('brand', name).del();
  return getByNameFin(name);
}

//Brand pck
async function finId(data) {
  let rtn = await db('brnd_fin').select('id').where('brand', data['fin_id']);
  let { id } = rtn[0];
  data['fin_id'] = id;
  return data;
}
async function addPck(data) {
  await finId(data);
  const [{ brand }] = await db('brnd_pck').insert(data, ['brand']);
  return getByNamePck(brand);
}
function getAllPck(active) {
  if (active) {
    return db('brnd_fin AS fin')
      .join('brnd_brw AS brw', 'fin.brw_id', '=', 'brw.id')
      .join('brnd_pck as pck', 'pck.fin_id', '=', 'fin.id')
      .select('pck.brand AS brndPck', 'pck.active as active', 'fin.brand AS brndFin', 'brw.brand AS brndBrw', 'pck.note')
      .where('pck.active', '=', 'Yes')
      .orderBy('pck.brand');
  } else {
    return db('brnd_fin AS fin')
      .join('brnd_brw AS brw', 'fin.brw_id', '=', 'brw.id')
      .join('brnd_pck as pck', 'pck.fin_id', '=', 'fin.id')
      .select('pck.brand AS brndPck', 'pck.active as active', 'fin.brand AS brndFin', 'brw.brand AS brndBrw', 'pck.note')
      .orderBy([{ column: 'pck.active', order: 'desc' }, { column: 'pck.brand' }]);
  }
}
function getByNamePck(name) {
  return db('brnd_fin AS fin')
    .join('brnd_brw AS brw', 'fin.brw_id', '=', 'brw.id')
    .join('brnd_pck as pck', 'pck.fin_id', '=', 'fin.id')
    .select('brw.brand AS brndBrw', 'fin.brand AS brndFin', 'pck.brand AS brndPck', 'pck.active AS active', 'pck.note')
    .where({ 'pck.brand': name })
    .first();
}
async function changePck(name, changes) {
  await finId(changes);
  let response = await db('brnd_pck').where({ brand: name }).update(changes);
  return getByNamePck(name);
}
async function destroyPck(name) {
  let remove = await db('brnd_pck').where('brand', name).del();
  return getByNamePck(name);
}

// Detail
async function getDetailByNameCsxPre(name) {
  let { rows } = await db.raw(`
    SELECT brnd.brand, pre.brw_id,
	    UNNEST(ARRAY['Chip Tank', 'Uni Tank', 'Lines', 'Cooler', 'Seperators', 'ACP', 'Schoene Tank', 'On Fill', 'Last Updated']) AS obj,
	    UNNEST(ARRAY[pre.tk_chp, pre.tk_uni, pre.lines, pre.cooler, pre.seps, pre.acp, pre.tk_sch, pre.tk_fill, CAST(pre.updated_at::DATE AS text)]) AS params,
	    UNNEST(ARRAY[pre.tk_chp_note, pre.tk_uni_note, pre.lines_note, pre.cooler_note, pre.seps_note, pre.acp_note, pre.tk_sch_note, pre.tk_fill_note, pre.updated_by]) AS notes
    FROM csx_pre AS pre
    JOIN brnd_brw AS brnd ON brnd.id = pre.brw_id
    WHERE brnd.brand = '${name}'
  `);
  return rows;
}
async function patchCsxPre(changes) {
  let sendData = [];
  for (let i = 0; i < changes.length - 1; i++) {
    sendData.push(changes[i].params);
    sendData.push(changes[i].notes);
  }
  sendData.push(changes.slice(-1)[0].updated_by);
  sendData = allReplace(JSON.stringify(sendData));
  let { rows } = await db.raw(`
    UPDATE csx_pre
    SET (tk_chp, tk_chp_note, tk_uni, tk_uni_note, lines, lines_note, cooler, cooler_note, seps,
      seps_note, acp, acp_note, tk_sch, tk_sch_note, tk_fill, tk_fill_note, updated_by) = ${sendData}
    WHERE brw_id = ${changes[0].brw_id}
    RETURNING updated_by;
  `);

  return rows;
}

async function getDetailByNameCsxPost(name) {
  let { rows } = await db.raw(`
    SELECT brnd.brand, post.brw_id,
	    UNNEST(ARRAY['Chip Tank', 'Uni Tank', 'Lines', 'Seperators', 'Schoene Tank', 'Last Updated']) AS obj,
	    UNNEST(ARRAY[post.tk_chp, post.tk_uni, post.lines, post.seps, post.tk_sch, CAST(post.updated_at::DATE AS text)]) AS params,
	    UNNEST(ARRAY[post.tk_chp_note, post.tk_uni_note, post.lines_note, post.seps_note, post.tk_sch_note, post.updated_by]) AS notes
    FROM csx_post AS post
    JOIN brnd_brw AS brnd ON brnd.id = post.brw_id
    WHERE brnd.brand = '${name}'
  `);
  return rows;
}
async function patchCsxPost(changes) {
  let sendData = [];
  for (let i = 0; i < changes.length - 1; i++) {
    sendData.push(changes[i].params);
    sendData.push(changes[i].notes);
  }
  sendData.push(changes.slice(-1)[0].updated_by);
  sendData = allReplace(JSON.stringify(sendData));
  let { rows } = await db.raw(`
    UPDATE csx_post
    SET (tk_chp, tk_chp_note, tk_uni, tk_uni_note, lines, lines_note, seps,
      seps_note, tk_sch, tk_sch_note, updated_by) = ${sendData}
    WHERE brw_id = ${changes[0].brw_id}
    RETURNING updated_by;
  `);

  return rows;
}

async function getDetailByNameFilPre(name) {
  let { rows } = await db.raw(`
    SELECT brnd.brand, pre.fin_id,
	    UNNEST(ARRAY['Schoene Tank', 'System', 'Trap', 'Filter Beer Tank', 'Fill Tank', ' Pre-Inj', 'Post-Inj Pump 1', 'Post-Inj Pump 2', 'Post-Inj Pump 3', 'Post-Inj Pump 4', 'Control', 'Last Updated']) AS obj,
	    UNNEST(ARRAY[pre.tk_sch, pre.lines, pre.tk_trp, pre.tk_fbt, pre.tk_fill, pre.inj_pre, pre.inj_post_one, pre.inj_post_two, pre.inj_post_three, pre.inj_post_four, pre.ctrl, CAST(pre.updated_at::DATE AS text)]) AS params,
	    UNNEST(ARRAY[pre.tk_sch_note, pre.lines_note, pre.tk_trp_note, pre.tk_fbt_note, pre.tk_fill_note, pre.inj_pre_note, pre.inj_post_one_note, pre.inj_post_two_note, pre.inj_post_three_note, pre.inj_post_four_note, pre.ctrl_note, pre.updated_by]) AS notes
    FROM fltr_pre AS pre
    JOIN brnd_fin AS brnd ON brnd.id = pre.fin_id
    WHERE brnd.brand = '${name}'
  `);
  return rows;
}
async function patchFltrPre(changes) {
  let sendData = [];
  for (let i = 0; i < changes.length - 1; i++) {
    sendData.push(changes[i].params);
    sendData.push(changes[i].notes);
  }
  sendData.push(changes.slice(-1)[0].updated_by);
  sendData = allReplace(JSON.stringify(sendData));
  let { rows } = await db.raw(`
    UPDATE fltr_pre
    SET (tk_sch, tk_sch_note, lines, lines_note, tk_trp, tk_trp_note, tk_fbt, tk_fbt_note, tk_fill,
      tk_fill_note, inj_pre, inj_pre_note, inj_post_one, inj_post_one_note, inj_post_two, inj_post_two_note,
      inj_post_three, inj_post_three_note, inj_post_four, inj_post_four_note, ctrl, ctrl_note, updated_by) = ${sendData}
    WHERE fin_id = ${changes[0].fin_id}
    RETURNING updated_by;
  `);
  return rows;
}

async function getDetailByNameFilPost(name) {
  let { rows } = await db.raw(`
    SELECT brnd.brand, post.fin_id,
	    UNNEST(ARRAY['Schoene Tank', 'System', 'Trap', 'Filter Beer Tank', 'Recover', 'Last Updated']) AS obj,
	    UNNEST(ARRAY[post.tk_sch, post.lines, post.tk_trp, post.tk_fbt, post.recover, CAST(post.updated_at::DATE AS text)]) AS params,
	    UNNEST(ARRAY[post.tk_sch_note, post.lines_note, post.tk_trp_note, post.tk_fbt_note, post.recover_note, post.updated_by]) AS notes
    FROM fltr_post AS post
    JOIN brnd_fin AS brnd ON brnd.id = post.fin_id
    WHERE brnd.brand = '${name}'
  `);
  return rows;
}
async function patchFltrPost(changes) {
  let sendData = [];
  for (let i = 0; i < changes.length - 1; i++) {
    sendData.push(changes[i].params);
    sendData.push(changes[i].notes);
  }
  sendData.push(changes.slice(-1)[0].updated_by);
  sendData = allReplace(JSON.stringify(sendData));

  let { rows } = await db.raw(`
    UPDATE fltr_post
    SET (tk_sch, tk_sch_note, lines, lines_note, tk_trp, tk_trp_note,
      tk_fbt, tk_fbt_note, recover, recover_note, updated_by) = ${sendData}
    WHERE fin_id = ${changes[0].fin_id}
    RETURNING updated_by;
  `);
  return rows;
}

async function getDetailByNameRelPre(name) {
  let { rows } = await db.raw(`
    SELECT brnd.brand, pre.fin_id,
	    UNNEST(ARRAY['Filter Beer Tank', 'Release Line', 'Package Line', 'Draft Line', 'Recover', 'Control', 'Last Updated']) AS obj,
	    UNNEST(ARRAY[pre.tk_fbt, pre.lines, pre.tk_lin, pre.tk_dft, pre.recover, pre.ctrl, CAST(pre.updated_at::DATE AS text)]) AS params,
	    UNNEST(ARRAY[pre.tk_fbt_note, pre.lines_note, pre.tk_lin_note, pre.tk_dft_note, pre.recover_note, pre.ctrl_note, pre.updated_by]) AS notes
    FROM rel_pre AS pre
    JOIN brnd_fin AS brnd ON brnd.id = pre.fin_id
    WHERE brnd.brand = '${name}'
  `);
  return rows;
}
async function patchRelPre(changes) {
  let sendData = [];
  for (let i = 0; i < changes.length - 1; i++) {
    sendData.push(changes[i].params);
    sendData.push(changes[i].notes);
  }
  sendData.push(changes.slice(-1)[0].updated_by);
  sendData = allReplace(JSON.stringify(sendData));

  let { rows } = await db.raw(`
    UPDATE rel_pre
    SET (tk_fbt, tk_fbt_note, lines, lines_note, tk_lin, tk_lin_note, tk_dft, tk_dft_note,
      recover, recover_note, ctrl, ctrl_note, updated_by) = ${sendData}
    WHERE fin_id = ${changes[0].fin_id}
    RETURNING updated_by;
  `);
  return rows;
}

async function getDetailByNameRelPost(name) {
  let { rows } = await db.raw(`
    SELECT brnd.brand, post.fin_id,
	    UNNEST(ARRAY['Filter Beer Tank', 'System Lines', 'Package Line', 'Draft Line', 'Recover', 'Last Updated']) AS obj,
	    UNNEST(ARRAY[post.tk_fbt, post.lines, post.tk_lin, post.tk_dft, post.recover, CAST(post.updated_at::DATE AS text)]) AS params,
	    UNNEST(ARRAY[post.tk_fbt_note, post.lines_note, post.tk_lin_note, post.tk_dft_note, post.recover_note, post.updated_by]) AS notes
    FROM rel_post AS post
    JOIN brnd_fin AS brnd ON brnd.id = post.fin_id
    WHERE brnd.brand = '${name}'
  `);
  return rows;
}
async function patchRelPost(changes) {
  let sendData = [];
  for (let i = 0; i < changes.length - 1; i++) {
    sendData.push(changes[i].params);
    sendData.push(changes[i].notes);
  }
  sendData.push(changes.slice(-1)[0].updated_by);
  sendData = allReplace(JSON.stringify(sendData));

  let { rows } = await db.raw(`
    UPDATE rel_post
    SET (tk_fbt, tk_fbt_note, lines, lines_note, tk_lin, tk_lin_note,
      tk_dft, tk_dft_note, recover, recover_note, updated_by) = ${sendData}
    WHERE fin_id = ${changes[0].fin_id}
    RETURNING updated_by;
  `);
  return rows;
}

//Recipe
async function getRecipeByNameChp(name) {
  let { rows } = await db.raw(`
    SELECT brnd.brand, par.brw_id,
	    UNNEST(ARRAY['Diacetyl', 'Pentanedione', 'Acid Aldehyde', 'ABW', 'RDF', 'Last Updated']) AS obj,
	    UNNEST(ARRAY[par.param_d, par.param_p, par.param_aa, par.param_abw, par.param_rdf, CAST(par.updated_at::DATE AS text)]) AS params,
		UNNEST(ARRAY[par.param_d_note, par.param_p_note, par.param_aa_note, par.param_abw_note, par.param_rdf_note, par.updated_by]) AS notes
    FROM chp_params AS par
    JOIN brnd_brw AS brnd ON brnd.id = par.brw_id
    WHERE brnd.brand = '${name}'
  `);
  return rows;
}
async function patchRecipeChp(changes) {
  let sendData = [];
  for (let i = 0; i < changes.length - 2; i++) {
    sendData.push(changes[i].params);
    sendData.push(changes[i].notes);
  }

  sendData.push(changes.slice(-1)[0].updated_by);
  sendData = allReplace(JSON.stringify(sendData));

  let { rows } = await db.raw(`
    UPDATE chp_params
    SET (param_d, param_d_note, param_p, param_p_note, param_aa, param_aa_note, param_abw,
      param_abw_note, param_rdf, param_rdf_note, updated_by) = ${sendData}
    WHERE brw_id = ${changes[0].brw_id}
    RETURNING updated_by;
  `);

  return rows;
}

async function getRecipeByNameSch(name) {
  let { rows } = await db.raw(`
    SELECT brnd.brand, par.brw_id,
	    UNNEST(ARRAY['Cell Count', 'ACP Rate', 'Last Updated']) AS obj,
	    UNNEST(ARRAY[par.cc, par.acp, CAST(par.updated_at::DATE AS text)]) AS params,
		UNNEST(ARRAY[par.cc_note, par.acp_note, par.updated_by]) AS notes
    FROM sch_params AS par
    JOIN brnd_brw AS brnd ON brnd.id = par.brw_id
    WHERE brnd.brand = '${name}'
  `);
  return rows;
}
async function patchRecipeSch(changes) {
  let sendData = [];
  for (let i = 0; i < changes.length - 2; i++) {
    sendData.push(changes[i].params);
    sendData.push(changes[i].notes);
  }

  sendData.push(changes.slice(-1)[0].updated_by);
  sendData = allReplace(JSON.stringify(sendData));

  let { rows } = await db.raw(`
    UPDATE sch_params
    SET (cc, cc_note, acp, acp_note, updated_by) = ${sendData}
    WHERE brw_id = ${changes[0].brw_id}
    RETURNING updated_by;
  `);

  return rows;
}

async function getRecipeByNameFin(name) {
  let { rows } = await db.raw(`
    SELECT brnd.brand, par.fin_id,
	    UNNEST(ARRAY['Ctrl Filter OG','Ctrl Filter Alc','Ctrl Filter Cal','Ctrl Filter Carb','Ctrl Filter RDF','Ctrl Filter Co2','Ctrl Filter CC','Ctrl Release OG','Ctrl Release Alc','Ctrl Release Cal','Ctrl Release Carb','Ctrl Release RDF','Ctrl Release Co2','Ctrl Release CC','Set Point OG','LOSL OG','LOSH OG','Set Point Alc','LOSL Alc','LOSH ALc','Set Point Cal','LOSL Cal','LOSH Cal','Set Point Carb','LOSL Carb','LOSH Carb','Set Point RDF','LOSL RDF','LOSH RDF','Set Point Co2','LOSL Co2','LOSH Co2','Set Point CC','LOSL CC','LOSH CC', 'Last Updated']) AS obj,
	    UNNEST(ARRAY[par.og_ftrctrl, par.alc_ftrctrl, par.cal_ftrctrl, par.crb_ftrctrl, par.rdf_ftrctrl, par.co2_ftrctrl, par.cc_ftrctrl, par.og_relctrl, par.alc_relctrl, par.cal_relctrl, par.crb_relctrl, par.rdf_relctrl, par.co2_relctrl, par.cc_relctrl, par.og_sp, par.og_losl, par.og_losh, par.alc_sp, par.alc_losl, par.alc_losh, par.cal_sp, par.cal_losl, par.cal_losh, par.crb_sp, par.crb_losl, par.crb_losh, par.rdf_sp, par.rdf_losl, par.rdf_losh, par.co2_sp, par.co2_losl, par.co2_losh, par.cc_sp, par.cc_losl, par.cc_losh, CAST(par.updated_at::DATE AS text)]) AS params,
		  UNNEST(ARRAY[par.og_ftrctrl_note, par.alc_ftrctrl_note, par.cal_ftrctrl_note, par.crb_ftrctrl_note, par.rdf_ftrctrl_note, par.co2_ftrctrl_note, par.cc_ftrctrl_note, par.og_relctrl_note, par.alc_relctrl_note, par.cal_relctrl_note, par.crb_relctrl_note, par.rdf_relctrl_note, par.co2_relctrl_note, par.cc_relctrl_note, par.og_sp_note, par.og_losl_note, par.og_losh_note, par.alc_sp_note, par.alc_losl_note, par.alc_losh_note, par.cal_sp_note, par.cal_losl_note, par.cal_losh_note, par.crb_sp_note, par.crb_losl_note, par.crb_losh_note, par.rdf_sp_note, par.rdf_losl_note, par.rdf_losh_note, par.co2_sp_note, par.co2_losl_note, par.co2_losh_note, par.cc_sp_note, par.cc_losl_note, par.cc_losh_note, par.updated_by]) AS notes
    FROM fin_params AS par
    JOIN brnd_fin AS brnd ON brnd.id = par.fin_id
    WHERE brnd.brand = '${name}'
  `);
  return rows;
}
async function patchRecipeFin(changes) {
  let sendData = [];
  for (let i = 0; i < changes.length - 2; i++) {
    sendData.push(changes[i].params);
    sendData.push(changes[i].notes);
  }

  sendData.push(changes.slice(-1)[0].updated_by);
  sendData = allReplace(JSON.stringify(sendData));

  let { rows } = await db.raw(`
    UPDATE fin_params
    SET (og_ftrctrl, og_ftrctrl_note, alc_ftrctrl, alc_ftrctrl_note, cal_ftrctrl, cal_ftrctrl_note, crb_ftrctrl, crb_ftrctrl_note, rdf_ftrctrl, rdf_ftrctrl_note,
      co2_ftrctrl, co2_ftrctrl_note, cc_ftrctrl, cc_ftrctrl_note, og_relctrl, og_relctrl_note, alc_relctrl, alc_relctrl_note, cal_relctrl, cal_relctrl_note,
      crb_relctrl, crb_relctrl_note, rdf_relctrl, rdf_relctrl_note, co2_relctrl, co2_relctrl_note, cc_relctrl, cc_relctrl_note, og_sp, og_sp_note,
      og_losl, og_losl_note, og_losh, og_losh_note, alc_sp, alc_sp_note, alc_losl, alc_losl_note, alc_losh, alc_losh_note,
      cal_sp, cal_sp_note, cal_losl, cal_losl_note, cal_losh, cal_losh_note, crb_sp, crb_sp_note, crb_losl, crb_losl_note,
      crb_losh, crb_losh_note, rdf_sp, rdf_sp_note, rdf_losl, rdf_losl_note, rdf_losh, rdf_losh_note, co2_sp, co2_sp_note,
      co2_losl, co2_losl_note, co2_losh, co2_losh_note, cc_sp, cc_sp_note, cc_losl, cc_losl_note, cc_losh, cc_losh_note, updated_by) = ${sendData}
    WHERE fin_id = ${changes[0].fin_id}
    RETURNING updated_by;
  `);

  return rows;
}

//Fin injection rates
function patchFinInjection(changes) {
  return db.transaction((trx) => {
    let queries = [];
    changes.forEach((data) => {
      const query = db('fin_injection_bridge').where('fin_id', data.fin_id).andWhere('com_id', data.com_id).update('rate', data.rate).transacting(trx);
      queries.push(query);
    });
    Promise.all(queries).then(trx.commit).catch(trx.rollback);
  });
}

//methods
function getAllMethod() {
  return db('methods_cold').orderBy('method');
}

// return db.transaction((trx) => {
//   let queries = [];
//   changes.forEach((data) => {
//     const query = db('rel_post').where('fin_id', data.id_brnd).update(data.db, data.method).transacting(trx);
//     queries.push(query);
//   });
//   Promise.all(queries).then(trx.commit).catch(trx.rollback);
// });

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
  patchRecipeChp,
  patchRecipeSch,
  patchRecipeFin,
  patchFinInjection,
  getBrandFinIngredient,

  patchCsxPre,
  patchCsxPost,
  patchFltrPre,
  patchFltrPost,
  patchRelPre,
  patchRelPost,
};
