let DateTime = luxon.DateTime

document.getElementById('addBoxes').style.display="none"
document.getElementById('viewBoxes').style.display="none"
document.getElementById('deleteBoxes').style.display="none"


function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}
function createList(api, parent, title) {
  axios.post(api, {active: false})
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


// routes add
document.getElementById('btnAddClear').addEventListener('click', resetAdd)
function resetAdd(ev){
  ev.preventDefault();
  document.getElementById('frmAdd').reset()
}
document.getElementById('add').onclick = add
function add() {
  document.getElementById('addBoxes').style.display="block"
  document.getElementById('viewBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="none"

  let api = '/api/commodity/get'
  let title = 'commodity'
  let dropDown = document.getElementById('com_id')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Commodity</option>`
  createList(api, dropDown, title)

}
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)
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
    axios.post('/api/inventory/material/archive/log/add', data)
      .then(data => {
        alert(data.data[0].commodity + ' has been added')
        // document.getElementById('frmAdd').reset()
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
   
  if(data.com_id === ""){
      failures.push({input:'commodity', msg:'Required'})
      data.com_id = null
  } 
  if(data.count_final === ""){
    failures.push({input:'final count', msg:'Required'})
    data.count_final = null
  }
  if(data.total_end === ""){
    failures.push({input:'end total', msg:'Required'})
    data.total_end = null
  }
  if(data.note === ""){
    failures.push({input:'note', msg:'Required'})
    data.note = null
  }
  return failures
}


// routes View
document.getElementById('view').onclick = view
let tableView
function view() {
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('viewBoxes').style.display="block"
  document.getElementById('deleteBoxes').style.display="none"
  
  axios.post('/api/inventory/material/archive/log/get')
    .then(res => {
      let tableData = res.data
      for(let i = 0; i < res.data.length; i++) {
        tableData[i].created_at = DateTime.fromISO(tableData[i].created_at).toFormat('yyyy-MM-dd')
      }
      tableView = new Tabulator("#ViewTable", {
        resizableColumns:false,
        height:"309px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Commodity", field:"commodity",hozAlign:"center", frozen:true},
        {title:"Final Count", field:"count_final", hozAlign:"center"},
        {title:"End Total", field:"total_end",hozAlign:"center"},
        {title:"Username", field:"username",hozAlign:"center"},
        {title:"Date", field:"created_at",hozAlign:"center"},
        {title:"Note", field:"note",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('btnxcel').addEventListener('click', excel)
function excel(){
  tableView.download("xlsx", "archive.xlsx", {sheetName:"Log"})
}

document.getElementById("btnprint").addEventListener('click', () => {
  tableView.print(false, true);
})


// routes delete
let deleteTable
document.getElementById('delete').onclick = deleteView
function deleteView() {
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('viewBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="block"

  loadDeleteView()

}
function loadDeleteView() {
  axios.post('/api/inventory/material/archive/log/get')
    .then(res => {
      let tableData = res.data
      for(let i = 0; i < res.data.length; i++) {
        tableData[i].created_at = DateTime.fromISO(tableData[i].created_at).toFormat('yyyy-MM-dd')
      }
      deleteTable = new Tabulator("#DeleteTable", {
        resizableColumns:false,
        height:"309px",
        selectable:true,
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Commodity", field:"commodity",hozAlign:"center", frozen:true},
        {title:"Final Count", field:"count_final", hozAlign:"center"},
        {title:"End Total", field:"total_end",hozAlign:"center"},
        {title:"Username", field:"username",hozAlign:"center"},
        {title:"Date", field:"created_at",hozAlign:"center"},
        {title:"Note", field:"note",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err.detail))
  
}
document.getElementById('btnDeleteInv').addEventListener('click', deleteRowInv)
async function deleteRowInv(ev) {
  ev.preventDefault() 
  ev.stopPropagation()
  
  let selectedData = deleteTable.getSelectedData()
  if (selectedData.length > 1) {
    alert('Can only delete 1 row at a time.')
    return
  }
  
  if (!confirm(`Are you sure you want to delete\n\n ${selectedData[0].commodity} \n\nfrom the inventory?`)) {
   return
  }

  await axios.delete('/api/inventory/material/archive/' + selectedData[0].id)
    .then(data => {
      alert(data.data.msg)
    })
    .catch(err => alert(err))

  loadDeleteView()
}


