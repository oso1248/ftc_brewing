document.getElementById('addBoxes').style.display = 'none';
document.getElementById('updateBoxes').style.display = 'none';
document.getElementById('deleteBoxes').style.display = 'none';
document.getElementById('attView').style.display = 'none';

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
function createList(api, parent, title) {
  axios
    .post(api)
    .then((res) => {
      let list = res.data;
      list.forEach((elem) => {
        let listItem = elem[title];
        let option = createNode('option');
        option.innerHTML = listItem;
        // option.id = listItem
        append(parent, option);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
function createListCommodity(api, parent, title) {
  axios
    .post(api, { active: false })
    .then((res) => {
      let list = res.data;
      list.forEach((elem) => {
        let listItem = elem[title];
        let option = createNode('option');
        option.innerHTML = listItem;
        // option.id = listItem
        append(parent, option);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
function createListID(api, parent, title) {
  axios
    .post(api)
    .then((res) => {
      let list = res.data;
      list.forEach((elem) => {
        let listItem = elem[title];
        let option = createNode('option');
        option.innerHTML = listItem;
        option.id = listItem;
        append(parent, option);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

// Add
document.getElementById('add').onclick = add;
function add() {
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('deleteBoxes').style.display = 'none';
  document.getElementById('attView').style.display = 'none';
  document.getElementById('addBoxes').style.display = 'block';

  let dropDown = document.getElementById('supplier_id');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Supplier</option>`;
  let api = '/api/supplier/name/all';
  let title = 'company';
  createList(api, dropDown, title);

  dropDown = document.getElementById('location_id');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Location</option>`;
  api = '/api/location/all';
  title = 'location';
  createList(api, dropDown, title);

  dropDown = document.getElementById('type_id');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Type</option>`;
  api = '/api/type/all';
  title = 'type';
  createList(api, dropDown, title);

  dropDown = document.getElementById('container_id');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Container</option>`;
  api = '/api/container/all';
  title = 'container';
  createList(api, dropDown, title);

  dropDown = document.getElementById('enviro_id');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Environmental</option>`;
  api = '/api/enviro/all';
  title = 'enviro';
  createList(api, dropDown, title);

  dropDown = document.getElementById('uom_id');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select UOM</option>`;
  api = '/api/uom/all';
  title = 'uom';
  createList(api, dropDown, title);
}
document.getElementById('btnAddClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('frmAdd').reset();
});
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
  if (fails.length === 0) {
    axios
      .post('/api/commodity', data)
      .then((data) => {
        alert(data.data.commodity + ' has been added');
        document.getElementById('frmAdd').reset();
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
async function validateAdd(data) {
  let failures = [];
  data.commodity = data.commodity.toNonAlpha('').toProperCase();

  if (!data.commodity) {
    failures.push({ input: 'commodity', msg: 'Taken' });
  } else {
    let query = '/api/commodity/name';
    let res = await axios.post(query, { name: data.commodity }).catch((err) => alert(err));
    if (res.data.msg !== 'null') {
      failures.push({ input: 'commodity', msg: 'Taken' });
    }
  }

  if (data.sap === '') {
    failures.push({ input: 'sap', msg: 'Required' });
    data.sap = null;
  } else {
    data.sap = data.sap.toNonAlpha();
  }

  if (data.active === '') {
    failures.push({ input: 'active', msg: 'Required' });
    data.active = null;
  }

  if (data.inventory === '') {
    failures.push({ input: 'inventory', msg: 'Required' });
    data.inventory = null;
  }
  if (data.location_id === '') {
    failures.push({ input: 'location', msg: 'Required' });
    data.location_id = null;
  }
  if (data.supplier_id === '') {
    failures.push({ input: 'supplier', msg: 'Required' });
    data.supplier_id = null;
  }
  if (data.type_id === '') {
    failures.push({ input: 'type', msg: 'Required' });
    data.type_id = null;
  }
  if (data.container_id === '') {
    failures.push({ input: 'container', msg: 'Required' });
    data.container_id = null;
  }
  if (data.enviro_id === '') {
    failures.push({ input: 'enviro', msg: 'Required' });
    data.enviro_id = null;
  }

  if (data.threshold === '') {
    failures.push({ input: 'threshold', msg: 'Required' });
    data.threshold = null;
  } else if (!data.threshold.testNanFormat()) {
    failures.push({ input: 'threshold', msg: 'To 2 Decimals Only' });
    data.threshold = null;
  }

  if (data.per_pallet === '') {
    failures.push({ input: 'pallet', msg: 'Required' });
    data.per_pallet = null;
  } else if (!data.per_pallet.testNanFormat()) {
    failures.push({ input: 'pallet', msg: 'To 2 Decimals Only' });
    data.per_pallet = null;
  }

  if (data.unit_total === '') {
    failures.push({ input: 'unit', msg: 'Required' });
    data.unit_total = null;
  } else if (!data.unit_total.testNanFormat()) {
    failures.push({ input: 'unit total', msg: 'To 2 Decimals Only' });
  }

  if (data.uom_id === '') {
    failures.push({ input: 'uom', msg: 'Required' });
    data.uom_id = null;
  }
  return failures;
}

// Update
document.getElementById('update').onclick = update;
function update() {
  document.getElementById('deleteBoxes').style.display = 'none';
  document.getElementById('attView').style.display = 'none';
  document.getElementById('addBoxes').style.display = 'none';
  document.getElementById('updateBoxes').style.display = 'grid';

  let dropDown = document.getElementsByName('updateCommodity')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Commodity</option>`;
  let api = '/api/commodity/get';
  let title = 'commodity';
  createListCommodity(api, dropDown, title);

  dropDown = document.getElementsByName('updateSupplier_id')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Supplier</option>`;
  api = '/api/supplier/name/all';
  title = 'company';
  createListID(api, dropDown, title);

  dropDown = document.getElementsByName('updateLocation_id')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Location</option>`;
  api = '/api/location/all';
  title = 'location';
  createListID(api, dropDown, title);

  dropDown = document.getElementsByName('updateType_id')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Type</option>`;
  api = '/api/type/all';
  title = 'type';
  createListID(api, dropDown, title);

  dropDown = document.getElementsByName('updateContainer_id')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Container</option>`;
  api = '/api/container/all';
  title = 'container';
  createListID(api, dropDown, title);

  dropDown = document.getElementsByName('updateEnviro_id')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Environmental</option>`;
  api = '/api/enviro/all';
  title = 'enviro';
  createListID(api, dropDown, title);

  dropDown = document.getElementsByName('updateUom_id')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select UOM</option>`;
  api = '/api/uom/all';
  title = 'uom';
  createListID(api, dropDown, title);
}
document.getElementById('btnUpdateClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('frmUpdate').reset();
});
document.getElementsByName('updateCommodity')[0].addEventListener('change', selectCommodity);
function selectCommodity() {
  let commodity = document.getElementsByName('updateCommodity')[0].value;

  axios
    .post('/api/commodity/name', { name: `${commodity}` })
    .then((data) => {
      document.getElementById(data.data.location).selected = 'selected';
      document.getElementById(data.data.type).selected = 'selected';
      document.getElementById(data.data.company).selected = 'selected';
      document.getElementById(data.data.enviro).selected = 'selected';
      document.getElementById(data.data.container).selected = 'selected';
      document.getElementById(data.data.uom).selected = 'selected';
      document.getElementById(data.data.inventory).selected = 'selected';
      document.getElementsByName('updateSap')[0].value = data.data.sap;
      document.getElementsByName('updateActive')[0].value = data.data.active;
      document.getElementsByName('updateThreshold')[0].value = data.data.threshold;
      document.getElementsByName('updatePer_pallet')[0].value = data.data.per_pallet;
      document.getElementsByName('updateUnit_total')[0].value = data.data.unit_total;
      document.getElementsByName('updateNote')[0].value = data.data.note;
    })
    .catch((err) => alert(err));
}
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate);
async function sendUpdate(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let form = document.getElementById('frmUpdate');
  let data = {};
  let i;
  for (i = 1; i < form.length - 2; i++) {
    let id = form.elements[i].id;
    let name = form.elements[i].value;
    data[id] = name;
  }
  let fails = await validateUpdate(data);
  if (fails.length === 0) {
    let name = document.getElementsByName('updateCommodity')[0].value;
    axios
      .patch('/api/commodity/' + name, data)
      .then((data) => {
        alert(data.data.commodity + ' updated');
        document.getElementById('frmUpdate').reset();
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
function validateUpdate(data) {
  let failures = [];

  let name = document.getElementsByName('updateCommodity')[0].value;
  if (name === '') {
    failures.push({ input: 'commodity', msg: 'Required' });
  }

  if (data.sap === '') {
    failures.push({ input: 'sap', msg: 'Required' });
  } else {
    data.sap = data.sap.toNonAlpha();
  }

  if (data.active === '') {
    failures.push({ input: 'active', msg: 'Required' });
    data.active = null;
  }
  if (data.inventory === '') {
    failures.push({ input: 'inventory', msg: 'Required' });
    data.inventory = null;
  }
  if (data.location_id === '') {
    failures.push({ input: 'location', msg: 'Required' });
    data.location_id = null;
  }
  if (data.supplier_id === '') {
    failures.push({ input: 'supplier', msg: 'Required' });
    data.supplier_id = null;
  }
  if (data.type_id === '') {
    failures.push({ input: 'type', msg: 'Required' });
    data.type_id = null;
  }
  if (data.container_id === '') {
    failures.push({ input: 'container', msg: 'Required' });
    data.container_id = null;
  }
  if (data.enviro_id === '') {
    failures.push({ input: 'enviro', msg: 'Required' });
    data.enviro_id = null;
  }

  if (data.threshold === '') {
    failures.push({ input: 'threshold', msg: 'Required' });
    data.threshold = null;
  } else if (!data.threshold.testNanFormat()) {
    failures.push({ input: 'threshold', msg: 'To 2 Decimals Only' });
    data.threshold = null;
  }

  if (data.per_pallet === '') {
    failures.push({ input: 'pallet', msg: 'Required' });
    data.per_pallet = null;
  } else if (!data.per_pallet.testNanFormat()) {
    failures.push({ input: 'pallet', msg: 'To 2 Decimals Only' });
    data.per_pallet = null;
  }

  if (data.unit_total === '') {
    failures.push({ input: 'unit', msg: 'Required' });
    data.unit_total = null;
  } else if (!data.unit_total.testNanFormat()) {
    failures.push({ input: 'unit total', msg: 'To 2 Decimals Only' });
  }

  if (data.uom_id === '') {
    failures.push({ input: 'uom', msg: 'Required' });
    data.uom_id = null;
  }
  return failures;
}

// View
document.getElementById('view').onclick = view;
function view() {
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('deleteBoxes').style.display = 'none';
  document.getElementById('attView').style.display = 'block';
  document.getElementById('addBoxes').style.display = 'none';

  loadView();

  // document.getElementById('list').style.display='block'
}
let commodityTable;
function loadView() {
  axios
    .post('/api/commodity/get', { active: false })
    .then((res) => {
      let tableData = res.data;

      commodityTable = new Tabulator('#list', {
        printHeader: '<h1>Commodity List<h1>',
        resizableColumns: false,
        height: '330px',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          {
            title: 'Commodity',
            field: 'commodity',
            hozAlign: 'center',
            frozen: true,
          },
          { title: 'SAP', field: 'sap', hozAlign: 'center' },
          { title: 'Active', field: 'active', hozAlign: 'center' },
          { title: 'Inventory', field: 'inventory', hozAlign: 'center' },
          { title: 'Location', field: 'location', hozAlign: 'center' },
          { title: 'Company', field: 'company', hozAlign: 'center' },
          { title: 'Type', field: 'type', hozAlign: 'center' },
          { title: 'Container', field: 'container', hozAlign: 'center' },
          { title: 'Environmental', field: 'enviro', hozAlign: 'center' },
          { title: 'Threshold', field: 'threshold', hozAlign: 'center' },
          { title: 'Per Pallet', field: 'per_pallet', hozAlign: 'center' },
          { title: 'Unit Total', field: 'unit_total', hozAlign: 'center' },
          { title: 'UOM', field: 'uom', hozAlign: 'center' },
          { title: 'Note', field: 'note', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('download-xlsx').addEventListener('click', () => {
  commodityTable.download('xlsx', 'commodities.xlsx', {
    sheetName: 'Commodities',
  });
});
document.getElementById('print-table').addEventListener('click', () => {
  commodityTable.print(false, true);
});
