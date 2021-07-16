const db = require('../dbConfig');

function allReplace(obj) {
  return obj.replace(/\[/g, '(').replace(/\]/g, ')').replace(/"/g, `'`);
}

async function startupSuppliers(data) {
  let sendData = ``;
  for (let i = 0; i < data.length; i++) {
    let supplier = [];
    supplier.push(data[i].Company);
    supplier.push(data[i].Contact);
    supplier.push(data[i].Email);
    supplier.push(data[i].Phone);
    supplier.push(data[i].Address);
    supplier.push(data[i].Note);
    sendData = sendData + `${allReplace(JSON.stringify(supplier))},`;
  }

  sendData = sendData.replace(/,\s*$/, '');
  let { rows } = await db.raw(`
    WITH rows AS (
      INSERT
      INTO mtl_supplier (company, contact, email, phone, address, note)
      VALUES ${sendData}
      RETURNING id)
    SELECT count(id)
    FROM rows AS count
  `);
  return rows;
}
async function startupCommodities(data) {
  let sendData = ``;
  for (let i = 0; i < data.length; i++) {
    sendData = sendData + `('${data[i].Commodity}',`;
    sendData = sendData + `'${data[i].Active}',`;
    sendData = sendData + `'${data[i].Sap}',`;
    sendData = sendData + `'${data[i].Inventory}',`;
    sendData = sendData + `'${data[i].Threshold}',`;
    sendData = sendData + `'${data[i].PerPallet}',`;
    sendData = sendData + `'${data[i].UnitTotal}',`;
    data[i].Note ? (sendData = sendData + `'${data[i].Note}',`) : (sendData = sendData + `null,`);
    sendData = sendData + `(SELECT id FROM mtl_uom WHERE uom = '${data[i].Uom}'),`;
    sendData = sendData + `(SELECT id FROM mtl_type WHERE type = '${data[i].Type}'),`;
    sendData = sendData + `(SELECT id FROM mtl_location WHERE location = '${data[i].Location}'),`;
    sendData = sendData + `(SELECT id FROM mtl_enviro WHERE enviro = '${data[i].Enviro}'),`;
    sendData = sendData + `(SELECT id FROM mtl_container WHERE container = '${data[i].Container}'),`;
    sendData = sendData + `(SELECT id FROM mtl_supplier WHERE company = '${data[i].Supplier}'),`;
    sendData = sendData + `'${data[i].updated_by}'),`;
  }
  sendData = sendData.replace(/,\s*$/, '');
  let { rows } = await db.raw(`
    WITH rows AS (
	    INSERT
	    INTO mtl_commodity (commodity, active, sap, inventory, threshold, per_pallet, unit_total, note, uom_id, type_id, location_id, enviro_id, container_id, supplier_id, updated_by)
	    VALUES ${sendData}
	    RETURNING id)
    SELECT COUNT(id)
    FROM rows AS count
  `);
  return rows;
}
async function startupBrew(data) {
  let sendData = ``;
  for (let i = 0; i < data.length; i++) {
    sendData = sendData + `('${data[i].Brand}',`;
    sendData = sendData + `'${data[i].HopStandard}',`;
    sendData = sendData + `'${data[i].HopCraft}',`;
    sendData = sendData + `'${data[i].HopDry}',`;
    sendData = sendData + `'${data[i].SuperSack}',`;
    sendData = sendData + `'${data[i].Active}',`;
    // sendData = sendData + `'${data[i].Note}',`;
    data[i].Note ? (sendData = sendData + `'${data[i].Note}',`) : (sendData = sendData + `null,`);
    sendData = sendData + `'${data[i].updated_by}'),`;
  }
  sendData = sendData.replace(/,\s*$/, '');

  let { rows } = await db.raw(`
    WITH rows AS (
	    INSERT
	    INTO brnd_brw (brand, hop_std, hop_crft, hop_dry, supr_sac, active, note, updated_by)
	    VALUES ${sendData}
	    RETURNING id)
    SELECT COUNT(id)
    FROM rows AS count
  `);
  return rows;
}
async function startupFin(data) {
  let sendData = ``;
  for (let i = 0; i < data.length; i++) {
    sendData = sendData + `('${data[i].FinBrand}',`;
    sendData = sendData + `'${data[i].Injection}',`;
    sendData = sendData + `'${data[i].Active}',`;
    sendData = sendData + `(SELECT id FROM brnd_brw WHERE brand = '${data[i].BrewBrand}'),`;
    // sendData = sendData + `'${data[i].Note}',`;
    data[i].Note ? (sendData = sendData + `'${data[i].Note}',`) : (sendData = sendData + `null,`);
    sendData = sendData + `'${data[i].updated_by}'),`;
  }
  sendData = sendData.replace(/,\s*$/, '');

  let { rows } = await db.raw(`
    WITH rows AS (
	    INSERT
	    INTO brnd_fin (brand, injection, active, brw_id, note, updated_by)
	    VALUES ${sendData} 
	    RETURNING id)
    SELECT COUNT(id)
    FROM rows AS count
  `);
  return rows;
}
async function startupPack(data) {
  let sendData = ``;
  for (let i = 0; i < data.length; i++) {
    sendData = sendData + `('${data[i].PackBrand}',`;
    sendData = sendData + `'${data[i].Active}',`;
    sendData = sendData + `(SELECT id FROM brnd_fin WHERE brand = '${data[i].FinBrand}'),`;
    // sendData = sendData + `'${data[i].Note}',`;
    data[i].Note ? (sendData = sendData + `'${data[i].Note}',`) : (sendData = sendData + `null,`);
    sendData = sendData + `'${data[i].updated_by}'),`;
  }
  sendData = sendData.replace(/,\s*$/, '');

  let { rows } = await db.raw(`
    WITH rows AS (
	    INSERT
	    INTO brnd_pck (brand, active, fin_id, note, updated_by)
	    VALUES ${sendData}
	    RETURNING id)
    SELECT COUNT(id)
    FROM rows AS count
  `);
  return rows;
}

async function startupStandardHops(data) {
  let colValues = [];
  let colNames = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let keys = [];
    let vals = [];
    for (const [key, value] of Object.entries(element)) {
      keys.push(key);
      vals.push(value);
    }
    colNames.push(keys);
    colValues.push(vals);
  }
  let setCols = setColumn(colNames[0]);
  let valCols = valColumn(colValues);
  let asCols = asColumn(colNames[0]);
  let tbl = `mtx_hop_std`;

  let rows = await mtxUpdate(tbl, setCols, valCols, asCols);

  return rows;
}
async function startupDryHops(data) {
  let colValues = [];
  let colNames = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let keys = [];
    let vals = [];
    for (const [key, value] of Object.entries(element)) {
      keys.push(key);
      vals.push(value);
    }
    colNames.push(keys);
    colValues.push(vals);
  }
  let setCols = setColumn(colNames[0]);
  let valCols = valColumn(colValues);
  let asCols = asColumn(colNames[0]);
  let tbl = `mtx_hop_dry`;

  let rows = await mtxUpdate(tbl, setCols, valCols, asCols);

  return rows;
}
async function startupSuperSacks(data) {
  let colValues = [];
  let colNames = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let keys = [];
    let vals = [];
    for (const [key, value] of Object.entries(element)) {
      keys.push(key);
      vals.push(value);
    }
    colNames.push(keys);
    colValues.push(vals);
  }
  let setCols = setColumn(colNames[0]);
  let valCols = valColumn(colValues);
  let asCols = asColumn(colNames[0]);
  let tbl = `mtx_sac_supr`;

  let rows = await mtxUpdate(tbl, setCols, valCols, asCols);

  return rows;
}

function setColumn(colNames) {
  let setCols = '';
  for (let i = 1; i < colNames.length; i++) {
    setCols = setCols + `"${colNames[i]}" = c.${colNames[i]},`;
  }
  setCols = setCols.slice(0, -1);
  return setCols;
}
function valColumn(values) {
  let valCols = '';
  for (let i = 0; i < values.length; i++) {
    valCols = valCols + `(`;
    for (let c = 0; c < values[i].length; c++) {
      if (c === 0) {
        valCols = valCols + `(SELECT id FROM mtl_commodity WHERE commodity = '${values[i][c]}')`;
      } else {
        valCols = valCols + `,${values[i][c]}`;
      }
    }
    valCols = valCols + `),`;
  }
  valCols = valCols.slice(0, -1);
  return valCols;
}
function asColumn(colNames) {
  let setCols = '';
  for (let i = 0; i < colNames.length; i++) {
    setCols = setCols + `${colNames[i]},`;
  }
  setCols = setCols.slice(0, -1);
  return setCols;
}
async function mtxUpdate(tbl, setCols, valCols, asCols) {
  let { rows } = await db.raw(`
    WITH rows AS (
      UPDATE ${tbl} AS m
      SET ${setCols}
	    FROM(VALUES
		    ${valCols}) AS c(${asCols})
      WHERE c.Commodity = m.com_id
        RETURNING id)
    SELECT COUNT(id)
    FROM rows AS count
  `);
  return rows;
}

module.exports = {
  startupSuppliers,
  startupCommodities,
  startupBrew,
  startupFin,
  startupPack,
  startupStandardHops,
  startupDryHops,
  startupSuperSacks,
};
