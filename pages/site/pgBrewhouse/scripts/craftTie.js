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
function loadCommodities() {
  const commodities = document.getElementsByName('addCommodity')[0];
  commodities.innerHTML = `<option value="" disabled selected hidden>Select Commodity</option>`;
  axios
    .post('/api/commodity/get/container/Super Sack', { active: true })
    .then((data) => {
      let commodity = data.data;
      return commodity.map((listItem) => {
        let commodity = createNode('option');
        commodity.innerHTML = listItem.commodity;
        commodity.id = listItem.commodity;

        append(commodities, commodity);
      });
    })
    .catch((err) => console.log(err));
}
let inventoryTable;
function inventoryList() {
  axios
    .post('/api/craft/tied/view')
    .then((res) => {
      let tableData = res.data;
      inventoryTable = new Tabulator('#invList', {
        resizableColumns: false,
        selectable: true,
        height: '330px',
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

// Add Form
document.getElementById('btnAddClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  document.getElementById('frmAdd').reset();
});

// Send
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd);
async function sendAdd(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  const form = document.getElementById('frmAdd');
  let data = {};
  let i;
  for (i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id;
    let name = form.elements[i].value;
    data[id] = name;
  }

  let fails = await validateAdd(data);
  console.log(data);
  if (fails.length === 0) {
    axios
      .post('/api/craft/ties/add/', data)
      .then((rtndata) => {
        let msg = `${data.count} ${data.com_id} Tied`;
        alert(msg);
        inventoryList();
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

// delete
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
    .delete('/api/craft/tied/inv/delete', { data: rowData[0] })
    .then((data) => {
      alert('Deleted');
      inventoryList();
    })
    .catch((err) => alert(err));
}

document.getElementById('btnBack').addEventListener('click', () => {
  window.history.back();
});
window.addEventListener('DOMContentLoaded', async (ev) => {
  loadCommodities();
  inventoryList();
});
