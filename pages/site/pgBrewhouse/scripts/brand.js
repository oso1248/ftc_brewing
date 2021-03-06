document.getElementById('brndViewHide').style.display = 'none';
document.getElementById('stdHopHide').style.display = 'none';
document.getElementById('dryHopHide').style.display = 'none';
document.getElementById('sprSacHide').style.display = 'none';

function createNode(element) {
  return document.createElement(element);
}
function append(parent, e1) {
  return parent.appendChild(e1);
}
function createList(api, parent, title) {
  axios
    .post(api, { active: true })
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

//Brand view
let viewBrandBrwTable;
document.getElementById('brndView').onclick = brandView;
function brandView() {
  document.getElementById('brndViewHide').style.display = 'block';
  document.getElementById('stdHopHide').style.display = 'none';
  document.getElementById('dryHopHide').style.display = 'none';
  document.getElementById('sprSacHide').style.display = 'none';
  if (viewBrandBrwTable) {
    viewBrandBrwTable.clearData();
  }
  viewBrandBrew();
}
function viewBrandBrew() {
  axios
    .post('/api/brand/brw/get', { active: true })
    .then((res) => {
      let tableData = res.data;

      viewBrandBrwTable = new Tabulator('#brndViewTbl', {
        printHeader: '<h1>Brew Brands<h1>',
        resizableColumns: false,
        height: '100%',
        layoutColumnsOnNewData: true,
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Brand', field: 'brand', hozAlign: 'center', frozen: true },
          { title: 'Active', field: 'active', hozAlign: 'center' },
          { title: 'Standard Hops', field: 'hop_std', hozAlign: 'center' },
          { title: 'Craft Hops', field: 'hop_crft', hozAlign: 'center' },
          { title: 'Dry Hops', field: 'hop_dry', hozAlign: 'center' },
          { title: 'Super Sacks', field: 'supr_sac', hozAlign: 'center' },
          { title: 'Updated', field: 'updated_at', hozAlign: 'left' },
          { title: 'Updated By', field: 'updated_by', hozAlign: 'left' },
          { title: 'Note', field: 'note', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('xlsxBrndView').addEventListener('click', xlsxBrndView);
function xlsxBrndView() {
  viewBrandBrwTable.download('xlsx', 'brew_brands.xlsx', {
    sheetName: 'Brands',
  });
}
document.getElementById('printBrndView').addEventListener('click', () => {
  viewBrandBrwTable.print(false, true);
});

// Standard hops
document.getElementById('stdHopView').onclick = stdHopView;
function stdHopView() {
  document.getElementById('stdHopBtn').style.display = 'none';
  document.getElementById('brndViewHide').style.display = 'none';
  document.getElementById('stdHopHide').style.display = 'block';
  document.getElementById('dryHopHide').style.display = 'none';
  document.getElementById('sprSacHide').style.display = 'none';

  stdHopList();
}
function stdHopList() {
  let dropDown = document.getElementById('stdHopSel');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Brand</option>`;
  let api = '/api/brand/brw/get/std';
  let title = 'brand';
  createList(api, dropDown, title);
}
let viewStdHopTable;
document.getElementById('stdHopSel').addEventListener('change', stdHopTbl);
function stdHopTbl() {
  document.getElementById('stdHopBtn').style.display = 'block';
  let name = document.getElementById('stdHopSel').value;
  axios
    .post('/api/mtx/brnd', { brand: `${name}`, method: 'view' })
    .then((res) => {
      res.data.unshift({ Hop: 'Brand', Pounds: `${name}` });
      let tableData = res.data;

      viewStdHopTable = new Tabulator('#stdHopTbl', {
        printHeader: '<h1>Standard Hops<h1>',
        resizableColumns: false,
        height: '100%',
        layoutColumnsOnNewData: true,
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Hop', field: 'Hop', hozAlign: 'Left' },
          { title: 'Pounds', field: 'Pounds', hozAlign: 'Left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('xlsxStdHop').addEventListener('click', () => {
  viewStdHopTable.download('xlsx', 'standard_hops.xlsx', {
    sheetName: 'Standard Hops',
  });
});
document.getElementById('printStdHop').addEventListener('click', () => {
  viewStdHopTable.print(false, true);
});

// Dry Hops
document.getElementById('dryHopView').onclick = dryHopView;
function dryHopView() {
  document.getElementById('dryHopBtn').style.display = 'none';
  document.getElementById('brndViewHide').style.display = 'none';
  document.getElementById('stdHopHide').style.display = 'none';
  document.getElementById('dryHopHide').style.display = 'block';
  document.getElementById('sprSacHide').style.display = 'none';

  let dropDown = document.getElementById('dryHopSel');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Brand</option>`;
  let api = '/api/brand/brw/get/dry';
  let title = 'brand';
  createList(api, dropDown, title);
}
let viewDryHopTable;
document.getElementById('dryHopSel').addEventListener('change', dryHopTbl);
function dryHopTbl() {
  document.getElementById('dryHopBtn').style.display = 'block';
  let name = document.getElementById('dryHopSel').value;
  axios
    .post('/api/mtx/dry', { brand: `${name}`, method: 'view' })
    .then((res) => {
      res.data.unshift({ Hop: 'Brand', Pounds: `${name}` });
      let tableData = res.data;

      viewDryHopTable = new Tabulator('#dryHopTbl', {
        printHeader: '<h1>Dry Hops<h1>',
        resizableColumns: false,
        height: '100%',
        layoutColumnsOnNewData: true,
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Hop', field: 'Hop', hozAlign: 'Left' },
          { title: 'Pounds', field: 'Pounds', hozAlign: 'Left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('xlsxDryHop').addEventListener('click', () => {
  viewDryHopTable.download('xlsx', 'dry_hop.xlsx', { sheetName: 'Dry Hops' });
});
document.getElementById('printDryHop').addEventListener('click', () => {
  viewDryHopTable.print(false, true);
});

// Super Sacks
let viewSprSacTable;
document.getElementById('sprSacView').onclick = sprSacView;
function sprSacView() {
  document.getElementById('sprSacBtn').style.display = 'none';
  document.getElementById('brndViewHide').style.display = 'none';
  document.getElementById('stdHopHide').style.display = 'none';
  document.getElementById('dryHopHide').style.display = 'none';
  document.getElementById('sprSacHide').style.display = 'block';

  let dropDown = document.getElementById('sprSacSel');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Brand</option>`;
  let api = '/api/brand/brw/get/sac';
  let title = 'brand';
  createList(api, dropDown, title);
}
document.getElementById('sprSacSel').addEventListener('change', sprSacTbl);
function sprSacTbl() {
  document.getElementById('sprSacBtn').style.display = 'block';
  let name = document.getElementById('sprSacSel').value;
  axios
    .post('/api/mtx/sac', { brand: `${name}`, method: 'view' })
    .then((res) => {
      res.data.unshift({ commodity: 'Brand', Units: `${name}` });
      let tableData = res.data;
      viewSprSacTable = new Tabulator('#sprSacTbl', {
        printHeader: '<h1>Super Sacks<h1>',
        resizableColumns: false,
        height: '100%',
        layoutColumnsOnNewData: true,
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Commodity', field: 'commodity', hozAlign: 'Left' },
          { title: 'Units', field: 'Units', hozAlign: 'Left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('xlsxSprSac').addEventListener('click', () => {
  viewSprSacTable.download('xlsx', 'super_sacks.xlsx', {
    sheetName: 'Super Sacks',
  });
});
document.getElementById('printSprSac').addEventListener('click', () => {
  viewSprSacTable.print(false, true);
});
