let DateTime = luxon.DateTime

document.getElementById('tableWeeklyDiv').style.display="none"
document.getElementById('tableMonthlyDiv').style.display="none"
document.getElementById('invWeekly').style.display="none"
document.getElementById('invMonthly').style.display="none"


function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
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
  axios.post('/api/inventory/hop/weekly/dates')
    .then(data => {
      let invDate = data.data
      return invDate.map(listItem => {
        let invDate = createNode('option')
        invDate.innerHTML = DateTime.fromISO(listItem.date_trunc).plus({day: 1}).toFormat('yyyy-MM-dd')
        append(invDates, invDate)
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('selWeekly').addEventListener('change', () => {
  let dt = document.getElementById('selWeekly').value
  weeklyHopTableFunc(dt)
  weeklyMatTableFunc(dt)
  weeklyCombinedTableFunc(dt)
  document.getElementById('tableWeeklyDiv').style.display='block'
})
let weeklyHopTable
function weeklyHopTableFunc(dt) {
  let data = {}
  data.startDate = DateTime.fromISO(dt).startOf('day').minus({minutes: 510}).toFormat('yyyy-MM-dd HH:mm')
  data.endDate = DateTime.fromISO(dt).startOf('day').minus({minutes: 30}).toFormat('yyyy-MM-dd HH:mm')

  axios.post('/api/inventory/hop/weekly/view', data)
    .then(res => {
    for(let i = 0; i < res.data.length; i++) {
      res.data[i].created_at = DateTime.fromISO(res.data[i].created_at).toFormat('yyyy-MM-dd')
    }
      let tableData = res.data
      weeklyHopTable = new Tabulator('#tableHopWeekly', {
        printHeader:'<h1>Weekly Hop Inventory<h1>',
        height:'309px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Commodity', field:'commodity',hozAlign:'center', frozen:true},
        {title:'SAP', field:'sap', hozAlign:'center'},
        {title:'Total', field:'lbs',hozAlign:'center'},
        {title:'Username', field:'username',hozAlign:'center'},
        {title:'Date', field:'created_at',hozAlign:'center'},
        ],
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('weeklyHopDownload-xlsx').addEventListener('click', ()=> {
  weeklyHopTable.download('xlsx', 'weekly_inv.xlsx', {sheetName:'inv'})
})
document.getElementById('weeklyHopPrint-table').addEventListener('click', () => {
  weeklyHopTable.print(false, true);
})


let weeklyMatTable
function weeklyMatTableFunc(dt) {
  let data = {}
  data.startDate = DateTime.fromISO(dt).startOf('day').minus({minutes: 0}).toFormat('yyyy-MM-dd HH:mm')
  data.endDate = DateTime.fromISO(dt).startOf('day').plus({minutes: 1439}).toFormat('yyyy-MM-dd HH:mm')
  
  axios.post('/api/inventory/material/weekly/view', data)
    .then(res => {
    for(let i = 0; i < res.data.length; i++) {
      res.data[i].created_at = DateTime.fromISO(res.data[i].created_at).toFormat('yyyy-MM-dd')
    }
      let tableData = res.data    
      weeklyMatTable = new Tabulator('#tableMatWeekly', {
        printHeader:'<h1>Weekly Hop Inventory<h1>',
        height:'309px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Commodity', field:'commodity',hozAlign:'center', frozen:true},
        {title:'SAP', field:'sap', hozAlign:'center'},
        {title:'Total', field:'total_end',hozAlign:'center'},
        {title:'Username', field:'username',hozAlign:'center'},
        {title:'Date', field:'created_at',hozAlign:'center'},
        ],
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('weeklyMatDownload-xlsx').addEventListener('click', ()=> {
  weeklyMatTable.download('xlsx', 'weekly_inv.xlsx', {sheetName:'inv'})
})
document.getElementById('weeklyMatPrint-table').addEventListener('click', () => {
  weeklyMatTable.print(false, true);
})



let weeklyCombinedTable
function weeklyCombinedTableFunc(dt) {
  let data = {}
  data.startHop = DateTime.fromISO(dt).startOf('day').minus({minutes: 510}).toFormat('yyyy-MM-dd HH:mm')
  data.endHop = DateTime.fromISO(dt).startOf('day').minus({minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  data.startMat = DateTime.fromISO(dt).startOf('day').minus({minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  data.endMat = DateTime.fromISO(dt).startOf('day').plus({minutes: 1439}).toFormat('yyyy-MM-dd HH:mm')
  
  axios.post('/api/inventory/combined/weekly/brw/view', data)
    .then(res => {
    for(let i = 0; i < res.data.length; i++) {
      res.data[i].created_at = DateTime.fromISO(res.data[i].created_at).toFormat('yyyy-MM-dd')
    }
      let tableData = res.data.rows    
      weeklyCombinedTable = new Tabulator('#tableCombinedWeekly', {
        printHeader:'<h1>Weekly Combined Inventory<h1>',
        height:'309px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
          {title:'Commodity', field:'commodity',hozAlign:'center', frozen:true},
          {title:'SAP', field:'sap', hozAlign:'center'},
          {title:'Total', field:'total',hozAlign:'center'},
          {title:'UOM', field:'uom', hozAlign:'center'},
          {title:'Added To BIT', field:'complete', hozAlign:'center',editor:true, formatter:'tickCross'},
        ],
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('weeklyCombinedDownload-xlsx').addEventListener('click', ()=> {
  weeklyCombinedTable.download('xlsx', 'weekly_inv.xlsx', {sheetName:'inv'})
})
document.getElementById('weeklyCombinedPrint-table').addEventListener('click', () => {
  weeklyCombinedTable.print(false, true);
})



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
        invDate.innerHTML = DateTime.fromISO(listItem.date_trunc).plus({month: 0}).toFormat('yyyy-MM-dd')
        append(invDates, invDate)
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('selMonthly').addEventListener('change', () => {
  let dt = document.getElementById('selMonthly').value
  monthlyHopTableFunc(dt)
  monthlyMatTableFunc(dt)
  monthlyCombinedTableFunc(dt)
  document.getElementById('tableMonthlyDiv').style.display='block'
})
let monthlyHopTable
function monthlyHopTableFunc(dt) {
  let data = {}
  data.startDate = DateTime.fromISO(dt).startOf('day').minus({minutes: 510}).toFormat('yyyy-MM-dd HH:mm')
  data.endDate = DateTime.fromISO(dt).startOf('day').minus({minutes: 30}).toFormat('yyyy-MM-dd HH:mm')

  axios.post('/api/inventory/hop/monthly/view', data)
    .then(res => {
    for(let i = 0; i < res.data.length; i++) {
      res.data[i].created_at = DateTime.fromISO(res.data[i].created_at).toFormat('yyyy-MM-dd')
    }
      let tableData = res.data
      monthlyHopTable = new Tabulator('#tableHopMonthly', {
        printHeader:'<h1>Monthly Hop Inventory<h1>',
        height:'309px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Commodity', field:'commodity',hozAlign:'center', frozen:true},
        {title:'SAP', field:'sap', hozAlign:'center'},
        {title:'Total', field:'lbs',hozAlign:'center'},
        {title:'Username', field:'username',hozAlign:'center'},
        {title:'Date', field:'created_at',hozAlign:'center'},
        ],
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('monthlyHopDownload-xlsx').addEventListener('click', ()=> {
  monthlyHopTable.download('xlsx', 'monthly_inv.xlsx', {sheetName:'inv'})
})
document.getElementById('monthlyHopPrint-table').addEventListener('click', () => {
  monthlyHopTable.print(false, true);
})


let monthlyMatTable
function monthlyMatTableFunc(dt) {
  let data = {}
  data.startDate = DateTime.fromISO(dt).startOf('day').minus({minutes: 0}).toFormat('yyyy-MM-dd HH:mm')
  data.endDate = DateTime.fromISO(dt).startOf('day').plus({minutes: 1439}).toFormat('yyyy-MM-dd HH:mm')
  
  axios.post('/api/inventory/material/monthly/view', data)
    .then(res => {
    for(let i = 0; i < res.data.length; i++) {
      res.data[i].created_at = DateTime.fromISO(res.data[i].created_at).toFormat('yyyy-MM-dd')
    }
      let tableData = res.data
      monthlyMatTable = new Tabulator('#tableMatMonthly', {
        printHeader:'<h1>Weekly Hop Inventory<h1>',
        height:'309px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Commodity', field:'commodity',hozAlign:'center', frozen:true},
        {title:'SAP', field:'sap', hozAlign:'center'},
        {title:'Total', field:'total_end',hozAlign:'center'},
        {title:'Username', field:'username',hozAlign:'center'},
        {title:'Date', field:'created_at',hozAlign:'center'},
        ],
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('monthlyMatDownload-xlsx').addEventListener('click', ()=> {
  monthlyMatTable.download('xlsx', 'monthly_inv.xlsx', {sheetName:'inv'})
})
document.getElementById('monthlyMatPrint-table').addEventListener('click', () => {
  monthlyMatTable.print(false, true);
})



let monthlyCombinedTable
function monthlyCombinedTableFunc(dt) {
  let data = {}
  data.startHop = DateTime.fromISO(dt).startOf('day').minus({minutes: 510}).toFormat('yyyy-MM-dd HH:mm')
  data.endHop = DateTime.fromISO(dt).startOf('day').minus({minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  data.startMat = DateTime.fromISO(dt).startOf('day').minus({minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  data.endMat = DateTime.fromISO(dt).startOf('day').plus({minutes: 1439}).toFormat('yyyy-MM-dd HH:mm')
  
  axios.post('/api/inventory/combined/monthly/brw/view', data)
    .then(res => {
    for(let i = 0; i < res.data.length; i++) {
      res.data[i].created_at = DateTime.fromISO(res.data[i].created_at).toFormat('yyyy-MM-dd')
    }
      let tableData = res.data.rows    
      monthlyCombinedTable = new Tabulator('#tableCombinedMonthly', {
        printHeader:'<h1>Weekly Combined Inventory<h1>',
        height:'309px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
          {title:'Commodity', field:'commodity',hozAlign:'center', frozen:true},
          {title:'SAP', field:'sap', hozAlign:'center'},
          {title:'Total', field:'total',hozAlign:'center'},
          {title:'UOM', field:'uom', hozAlign:'center'},
          {title:'Added To BIT', field:'complete', hozAlign:'center',editor:true, formatter:'tickCross'},
        ],
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('monthlyCombinedDownload-xlsx').addEventListener('click', ()=> {
  monthlyCombinedTable.download('xlsx', 'monthly_inv.xlsx', {sheetName:'inv'})
})
document.getElementById('monthlyCombinedPrint-table').addEventListener('click', () => {
  monthlyCombinedTable.print(false, true);
})