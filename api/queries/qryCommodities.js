const db = require('../dbConfig');

async function add(data) {
  // function in database add id to tables mtx_hop_dry, mtx_hop_std, mtx_material, mtx_sac_supr
  let { rows } = await db.raw(`
    INSERT
    INTO mtl_commodity(commodity, active, sap, inventory, threshold, per_pallet, unit_total, note, uom_id, type_id, location_id, enviro_id, container_id, supplier_id)
    VALUES ('${data.commodity}', '${data.active}', ${data.sap}, '${data.inventory}', ${data.threshold}, ${data.per_pallet}, ${data.unit_total}, '${data.note}',
        (SELECT id FROM mtl_uom WHERE uom  = '${data.uom_id}'),
        (SELECT id FROM mtl_type AS typ WHERE typ.type  = '${data.type_id}'),
        (SELECT id FROM mtl_location AS loc WHERE loc.location  = '${data.location_id}'),
        (SELECT id FROM mtl_enviro WHERE enviro  = '${data.enviro_id}'),
        (SELECT id FROM mtl_container WHERE container  = '${data.container_id}'),
        (SELECT id FROM mtl_supplier WHERE company  = '${data.supplier_id}'))
    RETURNING commodity
  `);
  return rows;
}
async function getAll(active) {
  if (active) {
    let { rows } = await db.raw(`
      SELECT com.commodity, com.sap, com.active, com.inventory, loc.location,
        sup.company, typ.type, con.container, env.enviro, com.threshold,
        com.per_pallet, com.unit_total, uom.uom, com.note, CAST(com.updated_at::DATE AS text), com.updated_by
      FROM mtl_commodity as com
      JOIN mtl_uom AS uom ON com.uom_id = uom.id
      JOIN mtl_type AS typ ON com.type_id = typ.id
      JOIN mtl_location AS loc ON com.location_id = loc.id
      JOIN mtl_enviro AS env ON com.enviro_id = env.id
      JOIN mtl_container AS con ON com.container_id = con.id
      JOIN mtl_supplier AS sup ON com.supplier_id = sup.id
      WHERE com.active = 'Yes'
      ORDER BY com.active DESC, com.commodity ASC;
    `);
    return rows;
  } else {
    let { rows } = await db.raw(`
      SELECT com.commodity, com.sap, com.active, com.inventory, loc.location,
        sup.company, typ.type, con.container, env.enviro, com.threshold,
        com.per_pallet, com.unit_total, uom.uom, com.note, CAST(com.updated_at::DATE AS text), com.updated_by
      FROM mtl_commodity as com
      JOIN mtl_uom AS uom ON com.uom_id = uom.id
      JOIN mtl_type AS typ ON com.type_id = typ.id
      JOIN mtl_location AS loc ON com.location_id = loc.id
      JOIN mtl_enviro AS env ON com.enviro_id = env.id
      JOIN mtl_container AS con ON com.container_id = con.id
      JOIN mtl_supplier AS sup ON com.supplier_id = sup.id
      WHERE com.active = 'Yes' OR com.active = 'No'
      ORDER BY com.active DESC, com.commodity ASC;
    `);
    return rows;
  }
}
async function getByName(name) {
  let { rows } = await db.raw(`
    SELECT com.commodity, com.sap, com.active, com.inventory, loc.location,
      sup.company, typ.type, con.container, env.enviro, com.threshold,
      com.per_pallet, com.unit_total, uom.uom, com.note, CAST(com.updated_at::DATE AS text), com.updated_by
    FROM mtl_commodity as com
    JOIN mtl_uom AS uom ON com.uom_id = uom.id
    JOIN mtl_type AS typ ON com.type_id = typ.id
    JOIN mtl_location AS loc ON com.location_id = loc.id
    JOIN mtl_enviro AS env ON com.enviro_id = env.id
    JOIN mtl_container AS con ON com.container_id = con.id
    JOIN mtl_supplier AS sup ON com.supplier_id = sup.id
    WHERE com.commodity = '${name}'
  `);
  return rows;
}
async function getByType(active, type) {
  if (active) {
    let { rows } = await db.raw(`
      SELECT com.commodity, com.sap, com.active, com.inventory, loc.location,
        sup.company, typ.type, con.container, env.enviro, com.threshold,
        com.per_pallet, com.unit_total, uom.uom, com.note, CAST(com.updated_at::DATE AS text), com.updated_by
      FROM mtl_commodity as com
      JOIN mtl_uom AS uom ON com.uom_id = uom.id
      JOIN mtl_type AS typ ON com.type_id = typ.id
      JOIN mtl_location AS loc ON com.location_id = loc.id
      JOIN mtl_enviro AS env ON com.enviro_id = env.id
      JOIN mtl_container AS con ON com.container_id = con.id
      JOIN mtl_supplier AS sup ON com.supplier_id = sup.id
      WHERE typ.type = '${type}' AND com.active = 'Yes'
      ORDER BY com.active DESC, com.commodity ASC;
    `);
    return rows;
  } else {
    let { rows } = await db.raw(`
      SELECT com.commodity, com.sap, com.active, com.inventory, loc.location,
        sup.company, typ.type, con.container, env.enviro, com.threshold,
        com.per_pallet, com.unit_total, uom.uom, com.note, CAST(com.updated_at::DATE AS text), com.updated_by
      FROM mtl_commodity as com
      JOIN mtl_uom AS uom ON com.uom_id = uom.id
      JOIN mtl_type AS typ ON com.type_id = typ.id
      JOIN mtl_location AS loc ON com.location_id = loc.id
      JOIN mtl_enviro AS env ON com.enviro_id = env.id
      JOIN mtl_container AS con ON com.container_id = con.id
      JOIN mtl_supplier AS sup ON com.supplier_id = sup.id
      WHERE typ.type = '${type}'
      ORDER BY com.active DESC, com.commodity ASC;
    `);
    return rows;
  }
}
function getByContainer(active, container) {
  if (active) {
    return db('mtl_commodity AS com')
      .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
      .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
      .join('mtl_location AS loc', 'com.location_id', 'loc.id')
      .join('mtl_enviro as env', 'com.enviro_id', '=', 'env.id')
      .join('mtl_container as con', 'com.container_id', '=', 'con.id')
      .join('mtl_supplier as sup', 'com.supplier_id', '=', 'sup.id')
      .select(
        'com.id as com_id',
        'com.commodity',
        'com.sap',
        'com.active',
        'com.inventory',
        'loc.location',
        'sup.company',
        'typ.type',
        'con.container',
        'env.enviro',
        'com.threshold',
        'com.per_pallet',
        'com.unit_total',
        'uom.uom',
        'com.note'
      )
      .where('con.container', '=', container)
      .orderBy('com.commodity', 'asc');
  } else {
    return db('mtl_commodity AS com')
      .join('mtl_uom as uom', 'com.uom_id', '=', 'uom.id')
      .join('mtl_type as typ', 'com.type_id', '=', 'typ.id')
      .join('mtl_location AS loc', 'com.location_id', 'loc.id')
      .join('mtl_enviro as env', 'com.enviro_id', '=', 'env.id')
      .join('mtl_container as con', 'com.container_id', '=', 'con.id')
      .join('mtl_supplier as sup', 'com.supplier_id', '=', 'sup.id')
      .select(
        'com.id',
        'com.commodity',
        'com.sap',
        'com.active',
        'com.inventory',
        'loc.location',
        'sup.company',
        'typ.type',
        'con.container',
        'env.enviro',
        'com.threshold',
        'com.per_pallet',
        'com.unit_total',
        'uom.uom',
        'com.note'
      )
      .where('con.container', '=', container)
      .orderBy([{ column: 'com.active', order: 'desc' }, { column: 'com.commodity' }]);
  }
}

async function change(name, changes) {
  let { rows } = await db.raw(`
    UPDATE mtl_commodity
    SET active = '${changes.active}',
      sap = ${changes.sap},
      inventory = '${changes.inventory}',
      threshold = ${changes.threshold},
      per_pallet = ${changes.per_pallet},
      unit_total = ${changes.unit_total},
      note = '${changes.note}',
      updated_by = '${changes.updated_by}',
      uom_id = (SELECT id FROM mtl_uom WHERE uom = '${changes.uom_id}'),
      type_id = (SELECT id FROM mtl_type AS typ WHERE typ.type = '${changes.type_id}'),
      location_id = (SELECT id FROM mtl_location AS loc WHERE loc.location = '${changes.location_id}'),
      enviro_id = (SELECT id FROM mtl_enviro WHERE enviro  = '${changes.enviro_id}'),
      container_id = (SELECT id FROM mtl_container WHERE container  = '${changes.container_id}'),
      supplier_id = (SELECT id FROM mtl_supplier WHERE company  = '${changes.supplier_id}')
    WHERE commodity = '${name}'
    RETURNING commodity
  `);
  return rows;
}
async function destroy(name) {
  let remove = await db('mtl_commodity').where('commodity', name).del();
  return getByName(name);
}

async function addFinBridge(data) {
  let { rows } = await db.raw(`
  WITH rows AS (
    INSERT 
    INTO fin_injection_bridge (fin_id, com_id)
    VALUES ((SELECT id FROM brnd_fin WHERE brand = '${data.fin_id}'),
    (SELECT id FROM mtl_commodity WHERE commodity = '${data.com_id}'))
    RETURNING com_id, fin_id)
  SELECT com.commodity, fin.brand
  FROM rows AS row
  JOIN brnd_fin AS fin ON row.fin_id = fin.id
  JOIN mtl_commodity AS com ON row.com_id = com.id;

  `);
  return rows;
}
async function destroyBridge(id) {
  let { rows } = await db.raw(`
    WITH del AS (DELETE FROM fin_injection_bridge WHERE fin_id = 4 RETURNING *)
    SELECT COUNT(del.*), fin.brand
    FROM del
    JOIN brnd_fin AS fin ON del.fin_id = fin.id
    GROUP BY fin.brand
  `);
  return rows;
}

async function getFinBridgeById(id) {
  let { rows } = await db.raw(`
    SELECT fin.id, fin.brand, com.id, com.commodity
    FROM fin_injection_bridge AS brg
    JOIN brnd_fin AS fin ON brg.fin_id = fin.id
    JOIN mtl_commodity AS com ON brg.com_id = com.id
    WHERE brg.fin_id = ${id};
  `);
  return rows;
}

module.exports = {
  add,
  getAll,
  getByName,
  change,
  destroy,
  getByType,
  getByContainer,
  addFinBridge,
  destroyBridge,
  getFinBridgeById,
};
