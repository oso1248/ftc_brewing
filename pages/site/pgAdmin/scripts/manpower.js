let DateTime = luxon.DateTime;
let timeNow;

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

// View
function loadManpowerTables() {
  timeNow = DateTime.local().toFormat('yyyy-MM-dd HH:mm');
  loadMids();
  loadDays();
  loadAfts();
}
let midsTable;
function loadMids() {
  let dateHeader = document.getElementById('timeMids');
  timeMids = DateTime.fromSQL(timeNow).minus({ hours: 3.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStart = DateTime.fromSQL(timeMids).startOf('day').plus({ hours: 3.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStop = DateTime.fromSQL(shiftStart).startOf('day').plus({ hours: 27.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftDate = DateTime.fromSQL(shiftStop).startOf('day').toFormat('yyyy-MM-dd');
  dateHeader.innerHTML = `1st Shift: ${shiftDate}`;
  let timeSpan = {};
  timeSpan.start = shiftStart;
  timeSpan.stop = shiftStop;
  timeSpan.shift = 1;
  axios
    .post('/api/user/manpower/get', timeSpan)
    .then((res) => {
      let tableData = res.data;
      midsTable = new Tabulator('#tblMid', {
        resizableColumns: false,
        layoutColumnsOnNewData: true,
        selectable: 1,
        height: '330px',
        layout: 'fitDataFill',
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
let daysTable;
function loadDays() {
  let dateHeader = document.getElementById('timeDays');
  timeDays = DateTime.fromSQL(timeNow).minus({ hours: 11.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStart = DateTime.fromSQL(timeDays).startOf('day').plus({ hours: 11.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStop = DateTime.fromSQL(shiftStart).startOf('day').plus({ hours: 35.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftDate = DateTime.fromSQL(shiftStop).startOf('day').toFormat('yyyy-MM-dd');
  dateHeader.innerHTML = `2nd Shift: ${shiftDate}`;
  let timeSpan = {};
  timeSpan.start = shiftStart;
  timeSpan.stop = shiftStop;
  timeSpan.shift = 2;
  axios
    .post('/api/user/manpower/get', timeSpan)
    .then((res) => {
      let tableData = res.data;
      daysTable = new Tabulator('#tblDay', {
        resizableColumns: false,
        layoutColumnsOnNewData: true,
        selectable: 1,
        height: '330px',
        layout: 'fitDataFill',
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
let aftsTable;
function loadAfts() {
  let dateHeader = document.getElementById('timeAfts');
  let timeAfts = DateTime.fromSQL(timeNow).minus({ hours: 19.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStart = DateTime.fromSQL(timeAfts).startOf('day').plus({ hours: 19.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftStop = DateTime.fromSQL(shiftStart).startOf('day').plus({ hours: 43.5 }).toFormat('yyyy-MM-dd HH:mm');
  let shiftDate = DateTime.fromSQL(shiftStop).startOf('day').toFormat('yyyy-MM-dd');
  dateHeader.innerHTML = `3rd Shift: ${shiftDate}`;
  let timeSpan = {};
  timeSpan.start = shiftStart;
  timeSpan.stop = shiftStop;
  timeSpan.shift = 3;
  axios
    .post('/api/user/manpower/get', timeSpan)
    .then((res) => {
      let tableData = res.data;
      aftsTable = new Tabulator('#tblAft', {
        resizableColumns: false,
        layoutColumnsOnNewData: true,
        selectable: 1,
        height: '330px',
        layout: 'fitDataFill',
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

// Add
document.getElementById('btnManAddSubmit').addEventListener('click', sendManpower);
async function sendManpower(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  var form = document.getElementById('frmManpower');
  let data = {};
  for (let i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id;
    let name = form.elements[i].value.toProperCase();
    data[id] = name;
  }

  let fails = await validateManpowerAdd(data);
  if (fails.length === 0) {
    axios
      .post('/api/user/manpower/add', data)
      .then((data) => {
        loadManpowerTables();
        alert(`${data.data[0].brewer} Sent To ${data.data[0].position}`);
        document.getElementById('frmManpower').reset();
      })
      .catch((err) => alert(err));
  } else {
    let msg = 'Problems:\n';
    for (i = 0; i < fails.length; i++) {
      msg = msg + '\n' + fails[i]['input'] + ' ' + fails[i]['msg'];
    }
    alert(msg);
  }
}
async function validateManpowerAdd(data) {
  let failures = [];
  if (data.brewer === '') {
    failures.push({ input: 'brewer', msg: 'Required Field' });
    data.brewer = null;
  }
  if (data.position === '') {
    failures.push({ input: 'position', msg: 'Required Field' });
    data.position = null;
  }
  if (data.shift === '') {
    failures.push({ input: 'shift', msg: 'Required Field' });
    data.shift = null;
  }
  return failures;
}

document.getElementById('btnManAddClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('frmManpower').reset();
});

// Delete
document.getElementById('deleteMid').addEventListener('click', deleteMids);
function deleteMids() {
  let data = midsTable.getSelectedData();
  deleteById(data);
}
document.getElementById('deleteDay').addEventListener('click', deleteDays);
function deleteDays() {
  let data = daysTable.getSelectedData();
  deleteById(data);
}
document.getElementById('deleteAft').addEventListener('click', deleteAfts);
function deleteAfts() {
  let data = aftsTable.getSelectedData();
  deleteById(data);
}

function deleteById(data) {
  axios
    .delete('/api/user/manpower/delete', { data: data[0] })
    .then((res) => {
      alert(`${res.data[0].brewer} Deleted`);
      loadManpowerTables();
    })
    .catch((err) => alert(err));
}

document.getElementById('btnBack').addEventListener('click', () => {
  window.history.back();
});

window.addEventListener('DOMContentLoaded', async () => {
  loadManpowerTables();
});
