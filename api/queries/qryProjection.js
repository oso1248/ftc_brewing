const db = require('../dbConfig');

const { DateTime } = require('luxon');

// Minor Functions used in main function
async function getBrands() {
  let { rows } = await db.raw(`
    SELECT brand
    FROM brnd_brw
    WHERE active = 'Yes'
  `);
  return rows;
}
async function getInventory(date) {
  // Get Inventory From Beginning of Week to Current
  let hopDate = DateTime.fromSQL(date).minus({ hour: 8 }).toFormat('yyyy-MM-dd HH:mm');

  let { rows } = await db.raw(`
    SELECT z.commodity, SUM(z.week0) AS week0
    FROM
      (SELECT com.id, com.type_id, com.commodity, inv.total_end AS week0
      FROM mtl_commodity as com
      LEFT JOIN inv_mat_weekly AS inv ON com.id = inv.com_id
      WHERE com.active = 'Yes'
        AND (com.type_id = 1)
        AND (DATE_TRUNC('day',inv.created_at) >= '${date}' OR inv.created_at IS NULL)
    UNION ALL
      SELECT com.id, com.type_id, com.commodity, ROUND((inv.total_end / inv.total_per_unit), 2) AS week0
      FROM mtl_commodity as com
      LEFT JOIN inv_mat_weekly AS inv ON com.id = inv.com_id
      WHERE com.active = 'Yes'
        AND (com.type_id = 6)
        AND (DATE_TRUNC('day',inv.created_at) >= '${date}' OR inv.created_at IS NULL)
    UNION ALL
      SELECT com.id, com.type_id, com.commodity, inv.lbs AS week0
      FROM mtl_commodity as com
      LEFT JOIN inv_hop_weekly AS inv ON com.id = inv.com_id
      WHERE com.active = 'Yes'
        AND (com.type_id = 1 OR com.type_id = 6)
        AND (inv.created_at > '${hopDate}' OR inv.created_at IS NULL)) AS z
    GROUP BY z.id, z.type_id, z.commodity
    ORDER BY z.type_id, z.commodity;
  `);
  return rows;
}

//Main Function
async function getProjection(dates) {
  let brandList = await getBrands();
  let weeklyInventory = await getInventory(dates[0]);

  await appendWeeks(weeklyInventory);

  await tallyWeeks(dates, brandList, weeklyInventory);

  return weeklyInventory;
}

// Major Functions Used In Main Function
async function appendWeeks(weeklyInventory) {
  for (let w = 1; w < 9; w++) {
    for (let i = 0; i < weeklyInventory.length; i++) {
      weeklyInventory[i]['week' + w] = '0';
    }
  }
}
async function tallyWeeks(dates, brandList, weeklyInventory) {
  for (let weekCounter = 0; weekCounter < 8; weekCounter++) {
    let weeklyBrews = await weekBrews(dates[weekCounter], dates[weekCounter + 1]);
    // console.log(weekCounter + '\n', weeklyBrews);
    weeklyBrews = await convertArrayToJSON(weeklyBrews);

    for (let brandCounter = 0; brandCounter < brandList.length; brandCounter++) {
      let brand = brandList[brandCounter].brand;
      let brandDetail = await getBrandDetails(brandList[brandCounter].brand);

      for (let commodityCounter = 0; commodityCounter < brandDetail.length; commodityCounter++) {
        weeklyInventory[commodityCounter]['week' + weekCounter] = weeklyInventory[commodityCounter]['week' + weekCounter] - brandDetail[commodityCounter].sum * weeklyBrews[brand];
      }
    }
    await loadFollowingWeek(weeklyInventory, 'week' + weekCounter, 'week' + (weekCounter + 1));
  }
}

// Minor Function Used In Major Functions
async function weekBrews(startDate, endDate) {
  const { rows } = await db.raw(`
    SELECT brand, SUM(brews) AS brews
    FROM brewplan
    WHERE brew_date >= '${startDate}' AND brew_date < '${endDate}'
    GROUP By brand
    ORDER BY brand ASC
  `);
  return rows;
}
async function convertArrayToJSON(arry) {
  let obj = {};
  arry.forEach((row) => {
    obj[row.brand] = row.brews;
  });
  return obj;
}
async function getBrandDetails(brand) {
  // Get Details of Hops, Dry, Super of Brand
  const { rows } = await db.raw(`
    SELECT z.commodity, SUM(z."${brand}")
    FROM
      (SELECT mtx.com_id, com.commodity, mtx."${brand}"
      FROM mtx_hop_std AS mtx 
      JOIN mtl_commodity AS com ON com.id = mtx.com_id
      WHERE com.active = 'Yes' AND (com.type_id = 1 OR com.type_id = 6)
      UNION ALL
      SELECT mtx.com_id, com.commodity, mtx."${brand}"
      FROM mtx_hop_dry AS mtx 
      JOIN mtl_commodity AS com ON com.id = mtx.com_id
      WHERE com.active = 'Yes' AND (com.type_id = 1 OR com.type_id = 6)
      UNION ALL
      SELECT mtx.com_id, com.commodity, mtx."${brand}"
      FROM mtx_sac_supr AS mtx
      JOIN mtl_commodity AS com ON com.id = mtx.com_id
      WHERE com.active = 'Yes' AND (com.type_id = 1 OR com.type_id = 6)) AS z
    JOIN mtl_commodity AS com ON com.id = z.com_id
    GROUP BY z.com_id, z.commodity, com.type_id
    ORDER BY com.type_id, z.commodity
  `);
  return rows;
}
async function loadFollowingWeek(weeklyInventory, workWeek, nextWeek) {
  for (let i = 0; i < weeklyInventory.length; i++) {
    weeklyInventory[i][nextWeek] = weeklyInventory[i][workWeek];
  }
}

module.exports = { getProjection };
