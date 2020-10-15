document.getElementById('addBoxes').style.display="none"
document.getElementById('updateBoxes').style.display="none"
document.getElementById('deleteBoxes').style.display="none"
document.getElementById('attView').style.display="none"
const api = '/api/brewery'


String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + 
    txt.substr(1).toLowerCase()})
}
String.prototype.toNonAlpha = function (spaces) {
  if(spaces === '') {
    return this.replace(/[^\w\s]/gi, '').replace(/ +(?= )/g,'')
  } else {
    return this.replace(/[^0-9a-z]/gi, '')
  }
}
String.prototype.testNanFormat = function () {
  return (/^\d+(\.\d{1,2})?$/).test(this)
}

function createNode(element) {
  return document.createElement(element)
};
function append(parent, e1) {
  return parent.appendChild(e1)
};
function createList(api, parent, title) {
  axios.get(api)
  .then(res => {
    let list = res.data
    list.forEach((elem) => {
    let listItem = elem[title]
    let option = createNode('option')
    option.innerHTML = listItem
    // option.id = listItem
    append(parent, option)
    });
  })
  .catch(err => {
    console.error(err)
  })
}
function createListID(api, parent, title) {
  axios.get(api)
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
function commodity(dropDown){
  const api = '/api/commodity'
  let title = 'commodity'
  createList(api, dropDown, title)
}
function supplier(dropDown, func){
  const api = '/api/supplier'
  let title = 'company'
  func(api, dropDown, title)
}
function locations(dropDown, func){
  const api = '/api/location'
  let title = 'location'
  func(api, dropDown, title)
}
function type(dropDown, func){
  const api = '/api/type'
  let title = 'type'
  func(api, dropDown, title)
}
function container(dropDown, func){
  const api = '/api/container'
  let title = 'container'
  func(api, dropDown, title)
}
function environmental(dropDown, func){
  const api = '/api/enviro'
  let title = 'enviro'
  func(api, dropDown, title)
}
function uom(dropDown, func){
  const api = '/api/uom'
  let title = 'uom'
  func(api, dropDown, title)
}

// Views
function add() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="block"
  
  let dropDown = document.getElementById('supplier_id')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Supplier</option>`
  supplier(dropDown, createList)
  dropDown = document.getElementById('location_id')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Location</option>`
  locations(dropDown, createList)
  dropDown = document.getElementById('type_id')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Type</option>`
  type(dropDown, createList)
  dropDown = document.getElementById('container_id')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Container</option>`
  container(dropDown, createList)
  dropDown = document.getElementById('enviro_id')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Environmental</option>`
  environmental(dropDown, createList)
  dropDown = document.getElementById('uom_id')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select UOM</option>`
  uom(dropDown, createList)
}
function update() {
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="grid"
  
  let dropDown = document.getElementsByName('updateCommodity')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Commodity</option>`
  commodity(dropDown)
  dropDown = document.getElementsByName('updateSupplier_id')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Supplier</option>`
  supplier(dropDown, createListID)
  dropDown = document.getElementsByName('updateLocation_id')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Location</option>`
  locations(dropDown, createListID)
  dropDown = document.getElementsByName('updateType_id')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Type</option>`
  type(dropDown, createListID)
  dropDown = document.getElementsByName('updateContainer_id')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Container</option>`
  container(dropDown, createListID)
  dropDown = document.getElementsByName('updateEnviro_id')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Environmental</option>`
  environmental(dropDown, createListID)
  dropDown = document.getElementsByName('updateUom_id')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select UOM</option>`
  uom(dropDown, createListID)
}
let commodityTable
function view() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="block"
  document.getElementById('addBoxes').style.display="none"

  axios.get('/api/commodity')
    .then(res => {
      let tableData = res.data

      commodityTable = new Tabulator("#list", {
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Commodity", field:"commodity",hozAlign:"center", frozen:true},
        {title:"SAP", field:"sap",hozAlign:"center"},
        {title:"Active", field:"active",hozAlign:"center"},
        {title:"Inventory", field:"inventory",hozAlign:"center"},
        {title:"Location", field:"location",hozAlign:"center"},
        {title:"Company", field:"company",hozAlign:"center"},
        {title:"Type", field:"type",hozAlign:"center"},
        {title:"Container", field:"container",hozAlign:"center"},
        {title:"Environmental", field:"enviro",hozAlign:"center"},
        {title:"Threshold", field:"threshold",hozAlign:"center"},
        {title:"Per Pallet", field:"per_pallet",hozAlign:"center"},
        {title:"Unit Total", field:"unit_total",hozAlign:"center"},
        {title:"UOM", field:"uom",hozAlign:"center"},
        {title:"Note", field:"note",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
  document.getElementById('list').style.display="block"
}
function del() {
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="block"

  const users = document.getElementsByName('deleteCommodity')[0]
  users.innerHTML = `<option value="" disabled selected hidden>Select Commodity</option>`
  axios.get('/api/commodity')
  .then(data => {
    let user = data.data
    
    return user.map(listItem => {
      let username = createNode('option')
      username.innerHTML = listItem.commodity
      
      append(users, username)
    })
  })
  .catch(err => console.log(err))
}


// routes add
function resetAdd(ev){
  ev.preventDefault();
  document.getElementById('frmAdd').reset();
}
async function sendAdd(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  const form = document.getElementById('frmAdd')
  let data = {}
  let i
  for (i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value
    data[id] = name
  }
  let fails = await validateAdd(data)
  if(fails.length === 0) {  
    axios.post('/api/commodity', data)
      .then(data => {
        alert(data.data.commodity + ' has been added')
      })
      .catch(err => alert(err))
  } else {
    let msg = "Problems:\n"
    for(i = 0; i < fails.length; i++) {
       msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
    }
    alert(msg)
  }
}
async function validateAdd (data){
  let failures = []

  data.commodity = data.commodity.toNonAlpha('').toProperCase()
  let query = '/api/commodity/' + data.commodity
  let res = await axios.get(query)

  if(res.data.msg !== 'null') {
    failures.push({input:'name', msg:'Taken'})
  }

  if(data.commodity === ""){
      failures.push({input:'commodity', msg:'Required'})
      data.commodity = null
  } else {
    data.commodity = data.commodity.toNonAlpha('').toProperCase()
  }

  if(data.sap === ""){
      failures.push({input:'sap', msg:'Required'})
      data.sap = null
  } else {
    data.sap = data.sap.toNonAlpha()
  }

  if(data.active === ""){
    failures.push({input:'active', msg:'Required'})
    data.active = null
  }

  if(data.inventory === ""){
    failures.push({input:'inventory', msg:'Required'})
    data.inventory = null
  } 
  if(data.location_id === ""){
    failures.push({input:'location', msg:'Required'})
    data.location_id = null
  } 
  if(data.supplier_id === ""){
    failures.push({input:'supplier', msg:'Required'})
    data.supplier_id = null
  } 
  if(data.type_id === ""){
    failures.push({input:'type', msg:'Required'})
    data.type_id = null
  } 
  if(data.container_id === ""){
    failures.push({input:'container', msg:'Required'})
    data.container_id = null
  } 
  if(data.enviro_id === ""){
    failures.push({input:'enviro', msg:'Required'})
    data.enviro_id = null
  }

  if(data.threshold === ""){
    failures.push({input:'threshold', msg:'Required'})
    data.threshold = null
  } else if(!data.threshold.testNanFormat()) {
    failures.push({input:'threshold', msg:'To 2 Decimals Only'})
    data.threshold = null
  } 
  
  if(data.per_pallet === ""){
    failures.push({input:'pallet', msg:'Required'})
    data.per_pallet = null
  } else if(!data.per_pallet.testNanFormat()) {
    failures.push({input:'pallet', msg:'To 2 Decimals Only'})
    data.per_pallet = null
  }
  
  if(data.unit_total === ""){
    failures.push({input:'unit', msg:'Required'})
    data.unit_total = null
  } else if(!data.unit_total.testNanFormat()) {
    failures.push({input:'unit total', msg:'To 2 Decimals Only'})
  } 
  
  if(data.uom_id === ""){
    failures.push({input:'uom', msg:'Required'})
    data.uom_id = null
  } 
  return failures
}

// routes update
function resetUpdate(ev){
  ev.preventDefault();
  document.getElementById('frmUpdate').reset();
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
  console.log(data)
  if(fails.length === 0) {
    
    let name = document.getElementsByName('updateCommodity')[0].value
    axios.patch('/api/commodity/' + name, data)
      .then(data => {
        alert(data.data.commodity + ' updated')
      })
      .catch(err => alert(err))
    } else {
      let msg = "Problems:\n"
      for(i = 0; i < fails.length; i++) {
        msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
      }
      alert(msg)
    }
    
}
function validateUpdate(data){
  let failures = []

  let name = document.getElementsByName('updateCommodity')[0].value
  if(name === '') {
    failures.push({input:'commodity', msg:'Required'})
  }
    
  if(data.sap === ''){
    failures.push({input:'sap', msg:'Required'})
  } else {
    data.sap = data.sap.toNonAlpha()
  }

  if(data.active === ''){
    failures.push({input:'active', msg:'Required'})
    data.active = null
  }
  if(data.inventory === ''){
    failures.push({input:'inventory', msg:'Required'})
    data.inventory = null
  } 
  if(data.location_id === ''){
    failures.push({input:'location', msg:'Required'})
    data.location_id = null
  } 
  if(data.supplier_id === ''){
    failures.push({input:'supplier', msg:'Required'})
    data.supplier_id = null
  } 
  if(data.type_id === ''){
    failures.push({input:'type', msg:'Required'})
    data.type_id = null
  } 
  if(data.container_id === ''){
    failures.push({input:'container', msg:'Required'})
    data.container_id = null
  } 
  if(data.enviro_id === ''){
    failures.push({input:'enviro', msg:'Required'})
    data.enviro_id = null
  }

  if(data.threshold === ""){
    failures.push({input:'threshold', msg:'Required'})
    data.threshold = null
  } else if(!data.threshold.testNanFormat()) {
    failures.push({input:'threshold', msg:'To 2 Decimals Only'})
    data.threshold = null
  }

  if(data.per_pallet === ""){
    failures.push({input:'pallet', msg:'Required'})
    data.per_pallet = null
  } else if(!data.per_pallet.testNanFormat()) {
    failures.push({input:'pallet', msg:'To 2 Decimals Only'})
    data.per_pallet = null
  }

  if(data.unit_total === ""){
    failures.push({input:'unit', msg:'Required'})
    data.unit_total = null
  } else if(!data.unit_total.testNanFormat()) {
    failures.push({input:'unit total', msg:'To 2 Decimals Only'})
  }

  if(data.uom_id === ''){
    failures.push({input:'uom', msg:'Required'})
    data.uom_id = null
  } 
  return failures
}
function selectCommodity(){
  let commodity = document.getElementsByName('updateCommodity')[0].value
  
  axios.get('/api/commodity/' + commodity)
    .then(data => {
      document.getElementById(data.data.location).selected = 'selected'
      document.getElementById(data.data.type).selected = 'selected'
      document.getElementById(data.data.company).selected = 'selected'
      document.getElementById(data.data.enviro).selected = 'selected'
      document.getElementById(data.data.container).selected = 'selected'
      document.getElementById(data.data.uom).selected = 'selected'
      document.getElementById(data.data.inventory).selected = 'selected'
      document.getElementsByName('updateSap')[0].value = data.data.sap
      document.getElementsByName('updateActive')[0].value = data.data.active
      document.getElementsByName('updateThreshold')[0].value = data.data.threshold
      document.getElementsByName('updatePer_pallet')[0].value = data.data.per_pallet
      document.getElementsByName('updateUnit_total')[0].value = data.data.unit_total
      document.getElementsByName('updateNote')[0].value = data.data.note
    })
}

//  routes delete
function resetDelete(ev){
  ev.preventDefault();
  document.getElementById('frmDelete').reset();
}
function sendDelete(ev) {
  ev.preventDefault() 
  ev.stopPropagation()

  const name = document.getElementsByName('deleteCommodity')[0].value

  axios.delete('/api/commodity/' + name)
    .then(data => alert(data.data.msg))
  .catch(err => alert(err))
}


document.getElementById('btnAddClear').addEventListener('click', resetAdd)
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)

document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate)
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate)
document.getElementsByName('updateCommodity')[0].addEventListener('change', selectCommodity)



document.getElementById('btnDeleteClear').addEventListener('click', resetDelete)
document.getElementById('btnDeleteSubmit').addEventListener('click', sendDelete)

document.getElementById('add').onclick = add
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view
document.getElementById('delete').onclick = del

document.getElementById('download-xlsx').addEventListener('click', supplierExcel)
function supplierExcel(){
  commodityTable.download("xlsx", "commodities.xlsx", {sheetName:"Commodities"})
}

document.getElementById("print-table").addEventListener('click', supplierPrint)
function supplierPrint(){
  commodityTable.print(false, true);
}