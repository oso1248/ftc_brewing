let DateTime = luxon.DateTime
document.getElementById('boxDay').style.display='none'
document.getElementById('boxWeek').style.display='none'


function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}


// daily
let dailyTableMid
let dailyTableDay
let dailyTableAft
document.getElementById('day').addEventListener('click', viewDay)
function viewDay() {
  document.getElementById('boxDay').style.display='block'
  document.getElementById('boxWeek').style.display='none'
  document.getElementById('dailyTables').style.display='none'
  invDatesDay()
}
function invDatesDay() {
  let invDates = document.getElementById('selDateDay')
  invDates.innerHTML = `<option value="" disabled selected hidden>Select Date</option>`
  axios.post('/api/inventory/hop/daily/dates')
    .then(data => {
      let invDate = data.data
      return invDate.map(listItem => {
        let invDate = createNode('option')
        invDate.innerHTML = DateTime.fromISO(listItem.date_trunc).toFormat('yyyy-MM-dd')
        append(invDates, invDate)
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('selDateDay').addEventListener('change', invDatesDaySelect)
function invDatesDaySelect() {
  let date = document.getElementById('selDateDay').value

  loadTableDailyMid(date)
  loadTableDailyDay(date)
  loadTableDailyAft(date)
  document.getElementById('dailyTables').style.display='grid'
}
function loadTableDailyMid(date) {
  // let mids = DateTime.fromISO(date).minus({hours: 0, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  // let days = DateTime.fromISO(date).plus({hours: 7, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  let mids = DateTime.fromISO(date).minus({hours: 0, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  let days = DateTime.fromISO(date).plus({hours: 7, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  let timeSpan = {}
  timeSpan.startSets = mids
  timeSpan.end = days

  axios.post('/api/inventory/hop/daily/view', timeSpan)
    .then(res => {
      let tableData = res.data
      dailyTableMid = new Tabulator('#dailyMid', {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Hop", field:"commodity",hozAlign:"center", frozen:true},
        {title:"lbs", field:"total",hozAlign:"center"},
        {title:"Name", field:"username",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
}
function loadTableDailyDay(date) {
  // let days = DateTime.fromISO(date).plus({hours: 7, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  // let afts = DateTime.fromISO(date).plus({hours: 15, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  let days = DateTime.fromISO(date).plus({hours: 7, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  let afts = DateTime.fromISO(date).plus({hours: 15, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  let timeSpan = {}
  timeSpan.startSets = days
  timeSpan.end = afts

  axios.post('/api/inventory/hop/daily/view', timeSpan)
    .then(res => {
      let tableData = res.data
      dailyTableDay = new Tabulator('#dailyDay', {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Hop", field:"commodity",hozAlign:"center", frozen:true},
        {title:"lbs", field:"total",hozAlign:"center"},
        {title:"Name", field:"username",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
}
function loadTableDailyAft(date) {
  // let afts = DateTime.fromISO(date).plus({hours: 15, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  // let ends = DateTime.fromISO(date).plus({hours: 23, minutes: 59}).toFormat('yyyy-MM-dd TTT')
  let afts = DateTime.fromISO(date).plus({hours: 15, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  let ends = DateTime.fromISO(date).plus({hours: 23, minutes: 59}).toFormat('yyyy-MM-dd HH:mm')
  let timeSpan = {}
  timeSpan.startSets = afts
  timeSpan.end = ends

  axios.post('/api/inventory/hop/daily/view', timeSpan)
    .then(res => {
      let tableData = res.data
      dailyTableAft = new Tabulator('#dailyAft', {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Hop", field:"commodity",hozAlign:"center", frozen:true},
        {title:"lbs", field:"total",hozAlign:"center"},
        {title:"Name", field:"username",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
}


// weekly
let weeklyTableHard
let weeklyTableSets
let weeklyTableRolling
document.getElementById('week').addEventListener('click', viewWeek)
function viewWeek() {
  document.getElementById('boxDay').style.display='none'
  document.getElementById('boxWeek').style.display='block'
  document.getElementById('weeklyTables').style.display='none'
  invDatesWeek()
}
function invDatesWeek() {
  let invDates = document.getElementById('selDateWeek')
  invDates.innerHTML = `<option value="" disabled selected hidden>Select Date</option>`
  axios.post('/api/inventory/hop/weekly/dates')
    .then(data => {
      let invDate = data.data
      return invDate.map(listItem => {
        let invDate = createNode('option')
        invDate.innerHTML = DateTime.fromISO(listItem.date_trunc).plus({days: 1}).toFormat('yyyy-MM-dd')
        // invDate.innerHTML = DateTime.fromISO(listItem.date_trunc).toFormat('yyyy-MM-dd')
        append(invDates, invDate)
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('selDateWeek').addEventListener('change', invDatesWeekSelect)
function invDatesWeekSelect() {
  let date = document.getElementById('selDateWeek').value
  
  loadTableWeeklyHard(date)
  loadTableWeeklySets(date)
  loadTableWeeklyRolling(date)

  document.getElementById('weeklyTables').style.display='grid'
}
function loadTableWeeklyHard(date) {
  // let start = DateTime.fromISO(date).minus({hours: 24, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  // let end = DateTime.fromISO(date).minus({hours: 0, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  let start = DateTime.fromISO(date).minus({hours: 24, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  let end = DateTime.fromISO(date).minus({hours: 0, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  let timeSpan = {}
  timeSpan.start = start
  timeSpan.end = end
  // console.log(date)
  // console.log(timeSpan)
  axios.post('/api/inventory/hop/weekly/view', timeSpan)
    .then(res => {
      let tableData = res.data
      weeklyTableHard = new Tabulator('#weeklyHard', {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Hop", field:"commodity",hozAlign:"center", frozen:true},
        {title:"lbs", field:"lbs",hozAlign:"center"},
        {title:"Lot", field:"lot",hozAlign:"center"},
        {title:"Name", field:"username",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
}
function loadTableWeeklySets(date) {
  // let start = DateTime.fromISO(date).minus({hours: 0, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  // let end = DateTime.fromISO(date).plus({hours: 167, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  let start = DateTime.fromISO(date).minus({hours: 0, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  let end = DateTime.fromISO(date).plus({hours: 167, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  let timeSpan = {}
  timeSpan.startSets = start
  timeSpan.end = end
  // console.log(date)
  // console.log(timeSpan)
  axios.post('/api/inventory/hop/sets/view', timeSpan)
    .then(res => {
      let tableData = res.data
      weeklyTableSets = new Tabulator('#weeklySets', {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"Brand", field:"brand",hozAlign:"center", frozen:true},
          {title:"Sets", field:"sets",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
}
function loadTableWeeklyRolling(date) {
  // let start = DateTime.fromISO(date).minus({hours: 24, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  // let startSets = DateTime.fromISO(date).minus({hours: 0, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  // let end = DateTime.fromISO(date).plus({hours: 167, minutes: 30}).toFormat('yyyy-MM-dd TTT')
  let start = DateTime.fromISO(date).minus({hours: 24, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  let startSets = DateTime.fromISO(date).minus({hours: 0, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  let end = DateTime.fromISO(date).plus({hours: 167, minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  
  let timeSpan = {}
  timeSpan.start = start
  timeSpan.startSets = startSets
  timeSpan.end = end
  // console.log(date)
  console.log(timeSpan)
  axios.post('/api/inventory/hop/weekly/view/rolling', timeSpan)
    .then(res => {
      let tableData = res.data
      weeklyTableRolling = new Tabulator('#weeklyRolling', {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"Hop", field:"commodity",hozAlign:"center", frozen:true},
          {title:"lbs", field:"lbs",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
}