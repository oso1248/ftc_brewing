document.getElementById('updateBoxes').style.display = 'none';
document.getElementById('viewBoxes').style.display = 'none';

function createNode(element) {
  return document.createElement(element);
}
function append(parent, e1) {
  return parent.appendChild(e1);
}
function createListBrwBrand(api, parent, title) {
  axios
    .post(api, { active: false })
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
function convert2(obj) {
  let json = {};
  let data = [];
  let i = 1;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      json = {};
      json['id'] = i;
      json['db'] = Object.keys(obj)[i - 1];
      json['object'] = key;
      json['method'] = obj[key];
      data.push(json);
      i++;
    }
  }
  return data;
}
function convert(obj, labels) {
  // console.log(obj)
  let id = obj.id;
  delete obj['id'];
  let json = {};
  let data = [];
  let i = 0;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      json = {};
      json['id'] = i;
      json['id_brnd'] = id;
      json['db'] = key;
      json['object'] = labels[i];
      json['method'] = obj[key];
      data.push(json);
      i++;
    }
  }
  // console.log(data)
  return data;
}
function convertBrand(obj) {
  let json = {};
  let data = [];
  let i = 1;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      json = {};
      json['brand'] = key;
      json['active'] = obj[key];
      data.push(json);
    }
  }
  return data;
}

// Update
document.getElementById('add').onclick = updateView;
function updateView() {
  document.getElementById('viewBoxes').style.display = 'none';
  document.getElementById('updateBoxes').style.display = 'block';

  document.getElementById('updateLineageBox').style.display = 'none';

  let dropDown = document.getElementById('brwBrandUpdate');
  let api = '/api/brand/fin/get/';
  let title = 'brndFin';
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Finishing Brand</option>`;
  createListBrwBrand(api, dropDown, title);
}
document.getElementById('btnUpdateClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('frmUpdate').reset();
  if (tableUpdateBrandLineage) {
    tableUpdateBrandLineage.clearData();
    tableUpdateFinDetailPreCsx.clearData();
    tableUpdateFinDetailPostCsx.clearData();
    tableUpdateFinDetailPreFil.clearData();
    tableUpdateFinDetailPostFil.clearData();
    tableUpdateFinDetailPreRel.clearData();
    tableUpdateFinDetailPostRel.clearData();
  }
});
document.getElementById('brwBrandUpdate').addEventListener('change', selectUpdate);
async function selectUpdate() {
  document.getElementById('updateLineageBox').style.display = 'block';
  let methods = await method();
  await updateBrandLineage();
  let data = tableUpdateBrandLineage.getData()[0];
  await updateFinDetailPreCsx(data.brndBrw, methods);
  await updateFinDetailPostCsx(data.brndBrw, methods);
  await updateFinDetailPreFil(data.brndFin, methods);
  await updateFinDetailPostFil(data.brndFin, methods);
  await updateFinDetailPreRel(data.brndFin, methods);
  await updateFinDetailPostRel(data.brndFin, methods);
}
async function method() {
  let res = await axios
    .post('/api/brand/method/cold')
    .then((res) => {
      let data = res.data;
      let json = {};
      for (let i = 0; i < data.length; i++) {
        json[data[i].method] = data[i].method;
      }
      return json;
    })
    .catch((err) => console.log(err));
  return res;
}
let tableUpdateBrandLineage;
async function updateBrandLineage() {
  let name = document.getElementById('brwBrandUpdate').value;
  await axios
    .post('/api/brand/fin/get/name', { name: name })
    .then((res) => {
      let tableData = [res.data];
      tableUpdateBrandLineage = new Tabulator('#updateLineageTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: false,
        data: tableData,
        columns: [
          { title: 'Schoene', field: 'brndBrw', hozAlign: 'center', frozen: true },
          { title: 'Finished', field: 'brndFin', hozAlign: 'center' },
          { title: 'Package', field: 'brndPck', hozAlign: 'center' },
          { title: 'Active', field: 'active', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableUpdateFinDetailPreCsx;
async function updateFinDetailPreCsx(name, method) {
  let header = document.getElementById('preCsxHeader');
  header.innerHTML = `Pre CSX Brand: ${name}`;
  await axios
    .post('/api/brand/detail/csxpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableUpdateFinDetailPreCsx = new Tabulator('#updateFinDetailPreCsxTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: false,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: 'autocomplete', editorParams: { showListOnEmpty: true, freetext: true, values: method }, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('updateFinDetailPreCsxTableBtn').addEventListener('click', async (ev) => {
  ev.preventDefault();
  ev.stopPropagation();

  let tableData = tableUpdateFinDetailPreCsx.getData();
  tableData.pop();
  await axios
    .patch('/api/brand/detail/csxpre/update', tableData)
    .then((data) => {
      selectUpdate();
      alert(`${data.data[0].updated_by} Updated CSX Pre`);
    })
    .catch((err) => alert(err));
});

let tableUpdateFinDetailPostCsx;
async function updateFinDetailPostCsx(name, method) {
  let header = document.getElementById('postCsxHeader');
  header.innerHTML = `Post CSX Brand: ${name}`;
  await axios
    .post('/api/brand/detail/csxpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableUpdateFinDetailPostCsx = new Tabulator('#updateFinDetailPostCsxTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: false,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: 'autocomplete', editorParams: { showListOnEmpty: true, freetext: true, values: method }, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('updateFinDetailPostCsxTableBtn').addEventListener('click', async (ev) => {
  ev.preventDefault();
  ev.stopPropagation();

  let tableData = tableUpdateFinDetailPostCsx.getData();
  tableData.pop();
  await axios
    .patch('/api/brand/detail/csxpost/update', tableData)
    .then((data) => {
      selectUpdate();
      alert(`${data.data[0].updated_by} Updated CSX Post`);
    })
    .catch((err) => alert(err));
});

let tableUpdateFinDetailPreFil;
async function updateFinDetailPreFil(name, method) {
  let header = document.getElementById('preFltrHeader');
  header.innerHTML = `Pre Filter Brand: ${name}`;
  await axios
    .post('/api/brand/detail/filpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableUpdateFinDetailPreFil = new Tabulator('#updateFinDetailPreFilTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: false,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: 'autocomplete', editorParams: { showListOnEmpty: true, freetext: true, values: method }, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('updateFinDetailPreFilTableBtn').addEventListener('click', async (ev) => {
  ev.preventDefault();
  ev.stopPropagation();

  let tableData = tableUpdateFinDetailPreFil.getData();
  tableData.pop();
  await axios
    .patch('/api/brand/detail/fltrpre/update', tableData)
    .then((data) => {
      selectUpdate();
      alert(`${data.data[0].updated_by} Updated Filter Pre`);
    })
    .catch((err) => alert(err));
});

let tableUpdateFinDetailPostFil;
async function updateFinDetailPostFil(name, method) {
  let labels = ['Brand', 'Schoene Tank', 'System', 'Trap', 'Filter Beer Tank', 'Recover', 'Note'];
  let header = document.getElementById('postFltrHeader');
  header.innerHTML = `Post Filter Brand: ${name}`;
  await axios
    .post('/api/brand/detail/filpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableUpdateFinDetailPostFil = new Tabulator('#updateFinDetailPostFilTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: 'autocomplete', editorParams: { showListOnEmpty: true, freetext: true, values: method }, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('updateFinDetailPostFilTableBtn').addEventListener('click', async (ev) => {
  ev.preventDefault();
  ev.stopPropagation();

  let tableData = tableUpdateFinDetailPostFil.getData();
  tableData.pop();
  await axios
    .patch('/api/brand/detail/fltrpost/update', tableData)
    .then((data) => {
      selectUpdate();
      alert(`${data.data[0].updated_by} Updated Filter Post`);
    })
    .catch((err) => alert(err));
});

let tableUpdateFinDetailPreRel;
async function updateFinDetailPreRel(name, method) {
  let header = document.getElementById('preRelHeader');
  header.innerHTML = `Pre Release Brand: ${name}`;
  await axios
    .post('/api/brand/detail/relpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableUpdateFinDetailPreRel = new Tabulator('#updateFinDetailPreRelTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: false,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: 'autocomplete', editorParams: { showListOnEmpty: true, freetext: true, values: method }, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('updateFinDetailPreRelTableBtn').addEventListener('click', async (ev) => {
  ev.preventDefault();
  ev.stopPropagation();

  let tableData = tableUpdateFinDetailPreRel.getData();
  tableData.pop();
  await axios
    .patch('/api/brand/detail/relpre/update', tableData)
    .then((data) => {
      selectUpdate();
      alert(`${data.data[0].updated_by} Updated Release Post`);
    })
    .catch((err) => alert(err));
});

let tableUpdateFinDetailPostRel;
async function updateFinDetailPostRel(name, method) {
  let header = document.getElementById('postRelHeader');
  header.innerHTML = `Pre Release Brand: ${name}`;
  await axios
    .post('/api/brand/detail/relpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableUpdateFinDetailPostRel = new Tabulator('#updateFinDetailPostRelTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: false,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: 'autocomplete', editorParams: { showListOnEmpty: true, freetext: true, values: method }, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('updateFinDetailPostRelTableBtn').addEventListener('click', async (ev) => {
  ev.preventDefault();
  ev.stopPropagation();

  let tableData = tableUpdateFinDetailPostRel.getData();
  tableData.pop();
  await axios
    .patch('/api/brand/detail/relpost/update', tableData)
    .then((data) => {
      selectUpdate();
      alert(`${data.data[0].updated_by} Updated Release Post`);
    })
    .catch((err) => alert(err));
});

// view
document.getElementById('update').onclick = viewView;
function viewView() {
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('viewBoxes').style.display = 'block';
  document.getElementById('viewLineageBox').style.display = 'none';

  let api = '/api/brand/fin/get/';
  let title = 'brndFin';
  let dropDown = document.getElementById('brwBrandView');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Finishing Brand</option>`;
  createListBrwBrand(api, dropDown, title);
}
document.getElementById('btnViewClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('frmView').reset();
  if (tableViewBrandLineage) {
    tableViewBrandLineage.clearData();
    tableViewFinDetailPreCsx.clearData();
    tableViewFinDetailPostCsx.clearData();
    tableViewFinDetailPreFil.clearData();
    tableViewFinDetailPostFil.clearData();
    tableViewFinDetailPreRel.clearData();
    tableViewFinDetailPostRel.clearData();
  }
});
document.getElementById('brwBrandView').addEventListener('change', selectView);
async function selectView() {
  document.getElementById('viewLineageBox').style.display = 'block';

  await viewBrandLineage();
  let data = tableViewBrandLineage.getData()[0];
  await viewFinDetailPreCsx(data.brndBrw);
  await viewFinDetailPostCsx(data.brndBrw);
  await viewFinDetailPreFil(data.brndFin);
  await viewFinDetailPostFil(data.brndFin);
  await viewFinDetailPreRel(data.brndFin);
  await viewFinDetailPostRel(data.brndFin);
}
let tableViewBrandLineage;
async function viewBrandLineage() {
  let name = document.getElementById('brwBrandView').value;
  await axios
    .post('/api/brand/fin/get/name', { name: name })
    .then((res) => {
      let tableData = [res.data];
      tableViewBrandLineage = new Tabulator('#viewLineageTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: false,
        data: tableData,
        columns: [
          { title: 'Schoene', field: 'brndBrw', hozAlign: 'left', frozen: true },
          { title: 'Finished', field: 'brndFin', hozAlign: 'left' },
          { title: 'Package', field: 'brndPck', hozAlign: 'left' },
          { title: 'Active', field: 'active', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableViewFinDetailPreCsx;
async function viewFinDetailPreCsx(name) {
  await axios
    .post('/api/brand/detail/csxpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableViewFinDetailPreCsx = new Tabulator('#viewFinDetailPreCsxTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'left', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', formatter: 'textarea' },
          { title: 'Notes', field: 'notes', hozAlign: 'left', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableViewFinDetailPostCsx;
async function viewFinDetailPostCsx(name) {
  await axios
    .post('/api/brand/detail/csxpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableViewFinDetailPostCsx = new Tabulator('#viewFinDetailPostCsxTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: 'autocomplete', editorParams: { showListOnEmpty: true, freetext: true, values: method }, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableViewFinDetailPreFil;
async function viewFinDetailPreFil(name) {
  await axios
    .post('/api/brand/detail/filpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableViewFinDetailPreFil = new Tabulator('#viewFinDetailPreFilTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: 'autocomplete', editorParams: { showListOnEmpty: true, freetext: true, values: method }, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableViewFinDetailPostFil;
async function viewFinDetailPostFil(name) {
  await axios
    .post('/api/brand/detail/filpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableViewFinDetailPostFil = new Tabulator('#viewFinDetailPostFilTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: 'autocomplete', editorParams: { showListOnEmpty: true, freetext: true, values: method }, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableViewFinDetailPreRel;
async function viewFinDetailPreRel(name) {
  await axios
    .post('/api/brand/detail/relpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableViewFinDetailPreRel = new Tabulator('#viewFinDetailPreRelTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: 'autocomplete', editorParams: { showListOnEmpty: true, freetext: true, values: method }, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableViewFinDetailPostRel;
async function viewFinDetailPostRel(name) {
  await axios
    .post('/api/brand/detail/relpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableViewFinDetailPostRel = new Tabulator('#viewFinDetailPostRelTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: 'autocomplete', editorParams: { showListOnEmpty: true, freetext: true, values: method }, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
