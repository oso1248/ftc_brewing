let trailerFull = document.getElementById('trailerFull');
let trailerNone = document.getElementById('trailerNone');
trailerFull.style.display = 'none';
trailerNone.style.display = 'none';

function setCookie(cookieName, cookieValue, hoursToExpire, path, domain) {
  let date = new Date();
  date.setTime(date.getTime() + hoursToExpire * 60 * 1000);
  document.cookie = cookieName + '=' + cookieValue + '; expires=' + date.toGMTString() + 'path=' + path + 'domain=' + domain;
}
function getCookie(cookieName) {
  var cookieValue = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}
function deleteCookie(cookieName) {
  document.cookie = cookieName + '=; max-age=0; expires=0';
}

String.prototype.testNanFormat = function () {
  return /^[1-9]\d*$/.test(this);
};

function createNode(element) {
  return document.createElement(element);
}
function append(parent, e1) {
  return parent.appendChild(e1);
}

// On window load
let trailerNumber;
function loadCommodities() {
  const commodities = document.getElementsByName('addCommodity')[0];
  commodities.innerHTML = `<option value="" disabled selected hidden>Select Commodity</option>`;
  axios
    .post('/api/commodity/get', { active: true })
    .then((data) => {
      let commodity = data.data;
      return commodity.map((listItem) => {
        let commodity = createNode('option');
        commodity.innerHTML = listItem.commodity;
        commodity.id = listItem.commodity;

        append(commodities, commodity);
      });
    })
    .catch((err) => console.log(err.detail));
}

// trailer
document.getElementById('btnTrailerFullAddNew').addEventListener('click', startNewTrailer);
document.getElementById('btnTrailerNoneAddNew').addEventListener('click', startNewTrailer);
async function startNewTrailer() {
  let trailerNumber = await addTrailer();
  setCookie('trailerNo', trailerNumber, 3);
  inventoryList(trailerNumber);
  trailerNone.style.display = 'none';
}
function startPreviousTrailer(trailerNo) {
  setCookie('trailerNo', trailerNo, 3);
  checkTrailerFull(trailerNo);
  inventoryList(trailerNo);
}

function checkPreviousTrailer() {
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
function addTrailer() {
  return axios
    .post('/api/craft/trailer/add/')
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err.detail));
}
function checkTrailerFull() {
  let id = getCookie('trailerNo');
  axios
    .post('/api/craft/trailer/count', { trailer_id: id })
    .then((res) => {
      res = res.data.rows[0].total;
      if (res >= 22) {
        trailerFull.style.display = 'block';
      } else {
        trailerFull.style.display = 'none';
      }
    })
    .catch((err) => console.log(err));
}
function noTrailer(trailerStaged) {
  if ((trailerStaged = 'no trailer')) {
    trailerNone.style.display = 'block';
  } else {
    trailerNone.style.display = 'none';
  }
}
document.getElementById('btnDeleteInv').addEventListener('click', deleteRowInv);
async function deleteRowInv(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let rowData = inventoryTable.getSelectedData();

  if (rowData.length > 1) {
    alert('Can only delete from 1 row at a time.');
    return;
  }

  let pass = false;
  let count;
  do {
    let promptCount = window.prompt(`Please enter a whole number from 1 to ${rowData[0].count}`, '');
    if (promptCount === null) {
      return;
    }
    promptCount = parseInt(promptCount);
    if (promptCount !== promptCount || !/^[1-9]\d*$/.test(promptCount) || promptCount < 0 || promptCount > parseInt(rowData[0].count)) {
      alert(`Entry must be a whole number from 1 to ${rowData[0].count}`);
    } else if (/^[1-9]\d*$/.test(promptCount) && promptCount > 0 && promptCount <= parseInt(rowData[0].count)) {
      pass = true;
      count = promptCount;
      rowData[0].count = count;
    }
  } while (!pass);

  if (!confirm(`Delete\n\n${count}   ${rowData[0].commodity} \n\nfrom trailer?`)) {
    return;
  }

  await axios
    .delete('/api/craft/trailer/inv/delete', { data: rowData[0] })
    .then(async (data) => {
      alert('Deleted');
      await checkTrailerFull(trailerNumber);
      await inventoryList(trailerNumber);
    })
    .catch((err) => alert(err));
}

// trailer inv table
let inventoryTable;
function inventoryList() {
  let id = getCookie('trailerNo');
  axios
    .post('/api/craft/trailer/inv/view/' + id)
    .then((res) => {
      let tableData = res.data.rows;
      inventoryTable = new Tabulator('#invList', {
        resizableColumns: false,
        selectable: true,
        height: '330px',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Commodity', field: 'commodity', hozAlign: 'left', frozen: true },
          { title: 'Count', field: 'count', hozAlign: 'left' },
          { title: 'Container', field: 'container', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}

// Add form
document.getElementById('btnAddClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  document.getElementById('frmAdd').reset();
});
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd);
async function sendAdd(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  const form = document.getElementById('frmAdd');
  let data = {};
  let i;
  for (i = 2; i < form.length - 2; i++) {
    let id = form.elements[i].id;
    let name = form.elements[i].value;
    data[id] = name;
    data.trailer_id = getCookie('trailerNo');
  }

  let fails = await validateAdd(data);

  if (fails.length === 0) {
    axios
      .post('/api/craft/trailer/inv/add', data)
      .then((data) => {
        let msg = `Added to trailer`;
        alert(msg);
        checkTrailerFull(trailerNumber);
        inventoryList(trailerNumber);
        document.getElementById('frmAdd').reset();
      })
      .catch((err) => alert(err));
  } else {
    let msg = 'Problems:\n';
    for (i = 0; i < fails.length; i++) {
      msg = msg + '\n' + fails[i].input + ' ' + fails[i].msg;
    }
    alert(msg);
  }
}
function validateAdd(data) {
  let failures = [];

  if (data.com_id === '') {
    failures.push({ input: 'commodity', msg: 'Required' });
    data.com_id = null;
  }
  if (data.count == '') {
    failures.push({ input: 'Count', msg: 'Required' });
  } else if (!data.count.testNanFormat()) {
    failures.push({ input: 'Count', msg: 'Positive Whole Numbers Only' });
  }

  return failures;
}

document.getElementById('btnBack').addEventListener('click', () => {
  window.history.back();
});
window.addEventListener('DOMContentLoaded', async () => {
  loadCommodities();
  let trailerCookie = getCookie('trailerNo');
  let check = await checkPreviousTrailer();

  if (check && trailerCookie) {
    startPreviousTrailer(trailerCookie);
  } else if (check && confirm(`Previous Trailer Found\n\nContinue Loading?`)) {
    startPreviousTrailer(check);
  } else if (confirm(`Start New Trailer?`)) {
    startNewTrailer();
  } else {
    noTrailer('no trailer');
  }
});
