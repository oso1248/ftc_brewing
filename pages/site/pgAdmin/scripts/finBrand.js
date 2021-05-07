document.getElementById('addBoxes').style.display = 'none';
document.getElementById('updateBoxes').style.display = 'none';
document.getElementById('injectionBoxes').style.display = 'none';
document.getElementById('attView').style.display = 'none';

function createNode(element) {
  return document.createElement(element);
}
function append(parent, e1) {
  return parent.appendChild(e1);
}
function createList(api, parent, title) {
  axios
    .post(api, { active: false })
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
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
String.prototype.toNonAlpha = function () {
  return this.replace(/[^0-9a-z]/gi, '');
};
String.prototype.testLengthFour = function () {
  return /^[^\s]{4}$/.test(this);
};

//View
document.getElementById('view').onclick = view;
let brandTable;
function view() {
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('injectionBoxes').style.display = 'none';
  document.getElementById('attView').style.display = 'grid';
  document.getElementById('addBoxes').style.display = 'none';

  axios
    .post('/api/brand/fin/get', { active: false })
    .then((res) => {
      let tableData = res.data;
      brandTable = new Tabulator('#list', {
        height: '100%',
        layout: 'fitDataStretch',
        resizableColumns: false,
        layoutColumnsOnNewData: true,
        responsiveLayoutCollapseStartOpen: false,
        data: tableData,
        columns: [
          {
            title: 'Fin Brand',
            field: 'brndFin',
            hozAlign: 'center',
            frozen: true,
          },
          { title: 'Active', field: 'active', hozAlign: 'center' },
          { title: 'Injection', field: 'injection', hozAlign: 'center' },
          { title: 'Brw Brand', field: 'brndBrw', hozAlign: 'center' },
          { title: 'Pck Brand', field: 'brndPck', hozAlign: 'center' },
          { title: 'Note', field: 'note', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}

//Routes Add
document.getElementById('add').onclick = add;
function add() {
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('injectionBoxes').style.display = 'none';
  document.getElementById('attView').style.display = 'none';
  document.getElementById('addBoxes').style.display = 'grid';

  let dropDown = document.getElementById('brw_id');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brew Brand</option>`;
  api = '/api/brand/brw/get';
  title = 'brand';
  createList(api, dropDown, title);
}
document.getElementById('btnAddClear').addEventListener('click', resetAdd);
function resetAdd(ev) {
  ev.preventDefault();
  document.getElementById('frmAdd').reset();
}
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd);
async function sendAdd(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  var form = document.getElementById('frmAdd');
  let data = {};
  let i;
  for (i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id;
    let name = form.elements[i].value.toProperCase();
    if (id == 'brw_id') {
      name = name.toNonAlpha().toUpperCase();
    } else if (id == 'brand') {
      name = name.toNonAlpha().toUpperCase();
    }
    data[id] = name;
  }
  let fails = await validateAdd(data);
  if (fails.length === 0) {
    axios
      .post('/api/brand/fin', data)
      .then((data) => {
        alert(data.data.brndFin + ' has been added');
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
  let name = data.brand;
  if (!data.brand) {
    failures.push({ input: 'brand', msg: 'Taken' });
  } else {
    let query = '/api/brand/fin/get/name';
    let res = await axios.post(query, { name: name });
    if (res.data.msg !== 'null') {
      failures.push({ input: 'brand', msg: 'Taken' });
    }
  }

  if (data.brand === '') {
    failures.push({ input: 'brand', msg: 'Required Field' });
    data.brand = null;
  } else if (!data.brand.testLengthFour()) {
    failures.push({ input: 'brand', msg: '4 Characters Only' });
  }
  if (data.brw_id === '') {
    failures.push({ input: 'brew brand', msg: 'Required Field' });
    data.brw_id = null;
  }
  if (data.active === '') {
    failures.push({ input: 'active', msg: 'Required Field' });
    data.active = null;
  }
  if (data.injection === '') {
    failures.push({ input: 'injection', msg: 'Required Field' });
    data.injection = null;
  }
  return failures;
}

//Routes Update
document.getElementById('update').onclick = update;
function update() {
  document.getElementById('injectionBoxes').style.display = 'none';
  document.getElementById('attView').style.display = 'none';
  document.getElementById('addBoxes').style.display = 'none';
  document.getElementById('updateBoxes').style.display = 'grid';

  let dropDown = document.getElementsByName('fin_id')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Fin Brand</option>`;
  let api = '/api/brand/fin/get';
  let title = 'brndFin';
  createList(api, dropDown, title);

  dropDown = document.getElementsByName('brw_id')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brew Brand</option>`;
  api = '/api/brand/brw/get';
  title = 'brand';
  createList(api, dropDown, title);
}
document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate);
function resetUpdate(ev) {
  ev.preventDefault();
  document.getElementById('frmUpdate').reset();
}
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate);
async function sendUpdate(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let form = document.getElementById('frmUpdate');
  let data = {};
  let i;

  for (i = 1; i < form.length - 2; i++) {
    let id = form.elements[i].name;
    let name = form.elements[i].value;
    data[id] = name;
  }
  let fails = await validateUpdate(data);

  if (fails.length === 0) {
    let brand = document.getElementsByName('fin_id')[0].value;
    axios
      .patch('/api/brand/fin/' + brand, data)
      .then((data) => {
        alert(data.data.brndFin + ' has been updated');
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
async function validateUpdate(data) {
  let failures = [];
  let name = document.getElementsByName('fin_id')[0].value;
  if (name === '') {
    failures.push({ input: 'brand', msg: 'Required Field' });
  } else if (!name.testLengthFour()) {
    failures.push({ input: 'brand', msg: '4 Characters Only' });
  }
  if (data.brw_id === '') {
    failures.push({ input: 'brew brand', msg: 'Required Field' });
    data.brw_id = null;
  }
  if (data.active === '') {
    failures.push({ input: 'active', msg: 'Required Field' });
    data.active = null;
  }
  if (data.injection === '') {
    failures.push({ input: 'injection', msg: 'Required Field' });
    data.injection = null;
  }
  return failures;
}
document.getElementsByName('fin_id')[0].addEventListener('change', selectBrand);
function selectBrand() {
  let brand = document.getElementsByName('fin_id')[0].value;

  axios.post('/api/brand/fin/get/name', { name: brand }).then((data) => {
    document.getElementsByName('brw_id')[0].value = data.data.brndBrw;
    document.getElementsByName('active')[0].value = data.data.active;
    document.getElementsByName('injection')[0].value = data.data.injection;
    document.getElementsByName('note')[0].value = data.data.note;
  });
}

//Routes ingredient
document.getElementById('ingredientBox').onclick = ingredient;
function ingredient() {
  document.getElementById('injectionBoxes').style.display = 'block';
  document.getElementById('attView').style.display = 'none';
  document.getElementById('addBoxes').style.display = 'none';
  document.getElementById('updateBoxes').style.display = 'none';

  let dropDown = document.getElementsByName('fin_idAdd')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`;
  let api = '/api/brand/fin/ingredient/get';
  let title = 'brndFin';
  createList(api, dropDown, title);

  // dropDown = document.getElementsByName('fin_idUpdate')[0];
  // dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`;
  // createList(api, dropDown, title);

  dropDown = document.getElementsByName('fin_idDelete')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`;
  createList(api, dropDown, title);

  dropDown = document.getElementsByName('com_idAdd')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Ingredient</option>`;
  api = '/api/commodity/get/type/injection';
  title = 'commodity';
  createList(api, dropDown, title);
}

document.getElementById('fin_idAdd').addEventListener('change', selectBrandIngredientAdd);
let ingredientTable;
function selectBrandIngredientAdd() {
  let index = document.getElementsByName('fin_idAdd')[0].selectedIndex;
  let options = document.getElementsByName('fin_idAdd')[0].options;
  let id = options[index].id;

  axios
    .post('/api/commodity/ingredient/bridge/get/' + id)
    .then((res) => {
      let tableData = res.data;
      ingredientTable = new Tabulator('#injRateTable', {
        height: '100%',
        layout: 'fitDataStretch',
        resizableColumns: false,
        layoutColumnsOnNewData: true,
        responsiveLayoutCollapseStartOpen: false,
        data: tableData,
        columns: [
          { title: 'Brand', field: 'brand', hozAlign: 'left', frozen: true },
          { title: 'Commodity', field: 'commodity', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}

document.getElementById('btnIngredientAddSubmit').addEventListener('click', sendBrandIngredientAdd);
function sendBrandIngredientAdd(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let data = {};
  let index = document.getElementsByName('fin_idAdd')[0].selectedIndex;
  let options = document.getElementsByName('fin_idAdd')[0].options;
  data.fin_id = options[index].id;
  if (data.fin_id == '') {
    alert('Finishing brand required');
    return;
  }

  index = document.getElementsByName('com_idAdd')[0].selectedIndex;
  options = document.getElementsByName('com_idAdd')[0].options;
  data.com_id = options[index].id;
  if (data.com_id == '') {
    alert('Ingredient required');
    return;
  }

  axios
    .post('/api/commodity/ingredient/bridge', data)
    .then((data) => {
      alert(data.data.commodity + ' has been added');
      document.getElementsByName('com_idAdd')[0].selectedIndex = 0;
      selectBrandIngredientAdd();
    })
    .catch((err) => alert(err));
}
document.getElementById('btnIngredientAddClear').addEventListener('click', resetBrandIngredientAdd);
function resetBrandIngredientAdd(ev) {
  ev.preventDefault();
  document.getElementById('frmIngredientAdd').reset();
  if (ingredientTable) {
    ingredientTable.clearData();
  }
}

/// Disabled + lines 272, 273, 274
// document.getElementsByName('fin_idUpdate')[0].addEventListener('change', selectBrandIngredientUpdate);
// let ingredientTable;
function selectBrandIngredientUpdate() {
  let index = document.getElementsByName('fin_idUpdate')[0].selectedIndex;
  let options = document.getElementsByName('fin_idUpdate')[0].options;
  let id = options[index].id;

  axios
    .post('/api/commodity/ingredient/bridge/get/' + id)
    .then((res) => {
      let tableData = res.data;
      ingredientTable = new Tabulator('#injRateTable', {
        height: '100%',
        layout: 'fitDataStretch',
        resizableColumns: false,
        layoutColumnsOnNewData: true,
        responsiveLayoutCollapseStartOpen: false,
        data: tableData,
        columns: [
          { title: 'Brand', field: 'brand', hozAlign: 'center', frozen: true },
          { title: 'Commodity', field: 'commodity', hozAlign: 'center' },
          {
            title: 'Rate',
            field: 'rate',
            hozAlign: 'left',
            editor: true,
            validator: ['float'],
          },
        ],
      });
    })
    .catch((err) => console.log(err));
}
// document.getElementById('btnIngredientUpdateSubmit').addEventListener('click', sendBrandIngredientUpdate);
function sendBrandIngredientUpdate(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let data = ingredientTable.getData();

  for (let i = 0; i < data.length; i++) {
    delete data[i].brand;
    delete data[i].commodity;
  }

  axios
    .patch('/api/brand/fin/injection/update', data)
    .then((data) => {
      alert('Injection rates have been updated');
      document.getElementById('frmIngredientUpdate').reset();
      ingredientTable.destroy();
    })
    .catch((err) => alert(err));
}
// document.getElementById('btnIngredientUpdateClear').addEventListener('click', resetBrandIngredientUpdate);
function resetBrandIngredientUpdate(ev) {
  ev.preventDefault();
  document.getElementById('frmIngredientUpdate').reset();
  ingredientTable.destroy();
}

document.getElementById('btnIngredientDeleteSubmit').addEventListener('click', sendBrandIngredientDelete);
function sendBrandIngredientDelete(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let data = {};
  let index = document.getElementsByName('fin_idDelete')[0].selectedIndex;
  let options = document.getElementsByName('fin_idDelete')[0].options;
  data.fin_id = options[index].id;
  if (data.fin_id == '') {
    alert('Finishing brand required');
    return;
  }
  axios
    .delete('/api/commodity/ingredient/bridge/' + data.fin_id)
    .then((data) => {
      alert(data.data.msg);
      document.getElementById('frmIngredientDelete').reset();
      selectBrandIngredientAdd();
    })
    .catch((err) => alert(err));
}
document.getElementById('btnIngredientDeleteClear').addEventListener('click', resetBrandIngredientDelete);
function resetBrandIngredientDelete(ev) {
  ev.preventDefault();
  document.getElementById('frmIngredientDelete').reset();
}
