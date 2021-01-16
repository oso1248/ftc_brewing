let DateTime = luxon.DateTime

document.getElementById('tableWeeklyDiv').style.display='none'
document.getElementById('tableMonthlyDiv').style.display='none'
document.getElementById('invWeekly').style.display='none'
document.getElementById('invMonthly').style.display='none'


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


// View weekly
document.getElementById('viewWeekly').onclick = viewWeekly
function viewWeekly() {
  document.getElementById('invWeekly').style.display='block'
  document.getElementById('invMonthly').style.display='none'
  weeklyDates()
}
function weeklyDates() {
  let invDates = document.getElementById('selWeekly')
  invDates.innerHTML = `<option value="" disabled selected hidden>Select Date</option>`
  axios.post('/api/inventory/material/weekly/date')
    .then(data => {
      let invDate = data.data.rows
      return invDate.map(listItem => {
        let invDate = createNode('option')
        invDate.innerHTML = DateTime.fromISO(listItem.date_trunc).toFormat('yyyy-MM-dd')
        append(invDates, invDate)
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('selWeekly').addEventListener('change', weeklyMatTable)
let weeklyTable
function weeklyMatTable() {
  let dt = document.getElementById('selWeekly').value
  let data = {}
  data.startDate = DateTime.fromISO(dt).startOf('day').minus({days: 0}).toFormat('yyyy-MM-dd HH:mm')
  data.endDate = DateTime.fromISO(dt).endOf('day').toFormat('yyyy-MM-dd HH:mm')
  
  axios.post('/api/inventory/material/weekly/view', data)
    .then(res => {
    for(let i = 0; i < res.data.length; i++) {
      res.data[i].created_at = DateTime.fromISO(res.data[i].created_at).toFormat('yyyy-MM-dd')
    }
      let tableData = res.data
      weeklyTable = new Tabulator('#tableWeekly', {
        printHeader:'<h1>Weekly Material Inventory<h1>',
        height:'309px',
        layout:'fitDataStretch',
        data:tableData,
        columns:[
        {title:'Commodity', field:'commodity',hozAlign:'center', frozen:true},
        {title:'SAP', field:'sap', hozAlign:'center'},
        {title:'Per Unit', field:'total_per_unit',hozAlign:'center'},
        {title:'Units', field:'total_count',hozAlign:'center'},
        {title:'Total', field:'total_end',hozAlign:'center'},
        {title:'Username', field:'username',hozAlign:'center'},
        {title:'Date', field:'created_at',hozAlign:'center'},
        {title:'Note', field:'note',hozAlign:'left'},
        ],
      })
    })
    .catch(err => console.log(err.detail))
    document.getElementById('tableWeeklyDiv').style.display='block'
}
document.getElementById('weeklyDownload-xlsx').addEventListener('click', weeklyExcel)
function weeklyExcel(){
  weeklyTable.download('xlsx', 'weekly_inv.xlsx', {sheetName:'inv'})
}
document.getElementById('weeklyPrint-table').addEventListener('click', weeklyPrint)
function weeklyPrint(){
  weeklyTable.print(false, true);
}



// view monthly
document.getElementById('viewMonthly').onclick = viewMonthly
function viewMonthly() {
  document.getElementById('invWeekly').style.display='none'
  document.getElementById('invMonthly').style.display='block'
  monthlyDates()
}
function monthlyDates() {
  let invDates = document.getElementById('selMonthly')
  invDates.innerHTML = `<option value="" disabled selected hidden>Select Date</option>`
  axios.post('/api/inventory/material/monthly/date')
    .then(data => {
      let invDate = data.data.rows
      return invDate.map(listItem => {
        let invDate = createNode('option')
        invDate.innerHTML = DateTime.fromISO(listItem.date_trunc).toFormat('yyyy-MM-dd')
        append(invDates, invDate)
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('selMonthly').addEventListener('change', monthlyMatTable)
let monthlyTable
function monthlyMatTable() {
  let dt = document.getElementById('selMonthly').value
  let data = {}
  data.startDate = DateTime.fromISO(dt).startOf('day').minus({days: 0}).toFormat('yyyy-MM-dd HH:mm')
  data.endDate = DateTime.fromISO(dt).endOf('day').toFormat('yyyy-MM-dd HH:mm')
  
  axios.post('/api/inventory/material/monthly/view', data)
    .then(res => {
    for(let i = 0; i < res.data.length; i++) {
      res.data[i].created_at = DateTime.fromISO(res.data[i].created_at).toFormat('yyyy-MM-dd')
    }
      let tableData = res.data
      monthlyTable = new Tabulator('#tableMonthly', {
        printHeader:'<h1>Monthly Material Inventory<h1>',
        height:'309px',
        layout:'fitDataStretch',
        data:tableData,
        columns:[
        {title:'Commodity', field:'commodity',hozAlign:'center', frozen:true},
        {title:'SAP', field:'sap', hozAlign:'center'},
        {title:'Per Unit', field:'total_per_unit',hozAlign:'center'},
        {title:'Units', field:'total_count',hozAlign:'center'},
        {title:'Total', field:'total_end',hozAlign:'center'},
        {title:'Username', field:'username',hozAlign:'center'},
        {title:'Date', field:'created_at',hozAlign:'center'},
        {title:'Note', field:'note',hozAlign:'left'},
        ],
      })
    })
    .catch(err => console.log(err.detail))
    document.getElementById('tableMonthlyDiv').style.display='block'
}
document.getElementById('monthlyDownload-xlsx').addEventListener('click', monthlyExcel)
function monthlyExcel(){
  monthlyTable.download('xlsx', 'monthly_inv.xlsx', {sheetName:'inv'})
}
document.getElementById('monthlyPrint-table').addEventListener('click', monthlyPrint)
function monthlyPrint(){
  monthlyTable.print(false, true);
}

// window.addEventListener('DOMContentLoaded', (ev) => { invDates() }) 