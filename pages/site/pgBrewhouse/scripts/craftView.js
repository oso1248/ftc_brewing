let DateTime = luxon.DateTime;
let today;
let week = DateTime.local().startOf('week').minus({ hours: 0.5 }).toFormat('yyyy-MM-dd HH:mm');
let timeKeeper = document.getElementById('time');

// on window load
async function reload() {
  today = DateTime.local().toFormat('yyyy-MM-dd HH:mm');
  trailerNumber = await getTrailerNumber();
  loadUntied();
  loadTied();
  loadTrailer(trailerNumber);
  loadFloor();
  timeKeeper.innerHTML = 'Last Update: ' + today;
  console.log(today);
}
setInterval(reload, 1000 * 60 * 15);
let trailerNumber;
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

document.getElementById('btnBack').addEventListener('click', () => {
  window.history.back();
});
window.addEventListener('DOMContentLoaded', async (ev) => {
  today = DateTime.local().toFormat('yyyy-MM-dd HH:mm');
  trailerNumber = await getTrailerNumber();
  loadUntied();
  loadTied();
  loadTrailer(trailerNumber);
  loadFloor();
  timeKeeper.innerHTML = 'Last Update: ' + today;
});
