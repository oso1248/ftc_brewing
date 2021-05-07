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

//Add
document.getElementById('add').onclick = add;
function add() {
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('deleteBoxes').style.display = 'none';
  document.getElementById('attView').style.display = 'none';
  document.getElementById('addBoxes').style.display = 'grid';
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
  let i;
  for (i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id;
    let name = form.elements[i].value.toProperCase();
    if (id == 'brand') {
      name = name.toNonAlpha().toUpperCase();
    }
    data[id] = name;
  }
  let fails = await validateAdd(data);
  if (fails.length === 0) {
    axios
      .post('/api/brand/brw', data)
      .then((data) => {
        alert(data.data.brand + ' has been added');
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
  console.log('hello');
  let failures = [];
  let name = data.brand;
  if (!data.brand) {
    failures.push({ input: 'brand', msg: 'Taken' });
  } else {
    let query = '/api/brand/brw/name';
    let res = await axios.post(query, { name: name });
    if (res.data.msg !== 'null') {
      failures.push({ input: 'brand', msg: 'Taken' });
    }
  }
  if (data.brand === '') {
    failures.push({ input: 'brand', msg: 'Required Field' });
    data.brand = null;
  }
  if (data.hop_std === '') {
    failures.push({ input: 'standard hops', msg: 'Required Field' });
    data.hop_std = null;
  }
  if (data.hop_crft === '') {
    failures.push({ input: 'craft hops', msg: 'Required Field' });
    data.hop_crft = null;
  }
  if (data.hop_dry === '') {
    failures.push({ input: 'dry hops', msg: 'Required Field' });
    data.hop_dry = null;
  }
  if (data.supr_sac === '') {
    failures.push({ input: 'super sacks', msg: 'Required Field' });
    data.supr_sac = null;
  }
  if (data.active === '') {
    failures.push({ input: 'active', msg: 'Required Field' });
    data.supr_sac = null;
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

  let dropDown = document.getElementsByName('updateBrand')[0];
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`;
  let api = '/api/brand/brw/get';
  let title = 'brand';
  createList(api, dropDown, title);
}
document.getElementById('btnUpdateClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('frmUpdate').reset();
});
document.getElementsByName('updateBrand')[0].addEventListener('change', selectBrand);
function selectBrand() {
  let brand = document.getElementsByName('updateBrand')[0].value;

  axios.post('/api/brand/brw/name', { name: brand }).then((data) => {
    document.getElementsByName('updateStandard')[0].value = data.data.hop_std;
    document.getElementsByName('updateCraft')[0].value = data.data.hop_crft;
    document.getElementsByName('updateDry')[0].value = data.data.hop_dry;
    document.getElementsByName('updateSuper')[0].value = data.data.supr_sac;
    document.getElementsByName('updateActive')[0].value = data.data.active;
    document.getElementsByName('updateNote')[0].value = data.data.note;
  });
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
    let brand = document.getElementsByName('updateBrand')[0].value;
    axios
      .patch('/api/brand/brw/' + brand, data)
      .then((data) => {
        alert(data.data.brand + ' has been updated');
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
  let brand = document.getElementsByName('updateBrand')[0].value;
  if (brand === '') {
    failures.push({ input: 'brand', msg: 'Required Field' });
    data.brand = null;
  }
  if (data.hop_std === '') {
    failures.push({ input: 'standard hops', msg: 'Required Field' });
    data.hop_std = null;
  }
  if (data.hop_crft === '') {
    failures.push({ input: 'craft hops', msg: 'Required Field' });
    data.hop_crft = null;
  }
  if (data.hop_dry === '') {
    failures.push({ input: 'dry hops', msg: 'Required Field' });
    data.hop_dry = null;
  }
  if (data.supr_sac === '') {
    failures.push({ input: 'super sacks', msg: 'Required Field' });
    data.supr_sac = null;
  }
  if (data.active === '') {
    failures.push({ input: 'active', msg: 'Required Field' });
    data.supr_sac = null;
  }
  return failures;
}

//View
let brewTable;
document.getElementById('view').onclick = view;
function view() {
  document.getElementById('updateBoxes').style.display = 'none';
  document.getElementById('deleteBoxes').style.display = 'none';
  document.getElementById('attView').style.display = 'grid';
  document.getElementById('addBoxes').style.display = 'none';

  axios
    .post('/api/brand/brw/get', { active: false })
    .then((res) => {
      let tableData = res.data;
      brewTable = new Tabulator('#list', {
        resizableColumns: false,
        layoutColumnsOnNewData: true,
        height: '100%',
        layout: 'fitDataStretch',
        data: tableData,
        columns: [
          { title: 'Brand', field: 'brand', hozAlign: 'center' },
          { title: 'Active', field: 'active', hozAlign: 'center' },
          { title: 'Standard Hops', field: 'hop_std', hozAlign: 'center' },
          { title: 'Craft Hops', field: 'hop_crft', hozAlign: 'center' },
          { title: 'Dry Hops', field: 'hop_dry', hozAlign: 'center' },
          { title: 'Super Sacks', field: 'supr_sac', hozAlign: 'center' },
          { title: 'Note', field: 'note', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}
