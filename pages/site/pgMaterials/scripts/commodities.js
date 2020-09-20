document.getElementById('frmAdd').style.display="none"
document.getElementById('frmUpdate').style.display="none"
document.getElementById('frmDelete').style.display="none"
document.getElementById('list').style.display="none"
const api = '/api/brewery'


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
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('frmAdd').style.display="block"

  
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
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('frmUpdate').style.display="block"
  
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
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('list').style.display="block"
  
  axios.get('/api/commodity')
    .then(res => {
      let tableData = res.data

      commodityTable = new Tabulator("#list", {
        height:"330px",
        layout:"fitDataFill",
        responsiveLayout:"collapse",
        responsiveLayoutCollapseStartOpen:false,
        data:tableData,
        columns:[
        {formatter:"responsiveCollapse", width:30, minWidth:30, hozAlign:"center", resizable:false, headerSort:false},
        {title:"Commodity", field:"commodity",hozAlign:"center", width:150, responsive:2},
        {title:"SAP", field:"sap",hozAlign:"center", width:115, responsive:2},
        {title:"Active", field:"active",hozAlign:"center", width:115, responsive:2},
        {title:"Inventory", field:"inventory",hozAlign:"center", width:115, responsive:2},
        {title:"Location", field:"location",hozAlign:"center", width:115, responsive:2},
        {title:"Company", field:"company",hozAlign:"center", width:115, responsive:2},
        {title:"Type", field:"type",hozAlign:"center", width:115, responsive:2},
        {title:"Container", field:"container",hozAlign:"center", width:115, responsive:2},
        {title:"Environmental", field:"enviro",hozAlign:"center", width:115, responsive:2},
        {title:"Threshold", field:"threshold",hozAlign:"center", width:115, responsive:2},
        {title:"Per Pallet", field:"per_pallet",hozAlign:"center", width:115, responsive:2},
        {title:"Unit Total", field:"unit_total",hozAlign:"center", width:115, responsive:2},
        {title:"UOM", field:"uom",hozAlign:"center", width:115, responsive:2},
        {title:"Note", field:"note",hozAlign:"center", width:150, responsive:2},
        ],
      })
    })
    .catch(err => console.log(err))
  document.getElementById('list').style.display="block"
}
function del() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('frmDelete').style.display="block"
  document.getElementById('list').style.display="none"

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
  
  let fails = await validateAdd()
  if(fails.length === 0) {  
    const form = document.getElementById('frmAdd')
    let data = {}
    let i
  
    for (i = 0; i < form.length - 2; i++) {
      let id = form.elements[i].id
      let name = form.elements[i].value
      data[id] = name
    }
    
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
      // alert(JSON.stringify(fails))
    }
}
async function validateAdd (ev){
  let failures = []

  
  let commodity = document.getElementById('commodity').value
  let sap = document.getElementById('sap').value
  let active = document.getElementById('active').value
  let inventory = document.getElementById('inventory').value
  let location = document.getElementById('location_id').value
  let supplier = document.getElementById('supplier_id').value
  let type = document.getElementById('type_id').value
  let container = document.getElementById('container_id').value
  let enviro = document.getElementById('enviro_id').value
  let threshold = document.getElementById('threshold').value
  let pallet = document.getElementById('per_pallet').value
  let unit = document.getElementById('unit_total').value
  let uom = document.getElementById('uom_id').value
  

  let query = '/api/commodity/' + commodity

  let res = await axios.get(query)

  if(res.data.msg !== 'null') {
    failures.push({input:'name', msg:'Taken'})
  } 

  if(commodity === ""){
      failures.push({input:'commodity', msg:'Required'})
  } 
  if(sap === ""){
      failures.push({input:'sap', msg:'Required'})
  } 
  if(active === ""){
      failures.push({input:'active', msg:'Required'})
  } 
  if(inventory === ""){
      failures.push({input:'inventory', msg:'Required'})
  } 
  if(location === ""){
      failures.push({input:'location', msg:'Required'})
  } 
  if(supplier === ""){
      failures.push({input:'supplier', msg:'Required'})
  } 
  if(type === ""){
      failures.push({input:'type', msg:'Required'})
  } 
  if(container === ""){
      failures.push({input:'container', msg:'Required'})
  } 
  if(enviro === ""){
      failures.push({input:'enviro', msg:'Required'})
  }
  if(threshold === ""){
    failures.push({input:'threshold', msg:'Required'})
} 
  if(isNaN(threshold)){
      failures.push({input:'threshold', msg:'Not A Number'})
  }
  if(pallet === ""){
    failures.push({input:'pallet', msg:'Required'})
}
  if(isNaN(pallet)){
      failures.push({input:'pallet', msg:'Not A Number'})
  }
  if(unit === ""){
    failures.push({input:'unit', msg:'Required'})
} 
  if(isNaN(unit)){
      failures.push({input:'unit', msg:'Not A Number'})
  } 
  if(uom === ""){
      failures.push({input:'uom', msg:'Required'})
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

  let fails = await validateUpdate()
  if(fails.length === 0) {
    let form = document.getElementById('frmUpdate')
    let data = {}
    let i

    for (i = 1; i < form.length - 2; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value
    data[id] = name
    }
    console.log(data)
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
      // alert(JSON.stringify(fails))
    }
    
}
function validateUpdate(ev){
  let failures = [];
  
  let commodity = document.getElementsByName('updateCommodity')[0].value
  let sap = document.getElementsByName('updateSap')[0].value
  let active = document.getElementsByName('updateActive')[0].value
  let inventory = document.getElementsByName('updateInventory')[0].value
  let location = document.getElementsByName('updateLocation_id')[0].value
  let supplier = document.getElementsByName('updateSupplier_id')[0].value
  let type = document.getElementsByName('updateType_id')[0].value
  let container = document.getElementsByName('updateContainer_id')[0].value
  let enviro = document.getElementsByName('updateEnviro_id')[0].value
  let threshold = document.getElementsByName('updateThreshold')[0].value
  let pallet = document.getElementsByName('updatePer_pallet')[0].value
  let unit = document.getElementsByName('updateUnit_total')[0].value
  let uom = document.getElementsByName('updateUom_id')[0].value
  

  if(commodity === ""){
      failures.push({input:'commodity', msg:'Required'})
  } 
  if(sap === ""){
      failures.push({input:'sap', msg:'Required'})
  } 
  if(active === ""){
      failures.push({input:'active', msg:'Required'})
  } 
  if(inventory === ""){
      failures.push({input:'inventory', msg:'Required'})
  } 
  if(location === ""){
      failures.push({input:'location', msg:'Required'})
  } 
  if(supplier === ""){
      failures.push({input:'supplier', msg:'Required'})
  } 
  if(type === ""){
      failures.push({input:'type', msg:'Required'})
  } 
  if(container === ""){
      failures.push({input:'container', msg:'Required'})
  } 
  if(enviro === ""){
      failures.push({input:'enviro', msg:'Required'})
  }
  if(threshold === ""){
    failures.push({input:'threshold', msg:'Required'})
} 
  if(isNaN(threshold)){
      failures.push({input:'threshold', msg:'Not A Number'})
  }
  if(pallet === ""){
    failures.push({input:'pallet', msg:'Required'})
}
  if(isNaN(pallet)){
      failures.push({input:'pallet', msg:'Not A Number'})
  }
  if(unit === ""){
    failures.push({input:'unit', msg:'Required'})
} 
  if(isNaN(unit)){
      failures.push({input:'unit', msg:'Not A Number'})
  } 
  if(uom === ""){
      failures.push({input:'uom', msg:'Required'})
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

// document.getElementById("print-table").addEventListener("click", function(){
//   commodityTable.print(false, true);
// });

// document.getElementById("download-xlsx").addEventListener("click", function(){
//   commodityTable.download("xlsx", "data.xlsx", {sheetName:"My Data"});
// });