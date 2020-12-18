document.getElementById('addBoxes').style.display="none"
document.getElementById('updateBoxes').style.display="none"
document.getElementById('deleteBoxes').style.display="none"
document.getElementById('attView').style.display="none"
const api = '/api/brewery'


function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}
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


// Views
function add() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="grid"
}
function update() {
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="grid"
  
  const suppliers = document.getElementsByName('updateCompany')[0]
  suppliers.innerHTML = `<option value="" disabled selected hidden>Select Supplier</option>`
  axios.post('/api/supplier/name/all')
  .then(data => {
    let supplier = data.data
    return supplier.map(listItem => {

      let supplier = createNode('option')
      supplier.innerHTML = listItem.company
      
      append(suppliers, supplier)
    })
  })
  .catch(err => console.log(err.detail))
}
let supplierTable
function view() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="block"
  document.getElementById('addBoxes').style.display="none"
  
  axios.post('/api/supplier/name/all')
    .then(res => {
      let tableData = res.data
      supplierTable = new Tabulator("#list", {
        resizableColumns:false,
        height:"309px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Company", field:"company",hozAlign:"center", frozen:true},
        {title:"Contact", field:"contact", hozAlign:"center"},
        {title:"Email", field:"email",hozAlign:"center"},
        {title:"Phone", field:"phone",hozAlign:"center"},
        {title:"Address", field:"address",hozAlign:"center"},
        {title:"Note", field:"note",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err.detail))

  document.getElementById('list').style.display="block"
}
function del() {
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="grid"

  const users = document.getElementsByName('deleteCompany')[0]
  users.innerHTML = `<option value="" disabled selected hidden>Select Supplier</option>`
  axios.get('/api/supplier')
  .then(data => {
    let user = data.data
    return user.map(listItem => {

      let username = createNode('option')
      username.innerHTML = listItem.company
      
      append(users, username)
    })
  })
  .catch(err => console.log(err.detail))
}


// routes add
function resetAdd(ev){
  ev.preventDefault();
  document.getElementById('frmAdd').reset()
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
    axios.post('/api/supplier', data)
      .then(data => {
        alert(data.data.company + ' has been added')
        document.getElementById('frmAdd').reset()
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
  let failures = [];
  data.company = data.company.toNonAlpha('').toProperCase()
  let query = '/api/supplier/' + company
  let res = await axios.get(query)
  
  if(res.data.msg !== 'null') {
    failures.push({input:'name', msg:'Taken'})
  } 

  if(data.company === ""){
      failures.push({input:'company', msg:'Required'})
      data.company = null
  } 
  if(data.contact === ""){
    failures.push({input:'contact', msg:'Required'})
    data.contact = null
  } else {
    data.contact = data.contact.toProperCase()
  }
  
  if(data.email === ""){
    failures.push({input:'email', msg:'Required'})
    data.email = null
  } else {
    data.email = data.email.toLowerCase()
  }

  if(data.phone === ""){
    failures.push({input:'phone', msg:'Required'})
    data.phone = null
  } else {
    data.phone = data.phone.replace(/\D/g,'')
    if (data.phone.length != 10) {
      failures.push({input:'phone', msg:'10 Digits Only'})
    } else {
      data.phone = data.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
    }
  }

  if(data.address === ""){
    failures.push({input:'address', msg:'Required'})
    data.address = null
  } else {
    data.address = data.address.toProperCase()
  }

  if(note === ""){
    failures.push({input:'note', msg:'Required'})
    data.address = null
  }
  return failures
}


// routes update
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
    let name = document.getElementsByName('updateCompany')[0].value
    axios.patch('/api/supplier/' + name, data)
      .then(data => {
        alert(data.data.company + ' updated')
        document.getElementById('frmUpdate').reset()
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
  let failures = [];
  
let company = document.getElementsByName('updateCompany')[0].value
  
if(company === ""){
  failures.push({input:'company', msg:'Required'})
  data.company = null
} 
if(data.contact === ""){
  failures.push({input:'contact', msg:'Required'})
  data.contact = null
} else {
  data.contact = data.contact.toProperCase()
}

if(data.email === ""){
  failures.push({input:'email', msg:'Required'})
  data.email = null
} else {
  data.email = data.email.toLowerCase()
}

if(data.phone === ""){
  failures.push({input:'phone', msg:'Required'})
  data.phone = null
} else {
  data.phone = data.phone.replace(/\D/g,'')
  if (data.phone.length != 10) {
    failures.push({input:'phone', msg:'10 Digits Only'})
  } else {
    data.phone = data.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
  }
}

if(data.address === ""){
  failures.push({input:'address', msg:'Required'})
  data.address = null
} else {
  data.address = data.address.toProperCase()
}

if(note === ""){
  failures.push({input:'note', msg:'Required'})
  data.address = null
}
  return failures
}
function selectSupplier(){
  let company = document.getElementsByName('updateCompany')[0].value
  let contact = document.getElementsByName('updateContact')[0]
  let email = document.getElementsByName('updateEmail')[0]
  let phone = document.getElementsByName('updatePhone')[0]
  let address = document.getElementsByName('updateAddress')[0]
  let note = document.getElementsByName('updateNote')[0]
  axios.post('/api/supplier/name', {name: `${company}`})
    .then(data => {
      contact.value = data.data.contact
      email.value = data.data.email
      phone.value = data.data.phone
      address.value = data.data.address
      note.value = data.data.note
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

  const user = document.getElementsByName('deleteCompany')[0].value

  axios.delete('/api/supplier/' + user)
    .then(data => alert(data.data.msg))
  .catch(err => alert(err.detail))
}



document.getElementById('btnAddClear').addEventListener('click', resetAdd)
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)

document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate)
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate)
document.getElementsByName('updateCompany')[0].addEventListener('change', selectSupplier)


document.getElementById('btnDeleteClear').addEventListener('click', resetDelete)
document.getElementById('btnDeleteSubmit').addEventListener('click', sendDelete)


document.getElementById('download-xlsx').addEventListener('click', supplierExcel)
function supplierExcel(){
  supplierTable.download("xlsx", "suppliers.xlsx", {sheetName:"Suppliers"})
}

document.getElementById("print-table").addEventListener('click', supplierPrint)
function supplierPrint(){
  supplierTable.print(false, true);
}

document.getElementById('add').onclick = add
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view
// document.getElementById('delete').onclick = del