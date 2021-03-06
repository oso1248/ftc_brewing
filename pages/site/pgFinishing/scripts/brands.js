document.getElementById('addBoxes').style.display = 'none';
document.getElementById('updateBoxes').style.display = 'none';
document.getElementById('recipeBoxes').style.display = 'none';
document.getElementById('injectionBoxes').style.display = 'none';

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
        option.id = elem.id;
        append(parent, option);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
function convert(obj) {
  let json = {};
  let data = [];
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      json = {};
      json['object'] = key;
      json['method'] = obj[key];
      data.push(json);
    }
  }
  return data;
}
function convert2(obj, labels) {
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

// View Brands
document.getElementById('viewBrands').onclick = viewBrands;
function viewBrands() {
  document.getElementById('injectionBoxes').style.display = 'none';
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('recipeBoxes').style.display = 'none';
  document.getElementById('addBoxes').style.display = 'block';
  document.getElementById('viewBrwBrand').style.display = 'none';
  document.getElementById('viewFinBrand').style.display = 'none';
  document.getElementById('viewPckBrand').style.display = 'none';
}
// Brw
document.getElementById('viewSchoene').addEventListener('click', viewBrandBrew);
let viewBrandBrwTable;
function viewBrandBrew() {
  document.getElementById('viewPckBrand').style.display = 'none';
  document.getElementById('viewFinBrand').style.display = 'none';
  document.getElementById('viewBrwBrand').style.display = 'block';

  axios
    .post('/api/brand/brw/get', { active: true })
    .then((res) => {
      let tableData = res.data;

      viewBrandBrwTable = new Tabulator('#viewBrandBrw', {
        printHeader: '<h1>Brew Brands<h1>',
        resizableColumns: false,
        height: '100%',
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
          { title: 'Note', field: 'note', hozAlign: 'left', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('xlsxViewBrandBrwTable').addEventListener('click', () => {
  viewBrandBrwTable.download('xlsx', 'brand_brw.xlsx', {
    sheetName: 'Brands',
  });
});
document.getElementById('printViewBrandBrwTable').addEventListener('click', () => {
  viewBrandBrwTable.print(false, true);
});

// Fin
document.getElementById('viewFinish').addEventListener('click', viewBrandFin);
let viewBrandFinTable;
function viewBrandFin() {
  document.getElementById('viewBrwBrand').style.display = 'none';
  document.getElementById('viewPckBrand').style.display = 'none';
  document.getElementById('viewFinBrand').style.display = 'block';

  axios
    .post('/api/brand/fin/get', { active: true })
    .then((res) => {
      let tableData = res.data;
      viewBrandFinTable = new Tabulator('#viewBrandFin', {
        printHeader: '<h1>Finishing Brands<h1>',
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Fin Brand', field: 'brand_fin', hozAlign: 'left', frozen: true },
          { title: 'Active', field: 'active', hozAlign: 'left' },
          { title: 'Injection', field: 'injection', hozAlign: 'left' },
          { title: 'Updated', field: 'updated_at', hozAlign: 'left' },
          { title: 'Updated By', field: 'updated_by', hozAlign: 'left' },
          { title: 'Brw Brand', field: 'brand_brw', hozAlign: 'left' },
          { title: 'Pck Brand', field: 'brand_pck', hozAlign: 'left' },
          { title: 'Note', field: 'note', hozAlign: 'left', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('xlsxViewBrandFinTable').addEventListener('click', () => {
  viewBrandFinTable.download('xlsx', 'brand_fin.xlsx', {
    sheetName: 'Brands',
  });
});
document.getElementById('printViewBrandFinTable').addEventListener('click', () => {
  viewBrandFinTable.print(false, true);
});

// Pck
document.getElementById('viewPackage').addEventListener('click', viewBrandPck);
let viewBrandPckTable;
function viewBrandPck() {
  document.getElementById('viewBrwBrand').style.display = 'none';
  document.getElementById('viewFinBrand').style.display = 'none';
  document.getElementById('viewPckBrand').style.display = 'block';

  axios
    .post('/api/brand/pck/get', { active: true })
    .then((res) => {
      let tableData = res.data;
      viewBrandPckTable = new Tabulator('#viewBrandPck', {
        printHeader: '<h1>Packaging Brands<h1>',
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Pck Brand', field: 'brand_pck', hozAlign: 'left', frozen: true },
          { title: 'Active', field: 'active', hozAlign: 'left' },
          { title: 'Updated', field: 'updated_at', hozAlign: 'left' },
          { title: 'Updated By', field: 'updated_by', hozAlign: 'left' },
          { title: 'Fin Brand', field: 'brand_fin', hozAlign: 'left' },
          { title: 'Brw Brand', field: 'brand_brw', hozAlign: 'left' },
          { title: 'Note', field: 'note', hozAlign: 'left', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('xlsxViewBrandPckTable').addEventListener('click', () => {
  viewBrandPckTable.download('xlsx', 'brand_pck.xlsx', {
    sheetName: 'Brands',
  });
});
document.getElementById('printViewBrandPckTable').addEventListener('click', () => {
  viewBrandPckTable.print(false, true);
});

// Details Brand
document.getElementById('detailsBrands').onclick = detailBrands;
function detailBrands() {
  document.getElementById('injectionBoxes').style.display = 'none';
  document.getElementById('recipeBoxes').style.display = 'none';
  document.getElementById('addBoxes').style.display = 'none';
  document.getElementById('updateBoxes').style.display = 'block';
  document.getElementById('detailBrwBrand').style.display = 'none';
  document.getElementById('detailFinBrand').style.display = 'none';
  document.getElementById('detailPckBrand').style.display = 'none';

  let dropDown = document.getElementById('brwBrandDetail');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Schoene</option>`;
  let api = '/api/brand/brw/get';
  let title = 'brand';
  createList(api, dropDown, title);

  dropDown = document.getElementById('finBrandDetail');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Filters</option>`;
  api = '/api/brand/fin/get';
  title = 'brand_fin';
  createList(api, dropDown, title);

  dropDown = document.getElementById('pckBrandDetail');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Releasing</option>`;
  api = '/api/brand/fin/get';
  title = 'brand_fin';
  createList(api, dropDown, title);
}
// Brw
document.getElementById('brwBrandDetail').addEventListener('change', detailBrandBrew);
function detailBrandBrew() {
  document.getElementById('detailPckBrand').style.display = 'none';
  document.getElementById('detailFinBrand').style.display = 'none';
  document.getElementById('detailBrwBrand').style.display = 'block';
  console.log('detail brw');

  let name = document.getElementById('brwBrandDetail').value;
  document.getElementById('finBrandDetail').selectedIndex = 0;
  document.getElementById('pckBrandDetail').selectedIndex = 0;

  detailBrandBrewPre(name);
  detailBrandBrewPost(name);
}
let detailBrandBrwTablePre;
function detailBrandBrewPre(name) {
  axios
    .post('/api/brand/detail/csxpre', { name: `${name}` })
    .then((res) => {
      let tableData = res.data;
      detailBrandBrwTablePre = new Tabulator('#detailBrandBrwPre', {
        printHeader: `<h1>Pre CSX Brand: ${name}<h1>`,
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
document.getElementById('xlsxDetailBrandBrwTablePre').addEventListener('click', () => {
  detailBrandBrwTablePre.download('xlsx', 'pre_csx.xlsx', {
    sheetName: 'Pre Csx',
  });
});
document.getElementById('printDetailBrandBrwTablePre').addEventListener('click', () => {
  detailBrandBrwTablePre.print(false, true);
});

let detailBrandBrwTablePost;
function detailBrandBrewPost(name) {
  axios
    .post('/api/brand/detail/csxpost/', { name: `${name}` })
    .then((res) => {
      let tableData = res.data;

      detailBrandBrwTablePost = new Tabulator('#detailBrandBrwPost', {
        printHeader: `<h1>Post CSX Brand: ${name}<h1>`,
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
document.getElementById('xlsxDetailBrandBrwTablePost').addEventListener('click', () => {
  detailBrandBrwTablePost.download('xlsx', 'post_csx.xlsx', {
    sheetName: 'Post Csx',
  });
});
document.getElementById('printDetailBrandBrwTablePost').addEventListener('click', () => {
  detailBrandBrwTablePost.print(false, true);
});

// Fin
document.getElementById('finBrandDetail').addEventListener('change', detailBrandFin);
async function detailBrandFin() {
  document.getElementById('detailPckBrand').style.display = 'none';
  document.getElementById('detailBrwBrand').style.display = 'none';
  document.getElementById('detailFinBrand').style.display = 'block';
  console.log('detail fin');

  let name = document.getElementById('finBrandDetail').value;
  document.getElementById('brwBrandDetail').selectedIndex = 0;
  document.getElementById('pckBrandDetail').selectedIndex = 0;
  await detailBrandFinPre(name);
  await detailBrandFinPost(name);
}
let detailBrandFinTablePre;
function detailBrandFinPre(name) {
  axios
    .post('/api/brand/detail/filpre/', { name: `${name}` })
    .then((res) => {
      let tableData = res.data;

      detailBrandFinTablePre = new Tabulator('#detailBrandFinPre', {
        printHeader: `<h1>Pre Filter Brand: ${name}<h1>`,
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
document.getElementById('xlsxDetailBrandFinTablePre').addEventListener('click', () => {
  detailBrandFinTablePre.download('xlsx', 'pre_filter.xlsx', {
    sheetName: 'Pre Filter',
  });
});
document.getElementById('printDetailBrandFinTablePre').addEventListener('click', () => {
  detailBrandFinTablePre.print(false, true);
});

let detailBrandFinTablePost;
function detailBrandFinPost(name) {
  axios
    .post('/api/brand/detail/filpost/', { name: `${name}` })
    .then((res) => {
      let tableData = res.data;

      detailBrandFinTablePost = new Tabulator('#detailBrandFinPost', {
        printHeader: `<h1>Post Filter Brand: ${name}<h1>`,
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
document.getElementById('xlsxDetailBrandFinTablePost').addEventListener('click', () => {
  detailBrandFinTablePost.download('xlsx', 'post_filter.xlsx', {
    sheetName: 'Post Filter',
  });
});
document.getElementById('printDetailBrandFinTablePost').addEventListener('click', () => {
  detailBrandFinTablePost.print(false, true);
});

// Pck
document.getElementById('pckBrandDetail').addEventListener('change', detailBrandPck);
async function detailBrandPck() {
  document.getElementById('detailBrwBrand').style.display = 'none';
  document.getElementById('detailFinBrand').style.display = 'none';
  document.getElementById('detailPckBrand').style.display = 'block';
  console.log('detail pck');

  let name = document.getElementById('pckBrandDetail').value;
  document.getElementById('brwBrandDetail').selectedIndex = 0;
  document.getElementById('finBrandDetail').selectedIndex = 0;
  await detailBrandPckPre(name);
  await detailBrandPckPost(name);
}
let detailBrandPckTablePre;
function detailBrandPckPre(name) {
  axios
    .post('/api/brand/detail/relpre/', { name: `${name}` })
    .then((res) => {
      let tableData = res.data;

      detailBrandPckTablePre = new Tabulator('#detailBrandPckPre', {
        printHeader: `<h1>Post Filter Brand: ${name}<h1>`,
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
document.getElementById('xlsxDetailBrandPckTablePre').addEventListener('click', () => {
  detailBrandPckTablePre.download('xlsx', 'pre_release.xlsx', {
    sheetName: 'Pre Release',
  });
});
document.getElementById('printDetailBrandPckTablePre').addEventListener('click', () => {
  detailBrandPckTablePre.print(false, true);
});

let detailBrandPckTablePost;
function detailBrandPckPost(name) {
  axios
    .post('/api/brand/detail/relpost/', { name: `${name}` })
    .then((res) => {
      let tableData = res.data;

      detailBrandPckTablePost = new Tabulator('#detailBrandPckPost', {
        printHeader: `<h1>Post Filter Brand: ${name}<h1>`,
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
document.getElementById('xlsxDetailBrandPckTablePost').addEventListener('click', () => {
  detailBrandPckTablePost.download('xlsx', 'post_release.xlsx', {
    sheetName: 'Post Release',
  });
});
document.getElementById('printDetailBrandPckTablePost').addEventListener('click', () => {
  detailBrandPckTablePost.print(false, true);
});

//Recipe Brand
document.getElementById('recipeBrands').onclick = recipeBrands;
function recipeBrands() {
  document.getElementById('injectionBoxes').style.display = 'none';
  document.getElementById('recipeBoxes').style.display = 'block';
  document.getElementById('addBoxes').style.display = 'none';
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('recipeChpBrand').style.display = 'none';
  document.getElementById('recipeSchBrand').style.display = 'none';
  document.getElementById('recipeFinBrand').style.display = 'none';

  let dropDown = document.getElementById('chpBrandRecipe');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Chip</option>`;
  let api = '/api/brand/brw/get';
  let title = 'brand';
  createList(api, dropDown, title);

  dropDown = document.getElementById('schBrandRecipe');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Schoene</option>`;
  api = '/api/brand/brw/get';
  title = 'brand';
  createList(api, dropDown, title);

  dropDown = document.getElementById('finBrandRecipe');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Filtered</option>`;
  api = '/api/brand/fin/get';
  title = 'brand_fin';
  createList(api, dropDown, title);
}
// Chp
document.getElementById('chpBrandRecipe').addEventListener('change', recipeBrandChp);
let recipeBrandChpTable;
function recipeBrandChp() {
  document.getElementById('recipeChpBrand').style.display = 'block';
  document.getElementById('recipeSchBrand').style.display = 'none';
  document.getElementById('recipeFinBrand').style.display = 'none';
  console.log('recipe chp');

  let name = document.getElementById('chpBrandRecipe').value;
  document.getElementById('schBrandRecipe').selectedIndex = 0;
  document.getElementById('finBrandRecipe').selectedIndex = 0;
  recipeBrandChpDetail(name);
}
function recipeBrandChpDetail(name) {
  axios
    .post('/api/brand/recipe/chp/', { name: `${name}` })
    .then((res) => {
      let tableData = res.data;

      recipeBrandChpTable = new Tabulator('#recipeBrandChp', {
        printHeader: `<h1>Chip Recipe Brand: ${name}<h1>`,
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Parameter', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Specification', field: 'params', hozAlign: 'left', editor: true, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('xlsxRecipeBrandChp').addEventListener('click', () => {
  recipeBrandChpTable.download('xlsx', 'param_chp.xlsx', { sheetName: 'Chip' });
});
document.getElementById('printRecipeBrandChp').addEventListener('click', () => {
  recipeBrandChpTable.print(false, true);
});

// Sch
document.getElementById('schBrandRecipe').addEventListener('change', recipeBrandSch);
let recipeBrandSchTable;
function recipeBrandSch() {
  document.getElementById('recipeChpBrand').style.display = 'none';
  document.getElementById('recipeSchBrand').style.display = 'block';
  document.getElementById('recipeFinBrand').style.display = 'none';
  console.log('recipe sch');

  let name = document.getElementById('schBrandRecipe').value;
  document.getElementById('chpBrandRecipe').selectedIndex = 0;
  document.getElementById('finBrandRecipe').selectedIndex = 0;
  recipeBrandSchDetail(name);
}
function recipeBrandSchDetail(name) {
  axios
    .post('/api/brand/recipe/sch', { name: `${name}` })
    .then((res) => {
      let tableData = res.data;

      recipeBrandSchTable = new Tabulator('#recipeBrandSch', {
        printHeader: `<h1>Schoene Recipe Brand: ${name}<h1>`,
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Parameter', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Specification', field: 'params', hozAlign: 'left', editor: true, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('xlsxRecipeBrandSch').addEventListener('click', () => {
  recipeBrandSchTable.download('xlsx', 'param_sch.xlsx', {
    sheetName: 'Schoene',
  });
});
document.getElementById('printRecipeBrandSch').addEventListener('click', () => {
  recipeBrandSchTable.print(false, true);
});

// Fin
document.getElementById('finBrandRecipe').addEventListener('change', recipeBrandFin);
let recipeBrandFinTable;
function recipeBrandFin() {
  document.getElementById('recipeChpBrand').style.display = 'none';
  document.getElementById('recipeSchBrand').style.display = 'none';
  document.getElementById('recipeFinBrand').style.display = 'block';
  console.log('recipe fin');

  let name = document.getElementById('finBrandRecipe').value;
  document.getElementById('chpBrandRecipe').selectedIndex = 0;
  document.getElementById('schBrandRecipe').selectedIndex = 0;
  recipeBrandFinDetail(name);
}
function recipeBrandFinDetail(name) {
  axios
    .post('/api/brand/recipe/fin/', { name: `${name}` })
    .then((res) => {
      let tableData = res.data;

      recipeBrandFinTable = new Tabulator('#recipeBrandFinTbl', {
        printHeader: `<h1>FIlter Release Recipe Brand: ${name}<h1>`,
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Parameter', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Specification', field: 'params', hozAlign: 'left', editor: true, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', width: '82px', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('xlsxRecipeBrandFin').addEventListener('click', () => {
  recipeBrandFinTable.download('xlsx', 'param_fin.xlsx', {
    sheetName: 'Filtered',
  });
});
document.getElementById('printRecipeBrandFin').addEventListener('click', () => {
  recipeBrandFinTable.print(false, true);
});

//Injection
// document.getElementById('injectionBrands').onclick = injectionBrands;
function injectionBrands() {
  document.getElementById('injectionBoxes').style.display = 'block';
  document.getElementById('recipeBoxes').style.display = 'none';
  document.getElementById('addBoxes').style.display = 'none';
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('recipeChpBrand').style.display = 'none';
  document.getElementById('recipeSchBrand').style.display = 'none';
  document.getElementById('recipeFinBrand').style.display = 'none';

  let dropDown = document.getElementById('injectionBrand');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`;
  let api = '/api/brand/fin/ingredient/get';
  let title = 'brand_fin';
  createList(api, dropDown, title);
}
document.getElementById('injectionBrand').addEventListener('change', injectionBrandFin);
let injectionTable;
function injectionBrandFin() {
  let index = document.getElementById('injectionBrand').selectedIndex;
  let options = document.getElementById('injectionBrand').options;
  let id = options[index].id;

  axios
    .post('/api/commodity/ingredient/bridge/get/' + id)
    .then((res) => {
      let tableData = res.data;
      injectionTable = new Tabulator('#injectionTable', {
        printHeader: '<h1>Injection Rates<h1>',
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        responsiveLayoutCollapseStartOpen: false,
        data: tableData,
        columns: [
          { title: 'Brand', field: 'brand', hozAlign: 'center', frozen: true },
          { title: 'Commodity', field: 'commodity', hozAlign: 'center' },
          { title: 'Rate', field: 'rate', hozAlign: 'left', width: '25px' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
