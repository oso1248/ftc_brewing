let DateTime = luxon.DateTime;

let days = [];
function setHeaders() {
  for (let dayCount = 0; dayCount < 8; dayCount++) {
    let day = DateTime.local().startOf('day').plus({ day: dayCount }).toFormat('yyyy-MM-dd');
    days.push(day);
  }
}

let projectionTable;
function projectionView() {
  if (projectionTable) {
    viewBrandBrwTable.clearData();
  }
  viewProjection();
}
function viewProjection() {
  axios
    .post('/api/project/craft')
    .then((res) => {
      let tableData = res.data;

      projectionTable = new Tabulator('#projectionTbl', {
        printHeader: '<h1>Craft Brews<h1>',
        selectable: 1,
        // selectableRollingSelection: false,
        resizableColumns: false,
        height: '100%',
        layoutColumnsOnNewData: true,
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Brand', field: 'brand', hozAlign: 'center', frozen: true },
          { title: days[0], field: 'day1', hozAlign: 'center', sorter: 'number', formatter: positiveCell },
          { title: days[1], field: 'day2', hozAlign: 'center', sorter: 'number', formatter: positiveCell },
          { title: days[2], field: 'day3', hozAlign: 'center', sorter: 'number', formatter: positiveCell },
          { title: days[3], field: 'day4', hozAlign: 'center', sorter: 'number', formatter: positiveCell },
          { title: days[4], field: 'day5', hozAlign: 'center', sorter: 'number', formatter: positiveCell },
          { title: days[5], field: 'day6', hozAlign: 'center', sorter: 'number', formatter: positiveCell },
          { title: days[6], field: 'day7', hozAlign: 'center', sorter: 'number', formatter: positiveCell },
        ],
      });
    })
    .catch((err) => console.log(err));
}
function positiveCell(cell) {
  var value = cell.getValue();
  if (value > 0) {
    return `<span style='color:red; font-weight:bold;'>` + value + `</span>`;
  } else {
    return value;
  }
}
document.getElementById('xlsxProjection').addEventListener('click', () => {
  projectionTable.download('xlsx', 'craft_brews.xlsx', {
    sheetName: 'Projection',
  });
});
document.getElementById('printProjection').addEventListener('click', () => {
  projectionTable.print(false, true);
});

let brandDetailTable;
document.getElementById('getDataProjection').addEventListener('click', getRowData);
async function getRowData(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let selectedData = projectionTable.getSelectedData()[0];
  if (!selectedData) {
    alert('Select Brand To Display Make Up');
    return;
  }
  let sendData = await convertJSONtoArray(selectedData);
  let header = document.getElementById('brandDetailTable');
  header.innerHTML = sendData[0];
  let descriptor = document.getElementById('brandMakeUPDescriptor');
  descriptor.innerHTML = 'Displays Make Up Of Selected Brand Times Number Of Daily Brews';
  axios
    .post('/api/project/craft/branddata', sendData)
    .then((res) => {
      let tableData = res.data;
      brandDetailTable = new Tabulator('#brandDetailTbl', {
        printHeader: '<h1>Craft Brews<h1>',
        // selectable: 1,
        // selectableRollingSelection: false,
        resizableColumns: false,
        height: '100%',
        layoutColumnsOnNewData: true,
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Commodity', field: 'commodity', hozAlign: 'center', frozen: true },
          { title: days[0], field: 'day0', hozAlign: 'center', sorter: 'number' },
          { title: days[1], field: 'day1', hozAlign: 'center', sorter: 'number' },
          { title: days[2], field: 'day2', hozAlign: 'center', sorter: 'number' },
          { title: days[3], field: 'day3', hozAlign: 'center', sorter: 'number' },
          { title: days[4], field: 'day4', hozAlign: 'center', sorter: 'number' },
          { title: days[5], field: 'day5', hozAlign: 'center', sorter: 'number' },
          { title: days[6], field: 'day6', hozAlign: 'center', sorter: 'number' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
async function convertJSONtoArray(json) {
  let arry = [];
  for (let key in json) {
    if (json.hasOwnProperty(key)) {
      arry.push(json[key]);
    }
  }
  return arry;
}

function getTrailerNumber() {
  return axios
    .post('/api/craft/trailer/check')
    .then((res) => {
      res = res.data.rows[0].id;
      return res;
    })
    .catch((err) => {
      return null;
    });
}
let unTied;
function loadUntied() {
  let week = DateTime.local().startOf('week').minus({ hours: 0.5 }).toFormat('yyyy-MM-dd HH:mm');
  let timeSpan = {};
  timeSpan.start = week;
  axios
    .post('/api/craft/material/inv/view/', timeSpan)
    .then((res) => {
      let tableData = res.data;
      unTied = new Tabulator('#invUnTied', {
        resizableColumns: false,
        selectable: true,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Commodity', field: 'commodity', hozAlign: 'left', frozen: true },
          { title: 'Count', field: 'count', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tied;
function loadTied() {
  axios
    .post('/api/craft/tied/view')
    .then((res) => {
      let tableData = res.data;
      tied = new Tabulator('#invTied', {
        resizableColumns: false,
        selectable: true,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Commodity', field: 'commodity', hozAlign: 'left', frozen: true },
          { title: 'Count', field: 'count', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let trailer;
function loadTrailer(id) {
  axios
    .post('/api/craft/trailer/inv/view/' + id)
    .then((res) => {
      let tableData = res.data.rows;
      trailer = new Tabulator('#invTrailer', {
        resizableColumns: false,
        selectable: true,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Commodity', field: 'commodity', hozAlign: 'left', frozen: true },
          { title: 'Count', field: 'count', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let floor;
function loadFloor() {
  axios
    .post('/api/craft/floor/inv/view/')
    .then((res) => {
      let tableData = res.data;
      floor = new Tabulator('#invFloor', {
        resizableColumns: false,
        selectable: true,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Commodity', field: 'commodity', hozAlign: 'left', frozen: true },
          { title: 'Count', field: 'count', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}

window.addEventListener('DOMContentLoaded', async (ev) => {
  await setHeaders();
  projectionView();

  trailerNumber = await getTrailerNumber();
  loadUntied();
  loadTied();
  loadTrailer(trailerNumber);
  loadFloor();
});
