let DateTime = luxon.DateTime

window.addEventListener('load', (event) => {
  let formBlock = document.getElementsByName("formblock")
  formBlock.forEach(elem => elem.style.display="none")
})

String.prototype.testNanFormat = function () {
  return (/^\d+(\.\d{1,2})?$/).test(this)
}
function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}
function createList(api, parent, title) {
  axios.post(api, {active: true})
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
function createListType(api, parent, title, type) {
  axios.post(api, {active: true, type: type})
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



///WAD Additions
document.getElementById('addWAD').onclick = viewWad
function viewWad() {
  document.getElementById('wadAdd').style.display = "block"
  document.getElementById('transAdd').style.display = "none"
  document.getElementById('lossAdd').style.display = "none"
  document.getElementById('viewTables2').style.display = "none"
  
  
  let dropDown = document.getElementById('wadSelbrand')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`
  let api = '/api/brand/fin/get'
  let title = 'brndFin'
  createList(api, dropDown, title)
  
  dropDown = document.getElementById('wadSelTank')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Tank</option>`
  api = '/api/vessel/type/get'
  title = 'vessel'
  type = 'tk_fbt'
  createListType(api, dropDown, title, type)
}
document.getElementById('wadBtnClear').onclick = resetWad
function resetWad(ev) {
  ev.preventDefault()
  ev.stopPropagation()
  document.getElementById('wad').reset()
}
document.getElementById('wadBtnAdd').onclick = sendWad
async function sendWad(ev) {
  ev.preventDefault()
  ev.stopPropagation()
  let form = document.getElementById('wad')
  
  let data = {}
  for (let i = 0; i < form.length - 2; i++) {
    let name = form.elements[i].value
    let id = form.elements[i].name
    data[id] = name
  }
  
  let fails = await validateWad(data)
  
  if(fails.length === 0) {  
    axios.post('/api/inventory/process/wad/add', data)
      .then(res => {
        let data = res.data
        alert(data[0].brand + ' Added')

        form.reset()
      
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
function validateWad(data) {
  let failures = []
  
  if(data.brnd_fin === ""){
    failures.push({input:'brand', msg:'Required'})
    data.brnd_fin = null
  }
  if(data.tank === ""){
    failures.push({input:'tank', msg:'Required'})
    data.tank = null
  }
  if(data.vol_start === ""){
    failures.push({input:'start volume', msg:'Required'})
    data.vol_start = null
  } else if(!data.vol_start.testNanFormat()) {
    failures.push({input:'start volume', msg:'To 2 Decimals Only'})
  }
  if(data.vol_stop === ""){
    failures.push({input:'stop volume', msg:'Required'})
    data.vol_stop = null
  } else if(!data.vol_stop.testNanFormat()) {
    failures.push({input:'stop volume', msg:'To 2 Decimals Only'})
  }
  return failures
}


// Trans Add
document.getElementById('addTrans').onclick = viewTrans
async function viewTrans() {
  document.getElementById('wadAdd').style.display = "none"
  document.getElementById('transAdd').style.display = "block"
  document.getElementById('lossAdd').style.display = "none"
  document.getElementById('viewTables2').style.display = "none"
  
  
  let api = '/api/brand/fin/get'
  let title = 'brndFin'

  let dropDown = document.getElementById('transSelBrandFrom')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Brand From</option>`
  await createList(api, dropDown, title)
  api = '/api/brand/brw/get'
  title = 'brand'
  await createList(api, dropDown, title)

  dropDown = document.getElementById('transSelBrandTo')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Brand To</option>`
  api = '/api/brand/fin/get'
  title = 'brndFin'
  createList(api, dropDown, title)
  api = '/api/brand/brw/get'
  title = 'brand'
  await createList(api, dropDown, title)
  



  api = '/api/vessel/type/get'
  title = 'vessel'

  dropDown = document.getElementById('trandSelTankFrom')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Tank From</option>`
  let type = 'tk_fbt'
  await createListType(api, dropDown, title, type)
  type = 'tk_sch'
  await createListType(api, dropDown, title, type)

  dropDown = document.getElementById('transSelTankTo')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Tank To</option>`
  type = 'tk_fbt'
  await createListType(api, dropDown, title, type)
  type = 'tk_sch'
  await createListType(api, dropDown, title, type)

}
document.getElementById('transBtnClear').onclick = resetTrans
function resetTrans(ev) {
  ev.preventDefault()
  ev.stopPropagation()
  document.getElementById('trans').reset()
}
document.getElementById('transBtnAdd').onclick = sendTrans
async function sendTrans(ev) {
  ev.preventDefault()
  ev.stopPropagation()
  let form = document.getElementById('trans')
  
  let data = {}
  for (let i = 0; i < form.length - 2; i++) {
    let name = form.elements[i].value
    let id = form.elements[i].name
    data[id] = name
  }

  let fails = await validateTrans(data)
  
  if(fails.length === 0) {  
    axios.post('/api/inventory/process/trans/add', data)
      .then(res => {
        let data = res.data
        alert(data[0].brand_from + '  Transfer to  ' + data[0].brand_to + '\n\nAdded')

        form.reset()
      
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
function validateTrans(data) {
  let failures = []
  
  if(data.brand_from === ""){
    failures.push({input:'brand from', msg:'Required'})
    data.brand_from = null
  }
  if(data.brand_to === ""){
    failures.push({input:'brand_to', msg:'Required'})
    data.tank = null
  }
  if(data.tank_from === ""){
    failures.push({input:'tank from', msg:'Required'})
    data.tank_from = null
  } 
  if(data.tank_to === ""){
    failures.push({input:'tank to', msg:'Required'})
    data.tank_to = null
  }
  
  if(data.volume === ""){
    failures.push({input:'volume', msg:'Required'})
    data.volume = null
  } else if(!data.volume.testNanFormat()) {
    failures.push({input:'volume', msg:'To 2 Decimals Only'})
  }
  return failures
}



// Loss Add
document.getElementById('addLoss').onclick = viewLoss
async function viewLoss() {
  document.getElementById('wadAdd').style.display = "none"
  document.getElementById('transAdd').style.display = "none"
  document.getElementById('lossAdd').style.display = "block"
  document.getElementById('viewTables2').style.display = "none"
  
  let api = '/api/brand/fin/get'
  let title = 'brndFin'

  let dropDown = document.getElementById('lossSelBrand')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`
  await createList(api, dropDown, title)
  api = '/api/brand/brw/get'
  title = 'brand'
  await createList(api, dropDown, title)




  api = '/api/vessel/type/get'
  title = 'vessel'
  
  dropDown = document.getElementById('lossSelTank')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Tank</option>`
  let type = 'tk_fbt'
  await createListType(api, dropDown, title, type)

  type = 'tk_sch'
  await createListType(api, dropDown, title, type)

  type = 'tk_chp'
  await createListType(api, dropDown, title, type)

  type = 'tk_uni'
  await createListType(api, dropDown, title, type)

}
document.getElementById('lossBtnClear').onclick = resetLoss
function resetLoss(ev) {
  ev.preventDefault()
  ev.stopPropagation()
  document.getElementById('loss').reset()
}
document.getElementById('lossBtnAdd').onclick = sendLoss
async function sendLoss(ev) {
  ev.preventDefault()
  ev.stopPropagation()
  let form = document.getElementById('loss')
  
  let data = {}
  for (let i = 0; i < form.length - 2; i++) {
    let name = form.elements[i].value
    let id = form.elements[i].name
    data[id] = name
  }

  let fails = await validateLoss(data)
  
  if(fails.length === 0) {  
    axios.post('/api/inventory/process/loss/add', data)
      .then(res => {
        let data = res.data
        alert(data[0].brand + ' Loss Added')

        form.reset()
      
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
function validateLoss(data) {
  let failures = []
  
  if(data.brand === ""){
    failures.push({input:'brand', msg:'Required'})
    data.brand = null
  }
  if(data.tank === ""){
    failures.push({input:'tank', msg:'Required'})
    data.tank = null
  }  
  if(data.volume === ""){
    failures.push({input:'volume', msg:'Required'})
    data.volume = null
  } else if(!data.volume.testNanFormat()) {
    failures.push({input:'volume', msg:'To 2 Decimals Only'})
  }
  return failures
}


// View
let wadTable 
let transTable 
let lossTable 
document.getElementById('viewView').onclick = viewView
function viewView() {
  document.getElementById('wadAdd').style.display = "none"
  document.getElementById('transAdd').style.display = "none"
  document.getElementById('lossAdd').style.display = "none"
  document.getElementById('viewTables2').style.display = "block"
  
  wadAdditionTable()
  transAdditionTable()
  lossAdditionTable()
}

function wadAdditionTable() {
  axios.post('/api/inventory/process/wad/get')
    .then(res => {
      let tableData = res.data
      tableData.map(elem => {
        elem.created_at = DateTime.fromISO(elem.created_at).toFormat('yyyy-MM-dd HH:mm')
      })
      wadTable = new Tabulator("#wadTable", {
        printHeader:'<h1>WAD Additions<h1>',
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"Tank", frozen: true, field:"tank", hozAlign:"Left"},
          {title:"Brand", field:"brand", hozAlign:"Left"},
          {title:"Start Vol", field:"vol_start", hozAlign:"Left"},
          {title:"Stop Vol", field:"vol_stop", hozAlign:"Left"},
          {title:"Username", field:"username", hozAlign:"Left"},
          {title:"Date", field:"created_at", hozAlign:"Left"},
          {title:"Note", field:"note", hozAlign:"Left"},
        ],
      })
    })
    .catch(err => console.log(err))  
}
document.getElementById('wadPrint-table').addEventListener('click', () => {
  wadTable.print(false, true);
})
document.getElementById('wadDownload-xlsx').addEventListener('click', () => {
  wadTable.download("xlsx", "wad_addition.xlsx", {sheetName:"Log"})
})


function transAdditionTable() {
  axios.post('/api/inventory/process/trans/get')
    .then(res => {
      let tableData = res.data
      tableData.map(elem => {
        elem.created_at = DateTime.fromISO(elem.created_at).toFormat('yyyy-MM-dd HH:mm')
      })
      transTable = new Tabulator("#transTable", {
        printHeader:'<h1>Transfers<h1>',
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"From", frozen: true, field:"tank_from", hozAlign:"Left"},
          {title:"Brand", field:"brand_from", hozAlign:"Left"},
          {title:"To", field:"tank_to", hozAlign:"Left"},
          {title:"Brand", field:"brand_to", hozAlign:"Left"},
          {title:"Volume", field:"volume", hozAlign:"Left"},
          {title:"Username", field:"username", hozAlign:"Left"},
          {title:"Date", field:"created_at", hozAlign:"Left"},
          {title:"Note", field:"note", hozAlign:"Left"},
        ],
      })
    })
    .catch(err => console.log(err))  
}
document.getElementById('transPrint-table').addEventListener('click', () => {
  transTable.print(false, true);
})
document.getElementById('transDownload-xlsx').addEventListener('click', () => {
  transTable.download("xlsx", "transfer.xlsx", {sheetName:"Log"})
})

function lossAdditionTable() {
  axios.post('/api/inventory/process/loss/get')
    .then(res => {
      let tableData = res.data
      tableData.map(elem => {
        elem.created_at = DateTime.fromISO(elem.created_at).toFormat('yyyy-MM-dd HH:mm')
      })
      lossTable = new Tabulator("#lossTable", {
        printHeader:'<h1>Process Loss<h1>',
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"Tank", frozen: true, field:"tank", hozAlign:"Left"},
          {title:"Brand", field:"brand", hozAlign:"Left"},
          {title:"Volume", field:"volume", hozAlign:"Left"},
          {title:"Username", field:"username", hozAlign:"Left"},
          {title:"Date", field:"created_at", hozAlign:"Left"},
          {title:"Note", field:"note", hozAlign:"Left"},
        ],
      })
    })
    .catch(err => console.log(err))  
}
document.getElementById('lossPrint-table').addEventListener('click', () => {
  lossTable.print(false, true);
})
document.getElementById('lossDownload-xlsx').addEventListener('click', () => {
  lossTable.download("xlsx", "process_loss.xlsx", {sheetName:"Log"})
})