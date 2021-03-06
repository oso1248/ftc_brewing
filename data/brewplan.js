// knex seed:run --specific brewplan.js
const { DateTime } = require('luxon');

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const brw1 = ['BB10', 'BC10', 'BD10'];
const brw2 = ['BE10', 'BF10', 'BG10'];

function getBrews(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let day = [];
for (let dayCounter = 0; dayCounter < 65; dayCounter++) {
  let days = DateTime.local().startOf('week').plus({ day: dayCounter }).toFormat('yyyy-MM-dd');
  day.push(days);
}

const brewplan = [
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[0] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[0] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[0] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[0] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[0] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[0] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[0] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[1] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[1] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[1] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[1] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[1] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[1] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[1] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[2] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[2] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[2] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[2] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[2] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[2] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[2] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[3] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[3] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[3] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[3] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[3] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[3] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[3] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[4] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[4] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[4] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[4] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[4] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[4] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[4] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[5] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[5] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[5] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[5] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[5] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[5] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[5] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[6] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[6] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[6] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[6] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[6] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[6] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[6] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[7] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[7] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[7] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[7] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[7] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[7] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[7] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[8] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[8] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[8] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[8] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[8] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[8] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[8] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[9] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[9] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[9] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[9] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[9] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[9] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[9] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[10] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[10] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[10] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[10] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[10] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[10] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[10] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[11] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[11] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[11] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[11] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[11] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[11] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[11] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[12] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[12] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[12] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[12] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[12] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[12] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[12] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[13] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[13] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[13] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[13] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[13] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[13] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[13] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[14] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[14] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[14] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[14] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[14] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[14] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[14] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[15] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[15] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[15] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[15] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[15] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[15] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[15] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[16] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[16] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[16] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[16] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[16] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[16] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[16] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[17] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[17] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[17] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[17] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[17] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[17] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[17] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[18] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[18] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[18] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[18] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[18] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[18] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[18] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[19] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[19] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[19] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[19] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[19] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[19] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[19] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[20] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[20] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[20] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[20] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[20] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[20] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[20] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[21] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[21] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[21] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[21] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[21] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[21] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[21] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[22] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[22] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[22] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[22] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[22] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[22] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[22] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[23] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[23] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[23] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[23] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[23] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[23] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[23] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[24] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[24] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[24] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[24] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[24] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[24] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[24] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[25] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[25] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[25] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[25] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[25] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[25] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[25] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[26] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[26] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[26] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[26] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[26] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[26] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[26] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[27] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[27] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[27] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[27] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[27] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[27] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[27] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[28] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[28] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[28] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[28] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[28] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[28] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[28] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[29] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[29] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[29] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[29] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[29] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[29] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[29] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[30] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[30] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[30] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[30] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[30] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[30] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[30] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[31] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[31] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[31] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[31] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[31] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[31] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[31] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[32] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[32] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[32] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[32] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[32] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[32] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[32] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[33] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[33] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[33] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[33] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[33] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[33] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[33] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[34] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[34] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[34] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[34] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[34] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[34] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[34] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[35] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[35] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[35] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[35] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[35] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[35] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[35] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[36] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[36] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[36] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[36] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[36] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[36] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[36] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[37] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[37] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[37] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[37] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[37] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[37] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[37] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[38] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[38] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[38] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[38] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[38] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[38] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[38] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[39] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[39] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[39] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[39] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[39] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[39] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[39] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[40] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[40] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[40] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[40] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[40] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[40] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[40] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[41] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[41] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[41] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[41] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[41] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[41] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[41] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[42] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[42] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[42] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[42] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[42] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[42] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[42] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[43] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[43] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[43] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[43] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[43] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[43] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[43] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[44] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[44] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[44] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[44] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[44] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[44] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[44] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[45] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[45] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[45] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[45] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[45] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[45] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[45] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[46] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[46] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[46] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[46] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[46] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[46] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[46] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[47] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[47] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[47] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[47] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[47] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[47] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[47] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[48] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[48] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[48] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[48] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[48] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[48] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[48] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[49] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[49] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[49] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[49] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[49] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[49] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[49] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[50] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[50] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[50] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[50] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[50] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[50] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[50] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[51] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[51] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[51] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[51] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[51] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[51] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[51] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[52] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[52] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[52] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[52] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[52] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[52] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[52] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[53] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[53] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[53] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[53] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[53] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[53] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[53] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[54] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[54] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[54] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[54] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[54] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[54] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[54] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[55] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[55] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[55] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[55] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[55] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[55] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[55] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[56] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[56] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[56] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[56] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[56] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[56] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[56] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[57] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[57] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[57] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[57] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[57] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[57] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[57] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[58] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[58] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[58] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[58] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[58] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[58] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[58] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[59] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[59] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[59] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[59] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[59] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[59] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[59] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[60] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[60] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[60] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[60] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[60] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[60] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[60] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[61] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[61] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[61] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[61] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[61] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[61] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[61] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[62] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[62] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[62] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[62] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[62] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[62] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[62] },

  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[63] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[63] },
  { brand: brw1.sample(), house: 1, brews: getBrews(1, 6), brew_date: day[63] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[63] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[63] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[63] },
  { brand: brw2.sample(), house: 2, brews: getBrews(1, 6), brew_date: day[63] },
];

module.exports = {
  brewplan,
};
