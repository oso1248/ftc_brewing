const db = require('../dbConfig');

const { DateTime } = require('luxon');

// Commodity Projection
// Minor Functions used in main commodity project function
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
    SELECT z.commodity, COALESCE(SUM(z.week0), 0) AS week0
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
        AND (com.type_id = 6 OR com.type_id = 3)
        AND (DATE_TRUNC('day',inv.created_at) >= '${date}' OR inv.created_at IS NULL)
    UNION ALL
      SELECT com.id, com.type_id, com.commodity, inv.lbs AS week0
      FROM mtl_commodity as com
      LEFT JOIN inv_hop_weekly AS inv ON com.id = inv.com_id
      WHERE com.active = 'Yes'
        AND (com.type_id = 1 OR com.type_id = 6 OR com.type_id = 3)
        AND (inv.created_at > '${hopDate}' OR inv.created_at IS NULL)) AS z
    GROUP BY z.id, z.type_id, z.commodity
    ORDER BY z.type_id, z.commodity;
  `);
  return rows;
}

//Main Function
async function getCommodityProjection(dates) {
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
    weeklyBrews = await convertArrayToJSON(weeklyBrews);

    for (let brandCounter = 0; brandCounter < brandList.length; brandCounter++) {
      let brand = brandList[brandCounter].brand;
      let brandDetail = await getBrandDetails(brandList[brandCounter].brand);
      for (let commodityCounter = 0; commodityCounter < brandDetail.length; commodityCounter++) {
        weeklyInventory[commodityCounter]['week' + weekCounter] = weeklyInventory[commodityCounter]['week' + weekCounter] - brandDetail[commodityCounter].sum * weeklyBrews[brand];
        weeklyInventory[commodityCounter]['week' + weekCounter] = weeklyInventory[commodityCounter]['week' + weekCounter].toFixed(2);
      }
    }
    await loadFollowingWeek(weeklyInventory, 'week' + weekCounter, 'week' + (weekCounter + 1));
  }
}

// Minor Function Used In Major Functions
async function weekBrews(startDate, endDate) {
  const { rows } = await db.raw(`
    SELECT brw.brand, COALESCE(SUM(pln.brews), 0) as brews
    FROM brnd_brw AS brw
    LEFT JOIN brewplan AS pln ON brw.brand = pln.brand
    WHERE pln.brew_date >= '${startDate}' AND pln.brew_date < '${endDate}' OR pln.brew_date IS NULL
    GROUP BY brw.brand
    ORDER BY brw.brand
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
      WHERE com.active = 'Yes' AND (com.type_id = 1 OR com.type_id = 6 OR com.type_id = 3)
      UNION ALL
      SELECT mtx.com_id, com.commodity, mtx."${brand}"
      FROM mtx_hop_dry AS mtx 
      JOIN mtl_commodity AS com ON com.id = mtx.com_id
      WHERE com.active = 'Yes' AND (com.type_id = 1 OR com.type_id = 6 OR com.type_id = 3)
      UNION ALL
      SELECT mtx.com_id, com.commodity, mtx."${brand}"
      FROM mtx_sac_supr AS mtx
      JOIN mtl_commodity AS com ON com.id = mtx.com_id
      WHERE com.active = 'Yes' AND (com.type_id = 1 OR com.type_id = 6 OR com.type_id = 3)) AS z
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

// Craft Brews Projection
async function getCraftProjection() {
  let { rows } = await db.raw(`
    SELECT day1.BRAND,
      COALESCE(day1.brews, 0) AS day1,
      COALESCE(day2.brews, 0) AS day2,
      COALESCE(day3.brews, 0) AS day3,
      COALESCE(day4.brews, 0) AS day4,
      COALESCE(day5.brews, 0) AS day5,
      COALESCE(day6.brews, 0) AS day6,
      COALESCE(day7.brews, 0) AS day7
    FROM
      (SELECT brw.brand, SUM(pln.brews) AS brews
      FROM brnd_brw AS brw
      LEFT JOIN brewplan AS pln
        ON brw.brand = pln.brand
        AND pln.brew_date = CURRENT_DATE
      WHERE brw.hop_crft = 'Yes' OR brw.supr_sac = 'Yes'
      GROUP BY brw.brand) AS day1
    LEFT JOIN
      (SELECT brw.brand, SUM(pln.brews) AS brews
      FROM brnd_brw AS brw
      LEFT JOIN brewplan AS pln
        ON brw.brand = pln.brand
        AND pln.brew_date = CURRENT_DATE + 1
      WHERE brw.hop_crft = 'Yes' OR brw.supr_sac = 'Yes'
      GROUP BY brw.brand) AS day2
    ON day1.brand = day2.brand
    LEFT JOIN
      (SELECT brw.brand, SUM(pln.brews) AS brews
      FROM brnd_brw AS brw
      LEFT JOIN brewplan AS pln
        ON brw.brand = pln.brand
        AND pln.brew_date = CURRENT_DATE + 2
      WHERE brw.hop_crft = 'Yes' OR brw.supr_sac = 'Yes'
      GROUP BY brw.brand) AS day3
    ON day1.brand = day3.brand
    LEFT JOIN
      (SELECT brw.brand, SUM(pln.brews) AS brews
      FROM brnd_brw AS brw
      LEFT JOIN brewplan AS pln
        ON brw.brand = pln.brand
        AND pln.brew_date = CURRENT_DATE + 3
      WHERE brw.hop_crft = 'Yes' OR brw.supr_sac = 'Yes'
      GROUP BY brw.brand) AS day4
    ON day1.brand = day4.brand
    LEFT JOIN
      (SELECT brw.brand, SUM(pln.brews) AS brews
      FROM brnd_brw AS brw
      LEFT JOIN brewplan AS pln
        ON brw.brand = pln.brand
        AND pln.brew_date = CURRENT_DATE + 4
      WHERE brw.hop_crft = 'Yes' OR brw.supr_sac = 'Yes'
      GROUP BY brw.brand) AS day5
    ON day1.brand = day5.brand
    LEFT JOIN
      (SELECT brw.brand, SUM(pln.brews) AS brews
      FROM brnd_brw AS brw
      LEFT JOIN brewplan AS pln
        ON brw.brand = pln.brand
        AND pln.brew_date = CURRENT_DATE + 5
      WHERE brw.hop_crft = 'Yes' OR brw.supr_sac = 'Yes'
      GROUP BY brw.brand) AS day6
    ON day1.brand = day6.brand
    LEFT JOIN
      (SELECT brw.brand, SUM(pln.brews) AS brews
      FROM brnd_brw AS brw
      LEFT JOIN brewplan AS pln
        ON brw.brand = pln.brand
        AND pln.brew_date = CURRENT_DATE + 6
      WHERE brw.hop_crft = 'Yes' OR brw.supr_sac = 'Yes'
      GROUP BY brw.brand) AS day7
    ON day1.brand = day7.brand
    ORDER BY day1.brand
  `);
  return rows;
}
async function getBrandData(data) {
  let brandData = await getBrandDetailsMinimum(data[0]);

  for (let commodity = 0; commodity < brandData.length; commodity++) {
    for (let day = 0; day < 7; day++) {
      if (day < 6) {
        brandData[commodity]['day' + (day + 1)] = brandData[commodity]['day' + day];
      }
      brandData[commodity]['day' + day] = (brandData[commodity]['day' + day] * data[day + 1]).toFixed(2);
    }
  }

  return brandData;
}
async function getBrandDetailsMinimum(brand) {
  let { rows } = await db.raw(`
    SELECT z.commodity, SUM(z."${brand}") AS day0
    FROM
      (SELECT mtx.com_id, com.commodity, mtx."${brand}"
      FROM mtx_hop_std AS mtx 
      JOIN mtl_commodity AS com ON com.id = mtx.com_id
      WHERE mtx."${brand}" > 0
      UNION ALL
      SELECT mtx.com_id, com.commodity, "${brand}"
      FROM mtx_sac_supr AS mtx
      JOIN mtl_commodity AS com ON com.id = mtx.com_id
      WHERE mtx."${brand}" > 0) AS z
    JOIN mtl_commodity AS com ON com.id = z.com_id
    GROUP BY z.com_id, z.commodity, com.type_id
    ORDER BY com.type_id, z.commodity
  `);
  return rows;
}

module.exports = {
  getCommodityProjection,
  getCraftProjection,
  getBrandData,
};
