let DateTime = luxon.DateTime

document.getElementById('weeklyBoxesBox').style.display="none"
document.getElementById('monthlyBoxesBox').style.display="none"
document.getElementById('addBoxes').style.display="none"
document.getElementById('weeklyBoxes').style.display="none"
document.getElementById('monthlyBoxes').style.display="none"



function setCookie(cookieName,cookieValue,hoursToExpire,path,domain) {
  let date = new Date();
	date.setTime(date.getTime()+(hoursToExpire*60*60*1000)); //(daysToExpire*24*60*60*1000));
	document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString() + 'path=' + path + 'domain=' + domain;
}
function getCookie(cookieName) {
  
  var cookieValue = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
	return cookieValue ? cookieValue.pop() : ''
}
function deleteCookie(cname) {
	document.cookie = cname + '=; max-age=0; expires=0';
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
String.prototype.testNanFormat = function () {
  return (/^\d{4}$/).test(this)
}

function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}
function createList(api, parent, title) {
  axios.post(api, {active:true})
  .then(res => {
    let list = res.data
    list.forEach((elem) => {
    let listItem = elem[title]
    let id = elem.id
    let option = createNode('option')
    option.innerHTML = listItem
    option.id = id
    append(parent, option)
    });
  })
  .catch(err => {
    console.error(err)
  })
}
function createListType(api, parent, title, type) {
  axios.post(api, {active:true, type: `${type}`})
  .then(res => {
    let list = res.data
    list.forEach((elem) => {
    let listItem = elem[title]
    let option = createNode('option')
    option.innerHTML = listItem
    option.id = elem.id
    append(parent, option)
    });
  })
  .catch(err => {
    console.error(err)
  })
}
function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


// routes add
document.getElementById('btnAddClear').onclick = hardReset
function hardReset() {
  if (confirm('Do You Want To Clear The Form?')) {
    document.getElementById('pumps').reset()
    document.getElementById('tanks').reset()
  
    let pumpCount = document.getElementsByName('pump')
    for(let i = 0; i < pumpCount.length; i++) {
      document.getElementsByName('pump')[i].style.display="none"
    }
  } else {
    return
  }
}
function softReset() {
  let brand = document.getElementsByName('brand')[0].value
  
  document.getElementById('tanks').reset()
  
  document.getElementsByName('brand')[0].value = brand
  document.getElementsByName('brand')[1].value = brand
  
  let pump = document.getElementById('pumps')
  for(let i = 0; i < pump.length; i +=4) {
    if(pump[i].value != '') {
      pump[i+1].value = pump[i+1].value.toNonAlpha().toUpperCase()
      pump[i+2].value =  pump[i+3].value
      pump[i+3].value = ''
    }
  }
  loadLots()
}
document.getElementById('add').onclick = add
function add() {
  document.getElementById('addBoxes').style.display="block"
  document.getElementById('weeklyBoxes').style.display="none"
  document.getElementById('monthlyBoxes').style.display="none"
  
  let pumpCount = document.getElementsByName('pump')
  let pump = document.getElementsByName('injPump')
  let dropDown = document.getElementsByName('brand')[0]
  
  for(let i = 0; i < pumpCount.length; i++) {
    if(pump[i].value === '') {
    document.getElementsByName('pump')[i].style.display="none"
    }
  }

  dropDown.innerHTML = `<option value="Selected" hidden disabled selected>Select Brand</option>`
  let api = '/api/brand/fin/ingredient/get'
  let title = 'brndFin'
  createList(api, dropDown, title)


  dropDown = document.getElementById('fbt1List')
  api = '/api/vessel/type/get'
  title = 'vessel'
  let type = 'tk_fbt'
  createListType(api, dropDown, title, type)
  dropDown = document.getElementById('fbt2List')
  createListType(api, dropDown, title, type)
}


document.getElementsByName('brand')[0].addEventListener('change', loadIngredients)
async function loadIngredients() {
  document.getElementById('pumps').reset()
  let pumpCount = document.getElementsByName('pump')

  for(let i = 0; i < pumpCount.length; i++) {
    document.getElementsByName('pump')[i].style.display="none"
  }

  let brand = document.getElementsByName('brand')[0].value
  document.getElementsByName('brand')[1].value = brand
  
  await axios.post('/api/brand/fin/ingredient/brand/get/', {brand: brand})
    .then(data => {
      let res = data.data
      for(let i = 0; i < res.length; i++) {
        document.getElementsByName('pump')[i].style.display="grid"
        document.getElementsByName('injPump')[i].value = res[i].commodity
        document.getElementsByName('injPump')[i].id = res[i].com_id
      }
    })
    .catch(err => {
      console.error(err)
    })
    loadLots()
}
function loadLots() {
  let ingredient = document.getElementsByName('injPump')
  let lot = document.getElementsByName('lotCookie')
  for(let i = 0; i < ingredient.length; i++) {
    if(ingredient[i].value != '') { 
      removeChildren(lot[i])
      
      let option = createNode('option')
      option.value = getCookie(ingredient[i].value)
      
      append(lot[i], option)
    }
  }
}


document.getElementById('btnAdd').addEventListener('click', submit)
async function submit() {
  let tanks = []
  let pumps = []
  let data = []
  let failures = []
  
  await loadTanks(tanks)
  if(tanks.length === 0){
    alert('No tanks loaded')
    return
  }
  
  await loadPumps(pumps)
  if(pumps.length === 0){
    alert('No ingredients loaded')
    return
  }
  
  await validateTanks(tanks, failures)
  await validatePumps(pumps, failures)

  if(failures.length != 0) {
    let msg = "Problems:\n"
    for(i = 0; i < failures.length; i++) {
       msg = msg + "\n" +failures[i]['input'] + " " + failures[i]['msg'] 
    }
    alert(msg)
    return
  }

  await combineTanksPumps(data, tanks, pumps)  
  
  axios.post('/api/inventory/fin/injection/log/add', data)
      .then(data => {
        alert('Added')
        softReset()
      })
      .catch(err => alert(err))
}

function loadTanks(tanks) {
  let tank = document.getElementById('tanks')
  
  for(let i = 0; i < tank.length; i += 4) {
    let holder = {}
    holder.fin_id = tank[i].value
    holder.fbt = tank[i+1].value
    holder.vol_fbt = tank[i + 3].value - tank[i + 2].value
    if(holder.fbt) {
      tanks.push(holder)
    }
  }
}
function validateTanks(tanks, failures) { 
  for(let i = 0; i < tanks.length; i++) {

    if(!tanks[i].fin_id || tanks[i].fin_id === "Selected"){
      failures.push({input:tanks[i].fbt, msg:'Brand Required'})
    }
    if(!tanks[i].fbt.testNanFormat()){
      failures.push({input:tanks[i].fbt, msg:'Invalid Tank'})
    }
    if(!tanks[i].vol_fbt || tanks[i].vol_fbt <= 0){
      failures.push({input:tanks[i].fbt, msg:'Volume Required'})
    }  
  }
}

function loadPumps(pumps) {
  let pump = document.getElementById('pumps')
  
  for(let i = 0; i < pump.length; i +=4) {
    let holder = {}
    holder.com_id = pump[i].value
    holder.lot = pump[i+1].value
    holder.vol_ing = pump[i + 3].value - pump[i + 2].value
    if(holder.com_id) {
      pumps.push(holder)
    }
  }
}
function validatePumps(pumps, failures) {
  // let lotCookies = document.getElementsByName('lotCookie')
  for(let i = 0; i < pumps.length; i++) {
    if(!pumps[i].lot){
      failures.push({input:pumps[i].com_id, msg:'Lot Required'})
    } else {
      pumps[i].lot = pumps[i].lot.toNonAlpha().toUpperCase()
      setCookie(pumps[i].com_id,pumps[i].lot,'8')
    }
    if(!pumps[i].vol_ing || pumps[i].vol_ing <= 0){
      failures.push({input:pumps[i].com_id.toString(), msg:'Volume Required'})
    }
  }
}

function combineTanksPumps(data, tanks) {
  let pump = document.getElementById('pumps')
  
  for(let i = 0; i < pump.length; i += 4) {
    if(pump[i].value) {
      for(let x = 0; x < tanks.length; x++) {
        let a = JSON.parse(JSON.stringify(tanks))
        data.unshift(a[x])
        
        data[0].com_id = pump[i].value
        data[0].lot = pump[i+1].value.toNonAlpha().toUpperCase()
        data[0].vol_ing = (pump[i+3].value - pump[i+2].value)/tanks.length
        
      }
    }
  }
}



// view weekly
document.getElementById('weekly').onclick = weeklyLog
function weeklyLog() {
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('weeklyBoxes').style.display="block"
  document.getElementById('monthlyBoxes').style.display="none"

  invFinInjectDatesWeek()
}
function invFinInjectDatesWeek() {
  let invDates = document.getElementById('dateWeekly')
  invDates.innerHTML = `<option value="" disabled selected hidden>Select Date</option>`
  axios.post('/api/inventory/fin/injection/log/dates/weekly')
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
let tableWeekly
document.getElementById('dateWeekly').addEventListener('change', finInjectionWeekly)
function finInjectionWeekly() {
  let date = document.getElementById('dateWeekly').value
  let timeSpan = {}
  timeSpan.start = DateTime.fromISO(date).plus({days: 0}).toFormat('yyyy-MM-dd HH:mm')
  timeSpan.end = DateTime.fromISO(date).endOf('week').toFormat('yyyy-MM-dd HH:mm')

  axios.post('/api/inventory/fin/injection/log/get', timeSpan)
    .then(res => {
      let tableData = res.data
      tableData.map(elem => {
        elem.created_at = DateTime.fromISO(elem.created_at).toFormat('yyyy-MM-dd HH:mm')
      })
      tableWeekly = new Tabulator("#tableWeekly", {
        resizableColumns:false,
        height:"500px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"FBT", frozen: true, field:"fbt", hozAlign:"Left"},
          {title:"Brand", field:"brand", hozAlign:"Left"},
          {title:"Bbls", field:"vol_fbt", hozAlign:"Left"},
          {title:"Commodity", field:"commodity", hozAlign:"Left"},
          {title:"Commodity", field:"commodity", hozAlign:"Left"},
          {title:"Gals", field:"vol_ing", hozAlign:"Left"},
          {title:"Lot", field:"lot", hozAlign:"Left"},
          {title:"User", field:"username", hozAlign:"Left"},
          {title:"Date", field:"created_at", hozAlign:"Left"},
          
        ],
      })
    })
    .catch(err => console.log(err))  
    document.getElementById('weeklyBoxesBox').style.display="block"
}
document.getElementById('weeklyDownload-xlsx').addEventListener('click', xlsxWeeklyLog)
function xlsxWeeklyLog(){
  tableWeekly.download("xlsx", "fin_inj_weekly.xlsx", {sheetName:"Log"})
}
document.getElementById('weeklyPrint-table').addEventListener('click', tableWeeklyPrint)
function tableWeeklyPrint(){
  tableWeekly.print(false, true)
}




// view monthly
document.getElementById('monthly').onclick = monthlyLog
function monthlyLog() {
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('weeklyBoxes').style.display="none"
  document.getElementById('monthlyBoxes').style.display="block"

  invFinInjectDatesMonth()
}
function invFinInjectDatesMonth() {
  let invDates = document.getElementById('dateMonthly')
  invDates.innerHTML = `<option value="" disabled selected hidden>Select Date</option>`
  axios.post('/api/inventory/fin/injection/log/dates/monthly')
    .then(data => {
      let invDate = data.data
      return invDate.map(listItem => {
        let invDate = createNode('option')
        invDate.innerHTML = DateTime.fromISO(listItem.date_trunc).toFormat('yyyy-MM')
        append(invDates, invDate)
      })
    })
    .catch(err => console.log(err.detail))
}
let tableMonthly
document.getElementById('dateMonthly').addEventListener('change', finInjectionMonthly)
function finInjectionMonthly() {
  let date = document.getElementById('dateMonthly').value
  let timeSpan = {}
  timeSpan.start = DateTime.fromISO(date).plus({days: 0}).toFormat('yyyy-MM-dd HH:mm')
  timeSpan.end = DateTime.fromISO(date).endOf('month').toFormat('yyyy-MM-dd HH:mm')
  
  axios.post('/api/inventory/fin/injection/log/get', timeSpan)
    .then(res => {
      let tableData = res.data
      tableData.map(elem => {
        elem.created_at = DateTime.fromISO(elem.created_at).toFormat('yyyy-MM-dd HH:mm')
      })
      tableMonthly = new Tabulator("#tableMonthly", {
        resizableColumns:false,
        height:"500px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"FBT", frozen: true, field:"fbt", hozAlign:"Left"},
          {title:"Brand", field:"brand", hozAlign:"Left"},
          {title:"Bbls", field:"vol_fbt", hozAlign:"Left"},
          {title:"Commodity", field:"commodity", hozAlign:"Left"},
          {title:"Commodity", field:"commodity", hozAlign:"Left"},
          {title:"Gals", field:"vol_ing", hozAlign:"Left"},
          {title:"Lot", field:"lot", hozAlign:"Left"},
          {title:"User", field:"username", hozAlign:"Left"},
          {title:"Date", field:"created_at", hozAlign:"Left"},
          
        ],
      })
    })
    .catch(err => console.log(err))  
    document.getElementById('monthlyBoxesBox').style.display="block"  





}
document.getElementById('monthlyDownload-xlsx').addEventListener('click', xlsxMonthlyLog)
function xlsxMonthlyLog(){
  tableMonthly.download("xlsx", "fin_inj_monthly.xlsx", {sheetName:"Log"})
}
document.getElementById('monthlyPrint-table').addEventListener('click', tableMonthlyPrint)
function tableMonthlyPrint(){
  tableMonthly.print(false, true)
}






