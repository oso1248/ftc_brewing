let DateTime = luxon.DateTime;
let timeNow;

function getCookie(cookieName) {
  var cookieValue = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

// on window load
async function reload() {
  let timeKeeper = document.getElementById('time');
  timeNow = DateTime.local().toFormat('yyyy-MM-dd HH:mm');
  loadManpower3();
  loadManpower2();
  loadManpower1();
  timeKeeper.innerHTML = `Last Update: ${timeNow}`;
}
setInterval(reload, 1000 * 60 * 15);

let man1;
function loadManpower1() {
  let dateHeader = document.getElementById('timeMids');
  timeMids = DateTime.fromSQL(timeNow).minus({ hours: 3.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStart = DateTime.fromSQL(timeMids).startOf('day').plus({ hours: 3.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStop = DateTime.fromSQL(shiftStart).startOf('day').plus({ hours: 27.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftDate = DateTime.fromSQL(shiftStop).startOf('day').toFormat('yyyy-MM-dd');
  let timeSpan = {};
  timeSpan.start = shiftStart;
  timeSpan.stop = shiftStop;
  timeSpan.shift = 1;
  dateHeader.innerHTML = `1st Shift: ${shiftDate}`;
  axios
    .post('/api/auth/manpower/get', timeSpan)
    .then((res) => {
      let tableData = res.data;
      man1 = new Tabulator('#manpower1', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Brewer', field: 'brewer', hozAlign: 'left', frozen: true },
          { title: 'Position', field: 'position', hozAlign: 'left' },
          { title: 'Note', field: 'note', hozAlign: 'left', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let man2;
function loadManpower2() {
  let dateHeader = document.getElementById('timeDays');
  timeDays = DateTime.fromSQL(timeNow).minus({ hours: 11.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStart = DateTime.fromSQL(timeDays).startOf('day').plus({ hours: 11.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStop = DateTime.fromSQL(shiftStart).startOf('day').plus({ hours: 35.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftDate = DateTime.fromSQL(shiftStop).startOf('day').toFormat('yyyy-MM-dd');
  let timeSpan = {};
  timeSpan.start = shiftStart;
  timeSpan.stop = shiftStop;
  timeSpan.shift = 2;
  dateHeader.innerHTML = `2nd Shift: ${shiftDate}`;
  axios
    .post('/api/auth/manpower/get', timeSpan)
    .then((res) => {
      let tableData = res.data;
      man2 = new Tabulator('#manpower2', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Brewer', field: 'brewer', hozAlign: 'left', frozen: true },
          { title: 'Position', field: 'position', hozAlign: 'left' },
          { title: 'Note', field: 'note', hozAlign: 'left', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let man3;
function loadManpower3() {
  let dateHeader = document.getElementById('timeAfts');
  let timeAfts = DateTime.fromSQL(timeNow).minus({ hours: 19.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStart = DateTime.fromSQL(timeAfts).startOf('day').plus({ hours: 19.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStop = DateTime.fromSQL(shiftStart).startOf('day').plus({ hours: 43.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftDate = DateTime.fromSQL(shiftStop).toFormat('yyyy-MM-dd');
  let timeSpan = {};
  timeSpan.start = shiftStart;
  timeSpan.stop = shiftStop;
  timeSpan.shift = 3;
  dateHeader.innerHTML = `3rd Shift: ${shiftDate}`;
  axios
    .post('/api/auth/manpower/get', timeSpan)
    .then((res) => {
      let tableData = res.data;
      man3 = new Tabulator('#manpower3', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Brewer', field: 'brewer', hozAlign: 'left', frozen: true },
          { title: 'Position', field: 'position', hozAlign: 'left' },
          { title: 'Note', field: 'note', hozAlign: 'left', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('btnBack').addEventListener('click', () => {
  window.history.back();
});
window.addEventListener('DOMContentLoaded', async (ev) => {
  reload();
});
