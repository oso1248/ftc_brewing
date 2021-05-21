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

// Update
document.getElementById('add').onclick = updateView;
function updateView() {
  document.getElementById('viewBoxes').style.display = 'none';
  document.getElementById('updateBoxes').style.display = 'block';

  document.getElementById('updateLineageBox').style.display = 'none';

  let dropDown = document.getElementById('brwBrandUpdate');
  let api = '/api/brand/fin/get/';
  let title = 'brand_fin';
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
  await updateFinDetailPreCsx(data.brand_brw, methods);
  await updateFinDetailPostCsx(data.brand_brw, methods);
  await updateFinDetailPreFil(data.brand_fin, methods);
  await updateFinDetailPostFil(data.brand_fin, methods);
  await updateFinDetailPreRel(data.brand_fin, methods);
  await updateFinDetailPostRel(data.brand_fin, methods);
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
      let tableData = [res.data[0]];
      tableUpdateBrandLineage = new Tabulator('#updateLineageTable', {
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Schoene', field: 'brand_brw', hozAlign: 'left', frozen: true },
          { title: 'Active', field: 'act_brw', hozAlign: 'left' },
          { title: 'Finished', field: 'brand_fin', hozAlign: 'left' },
          { title: 'Active', field: 'act_fin', hozAlign: 'left' },
          { title: 'Package', field: 'brand_pck', hozAlign: 'left' },
          { title: 'Active', field: 'act_pck', hozAlign: 'left' },
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
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true, resizable: false },
          {
            title: 'Method',
            field: 'params',
            hozAlign: 'left',
            editor: 'autocomplete',
            editorParams: { showListOnEmpty: true, freetext: true, values: method },
            formatter: 'textarea',
            resizable: false,
          },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
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
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true, resizable: false },
          {
            title: 'Method',
            field: 'params',
            hozAlign: 'left',
            editor: 'autocomplete',
            editorParams: { showListOnEmpty: true, freetext: true, values: method },
            formatter: 'textarea',
            resizable: false,
          },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
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
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true, resizable: false },
          {
            title: 'Method',
            field: 'params',
            hozAlign: 'left',
            editor: 'autocomplete',
            editorParams: { showListOnEmpty: true, freetext: true, values: method },
            formatter: 'textarea',
            resizable: false,
          },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
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
  let header = document.getElementById('postFltrHeader');
  header.innerHTML = `Post Filter Brand: ${name}`;
  await axios
    .post('/api/brand/detail/filpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableUpdateFinDetailPostFil = new Tabulator('#updateFinDetailPostFilTable', {
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true, resizable: false },
          {
            title: 'Method',
            field: 'params',
            hozAlign: 'left',
            editor: 'autocomplete',
            editorParams: { showListOnEmpty: true, freetext: true, values: method },
            formatter: 'textarea',
            resizable: false,
          },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
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
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true, resizable: false },
          {
            title: 'Method',
            field: 'params',
            hozAlign: 'left',
            editor: 'autocomplete',
            editorParams: { showListOnEmpty: true, freetext: true, values: method },
            formatter: 'textarea',
            resizable: false,
          },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
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
  header.innerHTML = `Post Release Brand: ${name}`;
  await axios
    .post('/api/brand/detail/relpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;
      tableUpdateFinDetailPostRel = new Tabulator('#updateFinDetailPostRelTable', {
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true, resizable: false },
          {
            title: 'Method',
            field: 'params',
            hozAlign: 'left',
            editor: 'autocomplete',
            editorParams: { showListOnEmpty: true, freetext: true, values: method },
            formatter: 'textarea',
            resizable: false,
          },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
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
  let title = 'brand_fin';
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
  await viewFinDetailPreCsx(data.brand_brw);
  await viewFinDetailPostCsx(data.brand_brw);
  await viewFinDetailPreFil(data.brand_fin);
  await viewFinDetailPostFil(data.brand_fin);
  await viewFinDetailPreRel(data.brand_fin);
  await viewFinDetailPostRel(data.brand_fin);
}
let tableViewBrandLineage;
async function viewBrandLineage() {
  let name = document.getElementById('brwBrandView').value;
  await axios
    .post('/api/brand/fin/get/name', { name: name })
    .then((res) => {
      let tableData = [res.data[0]];
      tableViewBrandLineage = new Tabulator('#viewLineageTable', {
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Schoene', field: 'brand_brw', hozAlign: 'left', frozen: true },
          { title: 'Active', field: 'act_brw', hozAlign: 'left' },
          { title: 'Finished', field: 'brand_fin', hozAlign: 'left' },
          { title: 'Active', field: 'act_fin', hozAlign: 'left' },
          { title: 'Package', field: 'brand_pck', hozAlign: 'left' },
          { title: 'Active', field: 'act_pck', hozAlign: 'left' },
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
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'left', frozen: true, resizable: false },
          { title: 'Method', field: 'params', hozAlign: 'left', formatter: 'textarea', resizable: false },
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
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true, resizable: false },
          { title: 'Method', field: 'params', hozAlign: 'left', formatter: 'textarea', resizable: false },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
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
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true, resizable: false },
          { title: 'Method', field: 'params', hozAlign: 'left', formatter: 'textarea', resizable: false },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
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
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true, resizable: false },
          { title: 'Method', field: 'params', hozAlign: 'left', formatter: 'textarea', resizable: false },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
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
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true, resizable: false },
          { title: 'Method', field: 'params', hozAlign: 'left', formatter: 'textarea', resizable: false },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
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
        height: '100%',
        layout: 'fitDataFill',
        resizableColumns: true,
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true, resizable: false },
          { title: 'Method', field: 'params', hozAlign: 'left', formatter: 'textarea', resizable: false },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
