let DateTime = luxon.DateTime;

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
String.prototype.toNonAlpha = function (spaces) {
  if (spaces === '') {
    return this.replace(/[^\w\s]/gi, '').replace(/ +(?= )/g, '');
  } else {
    return this.replace(/[^0-9a-z]/gi, '');
  }
};
String.prototype.testNanFormat = function () {
  return /^\d+(\.\d{1,2})?$/.test(this);
};

function createNode(element) {
  return document.createElement(element);
}
function append(parent, e1) {
  return parent.appendChild(e1);
}
function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function createList(api, parent, title, data) {
  axios
    .post(api, data)
    .then((res) => {
      let list = res.data;
      list.forEach((elem) => {
        let listItem = elem[title];
        let option = createNode('option');
        option.innerHTML = listItem;
        append(parent, option);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
function createListRows(api, parent, title, data) {
  axios
    .post(api, data)
    .then((res) => {
      let list = res.data.rows;
      list.forEach((elem) => {
        let listItem = elem[title];
        let option = createNode('option');
        option.innerHTML = listItem;
        append(parent, option);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

// On window load
let api;
function setAPI() {
  let header = document.getElementById('invHeader');

  let current = DateTime.local().startOf('day').plus({ day: 1 }).toFormat('yyyy-MM-dd HH:mm');
  let month = DateTime.fromSQL(current).startOf('month').toFormat('yyyy-MM-dd HH:mm');
  let week = DateTime.fromSQL(current).startOf('week').toFormat('yyyy-MM-dd HH:mm');

  if (week === month) {
    api = '/api/inventory/hop/same/';
    header.innerHTML = 'Monthly/Weekly Inventory';
  } else if (month === current) {
    api = '/api/inventory/hop/monthly/';
    header.innerHTML = 'Monthly Inventory';
  } else {
    api = '/api/inventory/hop/weekly/';
    header.innerHTML = 'Weekly Inventory';
  }
}
function loadCommodities() {
  const commodities = document.getElementsByName('addCommodity')[0];
  commodities.innerHTML = `<option value="" disabled selected hidden>Select Commodity</option>`;
  axios
    .post('/api/commodity/get/type/hop', { active: false })
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
let commodityTable;
function commodityList() {
  axios
    .post('/api/commodity/get/type/hop', { active: false })
    .then((res) => {
      let tableData = res.data;

      commodityTable = new Tabulator('#list', {
        resizableColumns: false,
        height: '330px',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Commodity', field: 'commodity', hozAlign: 'left', frozen: true },
          { title: 'Location', field: 'location', hozAlign: 'left' },
          { title: 'Active', field: 'active', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let inventoryTable;
function inventoryList() {
  let data = {};
  data.startDate = DateTime.local().startOf('day').minus({ minutes: 30 }).toFormat('yyyy-MM-dd HH:mm');
  data.endDate = DateTime.local().endOf('day').minus({ minutes: 29 }).toFormat('yyyy-MM-dd HH:mm');
  axios
    .post(api + 'view', data)
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].created_at = DateTime.fromISO(res.data[i].created_at).toFormat('yyyy-MM-dd');
      }
      let tableData = res.data;
      inventoryTable = new Tabulator('#invList', {
        resizableColumns: false,
        selectable: true,
        height: '330px',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Commodity', field: 'commodity', hozAlign: 'center', frozen: true },
          { title: 'SAP', field: 'sap', hozAlign: 'center' },
          { title: 'Pounds', field: 'lbs', hozAlign: 'center' },
          { title: 'Lot', field: 'lot', hozAlign: 'center' },
          { title: 'Username', field: 'username', hozAlign: 'center' },
          { title: 'Date', field: 'created_at', hozAlign: 'center' },
          { title: 'Note', field: 'note', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err.detail));
}
function deleteOnLoad() {
  let data = {};
  data.startDate = DateTime.local().startOf('day').minus({ minutes: 30 }).toFormat('yyyy-MM-dd HH:mm');
  data.endDate = DateTime.local().endOf('day').minus({ minutes: 29 }).toFormat('yyyy-MM-dd HH:mm');
  axios
    .post(api + 'view', data)
    .then((res) => {
      res.data.forEach(async (item) => {
        setTimeout(() => {
          deleteRow(item.commodity);
        }, 5);
      });
    })
    .catch((err) => console.log(err));
}
function deleteRow(commodity) {
  commodityTable
    .getRows()
    .filter((row) => row.getData().commodity == commodity)
    .forEach((row) => row.delete());
}

// Add Form
document.getElementById('btnAddClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  document.getElementById('frmAdd').reset();
});
document.getElementById('com_id').addEventListener('change', selectCommodity);
async function selectCommodity() {
  let commodity = document.getElementById('com_id').value;
  loadForm(commodity);
  loadLots(commodity);
}
function loadForm(commodity) {
  axios.post('/api/commodity/name', { name: `${commodity}` }).then((data) => {
    document.getElementById('per_pallet').value = data.data.per_pallet;
    document.getElementById('per_unit').value = data.data.unit_total;
    document.getElementById('note').value = data.data.note;

    document.getElementById('pallet_count').value = '';
    document.getElementById('lbs').value = '';
    document.getElementById('lot').value = '';

    if (data.data.active === 'No') {
      let msg = `${data.data.commodity} is Active No.\nOnly Add to Inventory if Needed.`;
      alert(msg);
    }
  });
}
async function loadLots(commodity) {
  let dropDown = document.getElementById('lots');
  let api = '/api/inventory/hop/daily/lots';
  let data = { commodity: `${commodity}` };
  let title = 'lot';
  await removeChildren(dropDown);
  createListRows(api, dropDown, title, data);
}

// Send
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd);
async function sendAdd(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let data = await getData();

  let fails = await validateAdd(data);
  if (fails.length > 0) {
    alertProblems(fails);
    return;
  }

  send(data);
}
function getData() {
  const form = document.getElementById('frmAdd');
  let data = {};
  let i;
  for (i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id;
    let name = form.elements[i].value;
    data[id] = name;
  }
  return data;
}
function alertProblems(fails) {
  let msg = 'Problems:\n';
  for (i = 0; i < fails.length; i++) {
    msg = msg + '\n' + fails[i].input + ' ' + fails[i].msg;
  }
  alert(msg);
}
function send(data) {
  axios
    .post(api, data)
    .then(async (returnData) => {
      let msg = `${data.com_id}\n ${data.lbs} lbs\n lot: ${data.lot}\n Added to Inventory`;
      alert(msg);
      await inventoryList();
      deleteOnLoad();
      document.getElementById('frmAdd').reset();
    })
    .catch((err) => alert(err));
}
function validateAdd(data) {
  let failures = [];

  if (data.com_id === '') {
    failures.push({ input: 'commodity', msg: 'Required' });
    data.com_id = null;
  }
  if (data.per_pallet != '' && !data.per_pallet.testNanFormat()) {
    failures.push({ input: 'per pallet', msg: 'To 2 Decimals Only' });
  } else if (data.per_pallet == '') {
    data.per_pallet = 0;
  }
  if (data.pallet_count != '' && !data.pallet_count.testNanFormat()) {
    failures.push({ input: 'pallet count', msg: 'To 2 Decimals Only' });
  } else if (data.pallet_count == '') {
    data.pallet_count = 0;
  }
  if (data.per_unit != '' && !data.per_unit.testNanFormat()) {
    failures.push({ input: 'per unit', msg: 'To 2 Decimals Only' });
  } else if (data.per_unit == '') {
    data.per_unit = 0;
  }
  if (data.unit_count != '' && !data.unit_count.testNanFormat()) {
    failures.push({ input: 'unit count', msg: 'To 2 Decimals Only' });
  } else if (data.unit_count == '') {
    data.unit_count = 0;
  }
  if (data.lbs != '' && !data.lbs.testNanFormat()) {
    failures.push({ input: 'loose pounds', msg: 'To 2 Decimals Only' });
  } else if (data.lbs == '') {
    data.lbs = 0;
  }
  if (data.lot === '') {
    failures.push({ input: 'lot', msg: 'Required' });
    data.lot = null;
  } else {
    data.lot = data.lot.toNonAlpha().toUpperCase();
  }
  if (data.note != '') {
    data.note = data.note.toNonAlpha('').toProperCase();
  }

  data.lbs = (parseFloat(data.per_pallet) * parseFloat(data.pallet_count) + parseFloat(data.unit_count)) * parseFloat(data.per_unit) + parseFloat(data.lbs);
  delete data.pallet_count;
  delete data.per_pallet;
  delete data.per_unit;
  delete data.unit_count;
  if (data.lbs === 0) {
    failures.push({ input: 'ALERT', msg: 'No Pounds To Add' });
  }
  return failures;
}

// Delete
document.getElementById('btnDeleteInv').addEventListener('click', deleteRowInv);
async function deleteRowInv(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let selectedData = inventoryTable.getSelectedData();
  if (selectedData.length > 1) {
    alert('Can only delete 1 row at a time.');
    return;
  }

  if (!confirm(`Are you sure you want to delete\n\n ${selectedData[0].commodity} \n\nfrom the inventory?`)) {
    return;
  }
  await axios
    .delete(api, { data: selectedData[0] })
    .then((data) => {
      alert(data.data.msg);
    })
    .catch((err) => alert(err));

  await commodityList();
  await inventoryList();
  await deleteOnLoad();
}
function deleteSameInv() {}

document.getElementById('btnBack').addEventListener('click', () => {
  window.history.back();
});
window.addEventListener('DOMContentLoaded', async (ev) => {
  await setAPI();
  await loadCommodities();
  await commodityList();
  await inventoryList();
  await deleteOnLoad();
});
