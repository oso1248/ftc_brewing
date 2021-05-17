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
document.getElementById('update').onclick = updateView;
function updateView() {
  document.getElementById('viewBoxes').style.display = 'none';
  document.getElementById('updateBoxes').style.display = 'block';

  document.getElementById('chpUpdateBox').style.display = 'none';
  document.getElementById('schUpdateBox').style.display = 'none';
  document.getElementById('finUpdateBox').style.display = 'none';

  let dropDown = document.getElementById('finBrandUpdate');
  let api = '/api/brand/fin/get/';
  let title = 'brand_fin';
  dropDown.innerHTML = `<option value="" disabled selected hidden>Finished</option>`;
  createListBrwBrand(api, dropDown, title);

  dropDown = document.getElementById('schBrandUpdate');
  api = '/api/brand/brw/get/';
  title = 'brand';
  dropDown.innerHTML = `<option value="" disabled selected hidden>Schoene</option>`;
  createListBrwBrand(api, dropDown, title);

  dropDown = document.getElementById('chpBrandUpdate');
  api = '/api/brand/brw/get/';
  title = 'brand';
  dropDown.innerHTML = `<option value="" disabled selected hidden>Chip</option>`;
  createListBrwBrand(api, dropDown, title);
}
//Chip Update
document.getElementById('chpBrandUpdate').addEventListener('change', chpUpdateSelect);
function chpUpdateSelect() {
  document.getElementById('schUpdateBox').style.display = 'none';
  document.getElementById('finUpdateBox').style.display = 'none';
  document.getElementById('chpUpdateBox').style.display = 'block';

  let brand = document.getElementById('chpBrandUpdate').value;
  document.getElementById('schBrandUpdate').selectedIndex = 0;
  document.getElementById('finBrandUpdate').selectedIndex = 0;

  let header = document.getElementById('chpRecipeHeader');
  header.innerHTML = `Chip Recipe Brand: ${brand}`;
  chpBrandUpdate(brand);
}
let tableUpdateBrandChp;
async function chpBrandUpdate(name) {
  await axios
    .post('/api/brand/recipe/chp', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;

      tableUpdateBrandChp = new Tabulator('#chpUpdateTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: true, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('btnUpdateSubmitChp').addEventListener('click', sendUpdateChp);
async function sendUpdateChp(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  let brand = document.getElementById('chpBrandUpdate').value;
  let tableData = tableUpdateBrandChp.getData();
  await axios
    .patch('/api/brand/detail/updaterecipe/chip', tableData)
    .then((data) => {
      chpBrandUpdate(brand);
      alert(`${data.data[0].updated_by} Updated Chip Recipe`);
    })
    .catch((err) => alert(err));
}
// Schoene update
document.getElementById('schBrandUpdate').addEventListener('change', schUpdateSelect);
function schUpdateSelect() {
  document.getElementById('finUpdateBox').style.display = 'none';
  document.getElementById('chpUpdateBox').style.display = 'none';
  document.getElementById('schUpdateBox').style.display = 'block';

  let brand = document.getElementById('schBrandUpdate').value;
  document.getElementById('chpBrandUpdate').selectedIndex = 0;
  document.getElementById('finBrandUpdate').selectedIndex = 0;

  let header = document.getElementById('schRecipeHeader');
  header.innerHTML = `Schoene Recipe Brand: ${brand}`;
  schBrandUpdate(brand);
}
let tableUpdateBrandSch;
async function schBrandUpdate(name) {
  await axios
    .post('/api/brand/recipe/sch', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;

      tableUpdateBrandSch = new Tabulator('#updateFinRecipeSchTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: true, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('btnUpdateSubmitSch').addEventListener('click', sendUpdateSch);
async function sendUpdateSch(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  let brand = document.getElementById('schBrandUpdate').value;
  let tableData = tableUpdateBrandSch.getData();

  await axios
    .patch('/api/brand/detail/updaterecipe/schoene', tableData)
    .then((data) => {
      schBrandUpdate(brand);
      alert(`${data.data[0].updated_by} Updated Schoene Recipe`);
    })
    .catch((err) => alert(err));
}
// Finished Update
document.getElementById('finBrandUpdate').addEventListener('change', finUpdateSelect);
function finUpdateSelect() {
  document.getElementById('chpUpdateBox').style.display = 'none';
  document.getElementById('schUpdateBox').style.display = 'none';
  document.getElementById('finUpdateBox').style.display = 'block';

  let brand = document.getElementById('finBrandUpdate').value;
  document.getElementById('chpBrandUpdate').selectedIndex = 0;
  document.getElementById('schBrandUpdate').selectedIndex = 0;

  let header = document.getElementById('finRecipeHeader');
  header.innerHTML = `Finished Recipe Brand: ${brand}`;
  finBrandUpdate(brand);
}
let tableUpdateBrandFin;
async function finBrandUpdate(name) {
  await axios
    .post('/api/brand/recipe/fin', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;

      tableUpdateBrandFin = new Tabulator('#updateFinRecipeFinTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: true, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
document.getElementById('btnUpdateSubmitFin').addEventListener('click', sendUpdateFin);
async function sendUpdateFin(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  let brand = document.getElementById('finBrandUpdate').value;
  let tableData = tableUpdateBrandFin.getData();

  await axios
    .patch('/api/brand/detail/updaterecipe/filtered', tableData)
    .then((data) => {
      finBrandUpdate(brand);
      alert(`${data.data[0].updated_by} Updated Finished Recipe`);
    })
    .catch((err) => alert(err));
}

// View
document.getElementById('view').onclick = viewView;
function viewView() {
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('viewBoxes').style.display = 'block';

  document.getElementById('schViewBox').style.display = 'none';
  document.getElementById('finViewBox').style.display = 'none';
  document.getElementById('chpViewBox').style.display = 'none';

  let api = '/api/brand/fin/get/';
  let title = 'brand_fin';
  let dropDown = document.getElementById('finBrandView');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Finished</option>`;
  createListBrwBrand(api, dropDown, title);

  dropDown = document.getElementById('chpBrandView');
  api = '/api/brand/brw/get/';
  title = 'brand';
  dropDown.innerHTML = `<option value="" disabled selected hidden>Chip</option>`;
  createListBrwBrand(api, dropDown, title);

  dropDown = document.getElementById('schBrandView');
  api = '/api/brand/brw/get/';
  title = 'brand';
  dropDown.innerHTML = `<option value="" disabled selected hidden>Schoene</option>`;
  createListBrwBrand(api, dropDown, title);
}
//Chip View
document.getElementById('chpBrandView').addEventListener('change', selectViewChp);
function selectViewChp() {
  document.getElementById('schViewBox').style.display = 'none';
  document.getElementById('finViewBox').style.display = 'none';
  document.getElementById('chpViewBox').style.display = 'block';

  let brand = document.getElementById('chpBrandView').value;
  document.getElementById('finBrandView').selectedIndex = 0;
  document.getElementById('schBrandView').selectedIndex = 0;

  let header = document.getElementById('chpViewHeader');
  header.innerHTML = `Chip Recipe Brand: ${brand}`;

  chpBrandView(brand);
}
let tableViewBrandChp;
async function chpBrandView(name) {
  await axios
    .post('/api/brand/recipe/chp', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;

      tableViewBrandChp = new Tabulator('#viewFinRecipeChpTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: true, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
// Schoene view
document.getElementById('schBrandView').addEventListener('change', selectViewSch);
function selectViewSch() {
  document.getElementById('finViewBox').style.display = 'none';
  document.getElementById('chpViewBox').style.display = 'none';
  document.getElementById('schViewBox').style.display = 'block';

  let brand = document.getElementById('schBrandView').value;
  document.getElementById('finBrandView').selectedIndex = 0;
  document.getElementById('chpBrandView').selectedIndex = 0;

  let header = document.getElementById('schViewHeader');
  header.innerHTML = `Schoene Recipe Brand: ${brand}`;

  schBrandView(brand);
}
let tableViewBrandSch;
async function schBrandView(name) {
  await axios
    .post('/api/brand/recipe/sch', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;

      tableViewBrandSch = new Tabulator('#viewFinRecipeSchTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: true, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
//Finished view
document.getElementById('finBrandView').addEventListener('change', selectViewFin);
function selectViewFin() {
  document.getElementById('chpViewBox').style.display = 'none';
  document.getElementById('schViewBox').style.display = 'none';
  document.getElementById('finViewBox').style.display = 'block';

  let brand = document.getElementById('finBrandView').value;
  document.getElementById('schBrandView').selectedIndex = 0;
  document.getElementById('chpBrandView').selectedIndex = 0;

  let header = document.getElementById('finViewHeader');
  header.innerHTML = `Finished Recipe Brand: ${brand}`;

  finBrandView(brand);
}
let tableViewBrandFin;
async function finBrandView(name) {
  await axios
    .post('/api/brand/recipe/fin', { name: name })
    .then((res) => {
      let data = res.data;
      let tableData = data;

      tableViewBrandFin = new Tabulator('#viewFinRecipeFinTable', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Object', field: 'obj', hozAlign: 'center', frozen: true },
          { title: 'Method', field: 'params', hozAlign: 'left', editor: true, formatter: 'textarea', frozen: true },
          { title: 'Notes', field: 'notes', hozAlign: 'left', editor: 'input', formatter: 'textarea' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
