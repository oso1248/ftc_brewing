document.getElementById('addBoxes').style.display = 'none';
document.getElementById('updateBoxes').style.display = 'none';
document.getElementById('deleteBoxes').style.display = 'none';
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
        option.id = listItem;
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

// Add
document.getElementById('add').onclick = add;
function add() {
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('deleteBoxes').style.display = 'none';
  document.getElementById('attView').style.display = 'none';
  document.getElementById('addBoxes').style.display = 'grid';

  let dropDown = document.getElementById('fin_id');
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Fin Brand</option>`;
  api = '/api/brand/fin/get';
  title = 'brand_fin';
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

  var form = document.getElementById('frmAdd');
  let data = {};

  for (let i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id;
    let name = form.elements[i].value.toProperCase();
    if (id == 'fin_id') {
      name = name.toNonAlpha().toUpperCase();
    } else if (id == 'brand') {
      name = name.toNonAlpha().toUpperCase();
    }
    data[id] = name;
  }

  let fails = await validateAdd(data);
  if (fails.length === 0) {
    axios
      .post('/api/brand/pck', data)
      .then((data) => {
        console.log(data.data);
        alert(`${data.data[0].brand} Has Been Added`);
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
    failures.push({ input: 'brand', msg: 'Required' });
  } else {
    let query = '/api/brand/pck/get/name';
    let res = await axios.post(query, { name: name }).catch((err) => console.log(err));
    if (res.data.msg !== 'null') {
      failures.push({ input: 'brand', msg: 'Taken' });
    }
  }
  if (data.brand === '') {
    failures.push({ input: 'pck brand', msg: 'Required Field' });
    data.brand = null;
  } else if (!data.brand.testLengthFour()) {
    failures.push({ input: 'pck brand', msg: '4 Characters Only' });
  }
  if (data.fin_id === '') {
    failures.push({ input: 'fin brand', msg: 'Required Field' });
    data.brw_id = null;
  }
  if (data.active === '') {
    failures.push({ input: 'active', msg: 'Required Field' });
    data.active = null;
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

  let dropDown = document.getElementsByName('updatePckBrnd')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Pck Brand</option>`;
  let api = '/api/brand/pck/get';
  let title = 'brand_pck';
  createList(api, dropDown, title);

  dropDown = document.getElementsByName('updateFinBrnd')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Fin Brand</option>`;
  api = '/api/brand/fin/get';
  title = 'brand_fin';
  createList(api, dropDown, title);
}
document.getElementById('btnUpdateClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('frmUpdate').reset();
});
document.getElementsByName('updatePckBrnd')[0].addEventListener('change', selectBrand);
function selectBrand() {
  let brand = document.getElementsByName('updatePckBrnd')[0].value;

  axios
    .post('/api/brand/pck/get/name', { name: brand })
    .then((data) => {
      document.getElementsByName('updateFinBrnd')[0].value = data.data[0].brand_fin;
      document.getElementsByName('updateActive')[0].value = data.data[0].active;
      document.getElementsByName('updateNote')[0].value = data.data[0].note;
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
    let brand = document.getElementsByName('updatePckBrnd')[0].value;
    axios
      .patch('/api/brand/pck/' + brand, data)
      .then((data) => {
        alert(`${data.data[0].brand} Has Been Updated`);
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
  let name = document.getElementsByName('updatePckBrnd')[0].value;

  if (name === '') {
    failures.push({ input: 'pck brand', msg: 'Required Field' });
    name = null;
  } else if (!name.testLengthFour()) {
    failures.push({ input: 'pck brand', msg: '4 Characters Only' });
  }
  if (data.fin_id === '') {
    failures.push({ input: 'fin brand', msg: 'Required Field' });
    data.brw_id = null;
  }
  if (data.active === '') {
    failures.push({ input: 'active', msg: 'Required Field' });
    data.active = null;
  }
  return failures;
}

// View
document.getElementById('view').onclick = view;
let brandTable;
function view() {
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('deleteBoxes').style.display = 'none';
  document.getElementById('attView').style.display = 'grid';
  document.getElementById('addBoxes').style.display = 'none';

  axios
    .post('/api/brand/pck/get', { active: false })
    .then((res) => {
      let tableData = res.data;
      brandTable = new Tabulator('#list', {
        resizableColumns: false,
        height: '100%',
        layout: 'fitDataFill',
        responsiveLayoutCollapseStartOpen: false,
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
    .catch((err) => alert(err));
}
