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
document
  .getElementById('brwBrandUpdate')
  .addEventListener('change', selectUpdate);
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
        height: '55px',
        layout: 'fitDataFill',
        resizableColumns: false,
        data: tableData,
        columns: [
          {
            title: 'Schoene',
            field: 'brndBrw',
            hozAlign: 'center',
            frozen: true,
          },
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
  let labels = [
    'Brand',
    'Chip Tank',
    'UniTank',
    'Lines',
    'Cooler',
    'Seperators',
    'ACP',
    'Schoene Tank',
    'Fill Tank',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/csxpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableUpdateFinDetailPreCsx = new Tabulator(
        '#updateFinDetailPreCsxTable',
        {
          resizableColumns: false,
          height: '330px',
          layout: 'fitDataFill',
          resizableColumns: false,
          data: tableData,
          columns: [
            {
              title: 'Object',
              field: 'object',
              hozAlign: 'center',
              frozen: true,
            },
            {
              title: 'Method',
              field: 'method',
              hozAlign: 'left',
              editor: 'autocomplete',
              editorParams: {
                showListOnEmpty: true,
                freetext: true,
                values: method,
              },
              formatter: 'textarea',
            },
          ],
        }
      );
    })
    .catch((err) => console.log(err));
}
let tableUpdateFinDetailPostCsx;
async function updateFinDetailPostCsx(name, method) {
  let labels = [
    'Brand',
    'Chip Tank',
    'UniTank',
    'Lines',
    'Seperators',
    'Schoene Tank',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/csxpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableUpdateFinDetailPostCsx = new Tabulator(
        '#updateFinDetailPostCsxTable',
        {
          resizableColumns: false,
          height: '330px',
          layout: 'fitDataFill',
          resizableColumns: false,
          data: tableData,
          columns: [
            {
              title: 'Object',
              field: 'object',
              hozAlign: 'center',
              frozen: true,
            },
            {
              title: 'Method',
              field: 'method',
              hozAlign: 'left',
              editor: 'autocomplete',
              editorParams: {
                showListOnEmpty: true,
                freetext: true,
                values: method,
              },
              formatter: 'textarea',
            },
          ],
        }
      );
    })
    .catch((err) => console.log(err));
}
let tableUpdateFinDetailPreFil;
async function updateFinDetailPreFil(name, method) {
  let labels = [
    'Brand',
    'Schoene Tank',
    'System',
    'Trap',
    'Filter Beer Tank',
    'Fill Tank',
    'Injection',
    'Control',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/filpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableUpdateFinDetailPreFil = new Tabulator(
        '#updateFinDetailPreFilTable',
        {
          resizableColumns: false,
          height: '330px',
          layout: 'fitDataFill',
          resizableColumns: false,
          data: tableData,
          columns: [
            {
              title: 'Object',
              field: 'object',
              hozAlign: 'center',
              frozen: true,
            },
            {
              title: 'Method',
              field: 'method',
              hozAlign: 'left',
              editor: 'autocomplete',
              editorParams: {
                showListOnEmpty: true,
                freetext: true,
                values: method,
              },
              formatter: 'textarea',
            },
          ],
        }
      );
    })
    .catch((err) => console.log(err));
}
let tableUpdateFinDetailPostFil;
async function updateFinDetailPostFil(name, method) {
  let labels = [
    'Brand',
    'Schoene Tank',
    'System',
    'Trap',
    'Filter Beer Tank',
    'Recover',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/filpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableUpdateFinDetailPostFil = new Tabulator(
        '#updateFinDetailPostFilTable',
        {
          resizableColumns: false,
          height: '330px',
          layout: 'fitDataFill',
          data: tableData,
          columns: [
            {
              title: 'Object',
              field: 'object',
              hozAlign: 'center',
              frozen: true,
            },
            {
              title: 'Method',
              field: 'method',
              hozAlign: 'left',
              editor: 'autocomplete',
              editorParams: {
                showListOnEmpty: true,
                freetext: true,
                values: method,
              },
              formatter: 'textarea',
            },
          ],
        }
      );
    })
    .catch((err) => console.log(err));
}
let tableUpdateFinDetailPreRel;
async function updateFinDetailPreRel(name, method) {
  let labels = [
    'Brand',
    'Filter Beer Tank',
    'Release Line',
    'Package Line',
    'Draft Line',
    'Recover',
    'Control',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/relpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableUpdateFinDetailPreRel = new Tabulator(
        '#updateFinDetailPreRelTable',
        {
          resizableColumns: false,
          height: '330px',
          layout: 'fitDataFill',
          resizableColumns: false,
          data: tableData,
          columns: [
            {
              title: 'Object',
              field: 'object',
              hozAlign: 'center',
              frozen: true,
            },
            {
              title: 'Method',
              field: 'method',
              hozAlign: 'left',
              editor: 'autocomplete',
              editorParams: {
                showListOnEmpty: true,
                freetext: true,
                values: method,
              },
              formatter: 'textarea',
            },
          ],
        }
      );
    })
    .catch((err) => console.log(err));
}
let tableUpdateFinDetailPostRel;
async function updateFinDetailPostRel(name, method) {
  let labels = [
    'Brand',
    'Filter Beer Tank',
    'System Lines',
    'Package',
    'Draft',
    'Recover',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/relpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableUpdateFinDetailPostRel = new Tabulator(
        '#updateFinDetailPostRelTable',
        {
          resizableColumns: false,
          height: '330px',
          layout: 'fitDataFill',
          resizableColumns: false,
          data: tableData,
          columns: [
            {
              title: 'Object',
              field: 'object',
              hozAlign: 'center',
              frozen: true,
            },
            {
              title: 'Method',
              field: 'method',
              hozAlign: 'left',
              editor: 'autocomplete',
              editorParams: {
                showListOnEmpty: true,
                freetext: true,
                values: method,
              },
              formatter: 'textarea',
            },
          ],
        }
      );
    })
    .catch((err) => console.log(err));
}
document
  .getElementById('btnUpdateSubmit')
  .addEventListener('click', sendUpdate);
async function sendUpdate(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  let tables = [
    tableUpdateFinDetailPreCsx,
    tableUpdateFinDetailPostCsx,
    tableUpdateFinDetailPreFil,
    tableUpdateFinDetailPostFil,
    tableUpdateFinDetailPreRel,
    tableUpdateFinDetailPostRel,
  ];
  let tablesData = [];
  let tableData = [];

  for (let index = 0; index < tables.length; index++) {
    tableData = [];
    tableData = tables[index].getData();
    tablesData.push(tableData);
  }

  await axios
    .patch('/api/brand/detail/updatedetail', tablesData)
    .then((data) => {
      alert('Updated');
      // document.getElementById('frmUpdate').reset()
      // if(hopTableUpdate) {
      //   hopTableUpdate.clearData()
      // }
    })
    .catch((err) => alert(err));
}

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

  let row = tableViewFinDetailPostRel.getRow(2);
  let rowData = row.getData();
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
        height: '55px',
        layout: 'fitDataFill',
        resizableColumns: false,
        data: tableData,
        columns: [
          {
            title: 'Schoene',
            field: 'brndBrw',
            hozAlign: 'left',
            frozen: true,
          },
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
  let labels = [
    'Brand',
    'Chip Tank',
    'UniTank',
    'Lines',
    'Cooler',
    'Seperators',
    'ACP',
    'Schoene Tank',
    'Fill Tank',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/csxpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableViewFinDetailPreCsx = new Tabulator('#viewFinDetailPreCsxTable', {
        resizableColumns: false,
        height: '330px',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Object', field: 'object', hozAlign: 'left', frozen: true },
          {
            title: 'Method',
            field: 'method',
            hozAlign: 'left',
            formatter: 'textarea',
          },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableViewFinDetailPostCsx;
async function viewFinDetailPostCsx(name) {
  let labels = [
    'Brand',
    'Chip Tank',
    'UniTank',
    'Lines',
    'Seperators',
    'Schoene Tank',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/csxpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableViewFinDetailPostCsx = new Tabulator('#viewFinDetailPostCsxTable', {
        resizableColumns: false,
        height: '330px',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Object', field: 'object', hozAlign: 'left', frozen: true },
          {
            title: 'Method',
            field: 'method',
            hozAlign: 'left',
            formatter: 'textarea',
          },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableViewFinDetailPreFil;
async function viewFinDetailPreFil(name) {
  let labels = [
    'Brand',
    'Schoene Tank',
    'System',
    'Trap',
    'Filter Beer Tank',
    'Fill Tank',
    'Injection',
    'Control',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/filpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableViewFinDetailPreFil = new Tabulator('#viewFinDetailPreFilTable', {
        resizableColumns: false,
        height: '330px',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Object', field: 'object', hozAlign: 'left', frozen: true },
          {
            title: 'Method',
            field: 'method',
            hozAlign: 'left',
            formatter: 'textarea',
          },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableViewFinDetailPostFil;
async function viewFinDetailPostFil(name) {
  let labels = [
    'Brand',
    'Schoene Tank',
    'System',
    'Trap',
    'Filter Beer Tank',
    'Recover',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/filpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableViewFinDetailPostFil = new Tabulator('#viewFinDetailPostFilTable', {
        resizableColumns: false,
        height: '330px',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'object', hozAlign: 'left', frozen: true },
          {
            title: 'Method',
            field: 'method',
            hozAlign: 'left',
            formatter: 'textarea',
          },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableViewFinDetailPreRel;
async function viewFinDetailPreRel(name) {
  let labels = [
    'Brand',
    'Filter Beer Tank',
    'Release Line',
    'Package Line',
    'Draft Line',
    'Recover',
    'Control',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/relpre', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableViewFinDetailPreRel = new Tabulator('#viewFinDetailPreRelTable', {
        resizableColumns: false,
        height: '330px',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'object', hozAlign: 'left', frozen: true },
          {
            title: 'Method',
            field: 'method',
            hozAlign: 'left',
            formatter: 'textarea',
          },
        ],
      });
    })
    .catch((err) => console.log(err));
}
let tableViewFinDetailPostRel;
async function viewFinDetailPostRel(name) {
  let labels = [
    'Brand',
    'Filter Beer Tank',
    'System Lines',
    'Package',
    'Draft',
    'Recover',
    'Note',
  ];
  await axios
    .post('/api/brand/detail/relpost', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = convert(data, labels);
      tableViewFinDetailPostRel = new Tabulator('#viewFinDetailPostRelTable', {
        resizableColumns: false,
        height: '330px',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'object', hozAlign: 'left', frozen: true },
          {
            title: 'Method',
            field: 'method',
            hozAlign: 'left',
            formatter: 'textarea',
          },
        ],
      });
    })
    .catch((err) => console.log(err));
}
