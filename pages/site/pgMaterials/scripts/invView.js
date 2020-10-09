document.getElementById('updateBoxes').style.display="none"
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
function update() {
  document.getElementById('attView').style.display="none"
  document.getElementById('updateBoxes').style.display="grid"
  
  const suppliers = document.getElementsByName('updateCompany')[0]
  suppliers.innerHTML = `<option value="" disabled selected hidden>Select Supplier</option>`
  axios.get('/api/supplier')
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
function invDates() {
  let invDates = document.getElementById('invMatWeekly')
  invDates.innerHTML = `<option value="" disabled selected hidden>Select Date</option>`
  axios.get('/api/inventory/material/date')
    .then(data => {
      let invDate = data.data.rows
      return invDate.map(listItem => {

        let invDate = createNode('option')
        invDate.innerHTML = moment(listItem.date_trunc).add(1,'day').format('YYYY-MM-DD')
        console.log(moment(listItem.date_trunc).add(1,'day').format('YYYY-MM-DD'))
        append(invDates, invDate)
      })
    })
    .catch(err => console.log(err.detail))
}
function view() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('attView').style.display="block"
  invDates()
  
}
let invTable
function invMatTable() {
  let dt = document.getElementById('invMatWeekly').value
  
  let data = {}
  data.startDate = moment(dt).startOf('day').format('YYYY-MM-DD HH:MM')
  data.endDate = moment(dt).endOf('day').format('YYYY-MM-DD HH:MM')
  
  axios.post('/api/inventory/material/view', data)
    .then(res => {
    for(let i = 0; i < res.data.length; i++) {
      res.data[i].created_at = moment(res.data[i].created_at).format('YYYY-MM-DD')
      
    }
      let tableData = res.data
      invTable = new Tabulator("#listView", {
        height:"309px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Commodity", field:"commodity",hozAlign:"center", frozen:true},
        {title:"SAP", field:"sap", hozAlign:"center"},
        {title:"Per Unit", field:"total_per_unit",hozAlign:"center"},
        {title:"Units", field:"total_count",hozAlign:"center"},
        {title:"Total", field:"total_end",hozAlign:"center"},
        {title:"Username", field:"username",hozAlign:"center"},
        {title:"Date", field:"created_at",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err.detail))
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

  if(fails.length === 0) {
    let name = document.getElementsByName('updateCompany')[0].value
    axios.patch('/api/supplier/' + name, data)
      .then(data => {
        alert(data.data.company + ' updated')
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



document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate)
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate)
// document.getElementsByName('updateCompany')[0].addEventListener('change', selectSupplier)
document.getElementById('invMatWeekly').addEventListener('change', invMatTable)

document.getElementById('download-xlsx').addEventListener('click', supplierExcel)
function supplierExcel(){
  supplierTable.download("xlsx", "suppliers.xlsx", {sheetName:"Suppliers"})
}

document.getElementById("print-table").addEventListener('click', supplierPrint)
function supplierPrint(){
  supplierTable.print(false, true);
}

document.getElementById('update').onclick = update
document.getElementById('view').onclick = view

window.addEventListener('DOMContentLoaded', (ev) => {
  invDates() 
}) 