document.getElementById('addBoxes').style.display="none"
document.getElementById('updateBoxes').style.display="none"
document.getElementById('deleteBoxes').style.display="none"
document.getElementById('attView').style.display="none"

function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}
function createList(api, parent, title) {
  axios.post(api, {active:false})
  .then(res => {
    let list = res.data
    list.forEach((elem) => {
    let listItem = elem[title]
    let option = createNode('option')
    option.innerHTML = listItem
    option.id = listItem
    append(parent, option)
    });
  })
  .catch(err => {
    console.error(err)
  })
}
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + 
    txt.substr(1).toLowerCase()})
}
String.prototype.toNonAlpha = function () {
  return this.replace(/[^0-9a-z]/gi, '')
}
String.prototype.testLengthFour = function () {
  return (/^[^\s]{4}$/).test(this)
}

//Views
function add() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="grid"

  let dropDown = document.getElementById('brw_id')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brew Brand</option>`
  api = '/api/brand/brw/get'
  title = 'brand'
  createList(api, dropDown, title)
}
function update() {
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="grid"

  let dropDown = document.getElementsByName('updateFinBrnd')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Fin Brand</option>`
  let api = '/api/brand/fin/get'
  let title = 'brndFin'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('updateBrwBrnd')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brew Brand</option>`
  api = '/api/brand/brw/get'
  title = 'brand'
  createList(api, dropDown, title)
}
let brandTable
function view() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="grid"
  document.getElementById('addBoxes').style.display="none"

  axios.post('/api/brand/fin/get', {active: false})
    .then(res => {
      let tableData = res.data
      brandTable = new Tabulator("#list", {
        resizableColumns:false,
        height:"309px",
        layout:"fitDataFill",
        responsiveLayoutCollapseStartOpen:false,
        data:tableData,
        columns:[
        // {formatter:"responsiveCollapse", width:30, minWidth:30, hozAlign:"center", resizable:false, headerSort:false},
        {title:"Fin Brand", field:"brndFin",hozAlign:"center", frozen:true},
        {title:"Active", field:"active",hozAlign:"center"},
        {title:"Brw Brand", field:"brndBrw",hozAlign:"center"},
        {title:"Pck Brand", field:"brndPck",hozAlign:"center"},
        {title:"Note", field:"note", hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))

}
function del() {
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="grid"

  let dropDown = document.getElementsByName('delete')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`
  let api = '/api/brand/brw'
  let title = 'brand'
  createList(api, dropDown, title)

}

//Routes Add
function resetAdd(ev){
  ev.preventDefault();
  document.getElementById('frmAdd').reset();
}
async function sendAdd(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  var form = document.getElementById('frmAdd')
  let data = {}
  let i
  for (i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value.toProperCase()
    if(id == 'brw_id'){
      name = name.toNonAlpha().toUpperCase()
    } else if (id == 'brand') {
      name = name.toNonAlpha().toUpperCase()
    }
    data[id] = name
  }
  let fails = await validateAdd(data)
  if(fails.length === 0) {
    axios.post('/api/brand/fin', data)
      .then(data => {
        alert(data.data.brndFin + ' has been added')
      })
      .catch(err => alert(err))
      // .catch(err => console.log(err))
  } else {
    let msg = 'Problems:\n'
    for(i = 0; i < fails.length; i++) {
      msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
    }
    alert(msg)
  }
}
async function validateAdd(data){
  let failures = []
  let name = data.brand
  if(!data.brand) {
    failures.push({input:'brand', msg:'Taken'})
  } else {
    let query = '/api/brand/fin/get/name'
    let res = await axios.post(query, {name: name})
    if(res.data.msg !== 'null') {
      failures.push({input:'brand', msg:'Taken'})  
    }
  }

  if(data.brand === ""){
    failures.push({input:'brand', msg:'Required Field'})
    data.brand = null
  } else if (!data.brand.testLengthFour()) {
      failures.push({input:'brand', msg:'4 Characters Only'})
  }
  if( data.brw_id === ""){
    failures.push({input:'brew brand', msg:'Required Field'})
    data.brw_id = null
  }
  if( data.active === ""){
    failures.push({input:'active', msg:'Required Field'})
    data.active = null
  }
  return failures
}

//Routes Update
function resetUpdate(ev){
  ev.preventDefault();
  document.getElementById('frmUpdate').reset()
}
async function sendUpdate(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  let form = document.getElementById('frmUpdate')
  let data = {}
  let i
  
  for (i = 1; i < form.length - 2; i++) {
  let id = form.elements[i].id
  let name = form.elements[i].value
  data[id] = name
  }
  let fails = await validateUpdate(data)
  if(fails.length === 0) {
    let brand = document.getElementsByName('updateFinBrnd')[0].value
    axios.patch('/api/brand/fin/' + brand, data)
      .then(data => {
        alert(data.data.brndFin + ' has been updated')
        document.getElementById('frmUpdate').reset()
      })
      .catch(err => alert(err))
  } else {
    let msg = 'Problems:\n'
    for(i = 0; i < fails.length; i++) {
      msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
    }
    alert(msg)
  }
}
async function validateUpdate(data){
  let failures = []
  let name = document.getElementsByName('updateFinBrnd')[0].value
  if (name === ""){
    failures.push({input:'brand', msg:'Required Field'})
  } else if (!name.testLengthFour()) {
      failures.push({input:'brand', msg:'4 Characters Only'})
  }
  if( data.brw_id === ""){
    failures.push({input:'brew brand', msg:'Required Field'})
    data.brw_id = null
  }
  if( data.active === ""){
    failures.push({input:'active', msg:'Required Field'})
    data.active = null
  }
  return failures
}
function selectBrand(){
  let brand = document.getElementsByName('updateFinBrnd')[0].value
  
  axios.post('/api/brand/fin/get/name', {name: brand})
    .then(data => {
      document.getElementsByName('updateBrwBrnd')[0].value = data.data.brndBrw
      document.getElementsByName('updateActive')[0].value = data.data.active
      document.getElementsByName('updateNote')[0].value = data.data.note
    })
}

//Routes Delete
function resetDelete(ev){
  ev.preventDefault();
  document.getElementById('frmDelete').reset();
}
async function sendDelete(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  let name = document.getElementsByName('delete')[0].value
  if(name === '') {
    alert('brand Required')
    return
  }

  axios.delete('/api/brand/brw/' + name)
    .then(data => {
      alert(data.data.msg)
    })
    .catch(err => alert(err.detail))
}

//Clear forms add
document.getElementById('btnAddClear').addEventListener('click', resetAdd)
//Clear forms update
document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate)
//Clear forms delete
document.getElementById('btnDeleteClear').addEventListener('click', resetDelete)


//Send forms add
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)
//Send forms Update
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate)
// Send forms delete
document.getElementById('btnDeleteSubmit').addEventListener('click', sendDelete)


document.getElementsByName('updateFinBrnd')[0].addEventListener('change', selectBrand)


document.getElementById('add').onclick = add
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view
// document.getElementById('delete').onclick = del

// document.getElementById('download-xlsx').addEventListener('click', brandExcel)
function brandExcel(){
  brandTable.download("xlsx", "brands.xlsx", {sheetName:"Brands"})
}

// document.getElementById("print-table").addEventListener('click', brandPrint)
function brandPrint(){
  brandTable.print(false, true);
}