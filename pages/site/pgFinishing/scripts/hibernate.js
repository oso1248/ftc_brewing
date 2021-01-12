let DateTime = luxon.DateTime

document.getElementById('addBoxes').style.display="none"
document.getElementById('updateBoxes').style.display="none"
document.getElementById('attView').style.display="none"


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
function createListHibernate(api, parent, title) {
  axios.post(api)
  .then(res => {
    let list = res.data
    list.forEach((elem) => {
    let listItem = elem[title]
    let listId = elem.id
    let option = createNode('option')
    option.innerHTML = listItem
    option.id = listId
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



// routes add
document.getElementById('add').onclick = add
async function add() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="block"
  
  let dropDown = document.getElementById('org_vessel')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select From Tank</option>`
  let api = '/api/vessel/type/get'
  let title = 'vessel'
  let type = 'tk_chp'
  await createListType(api, dropDown, title, type)
  type = 'tk_sch'
  createListType(api, dropDown, title, type)



  dropDown = document.getElementById('int_vessel')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select To Tank</option>`
  api = '/api/vessel/type/get'
  title = 'vessel'
  type = 'tk_chp'
  createListType(api, dropDown, title, type)

  dropDown = document.getElementById('brw_id')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`
  api = '/api/brand/brw/get'
  title = 'brand'
  createList(api, dropDown, title)
}
document.getElementById('btnAddClear').addEventListener('click', resetAdd)
function resetAdd(ev){
  ev.preventDefault();
  document.getElementById('frmAdd').reset()
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
    axios.post('/api/hibernate', data)
      .then(data => {
        alert(data.data[0].org_vessel + ' has been added')
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
  let failures = []

  if(data.org_vessel === ""){
    failures.push({input:'from tank', msg:'Required'})
    data.org_vessel = null
  }

  if(data.org_vol === ""){
    failures.push({input:'start tank vol', msg:'Required'})
    data.org_vol = null
  } else if(!data.org_vol.testNanFormat()) {
    failures.push({input:'start tank vol', msg:'To 2 Decimals Only'})
  } 

  if(data.int_vessel === ""){
    failures.push({input:'to tank', msg:'Required'})
    data.int_vessel = null
  }

  if(data.int_vol === ""){
    failures.push({input:'end tank vol', msg:'Required'})
    data.int_vol = null
  } else if(!data.int_vol.testNanFormat()) {
    failures.push({input:'end tank vol', msg:'To 2 Decimals Only'})
  } 

  if(data.org_vessel === data.int_vessel){
    failures.push({input:'from & to tanks', msg:'Cannot be same'})
    data.org_vessel = null
  }
  if(data.brw_id === ""){
    failures.push({input:'brand', msg:'Required'})
    data.brw_id = null
  }

  return failures
}


// routes update
document.getElementById('update').onclick = update
function update() {
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="grid"

  let dropDown = document.getElementsByName('int_vessel')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select From Tank</option>`
  let api = '/api/hibernate/hibernated/tanks/get'
  let title = 'int_vessel'
  createListHibernate(api, dropDown, title)
  
  dropDown = document.getElementsByName('end_vessel')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select To Tank</option>`
  api = '/api/vessel/type/get'
  title = 'vessel'
  let type = 'tk_sch'
  createListType(api, dropDown, title, type)

}
document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate)
function resetUpdate(ev){
  ev.preventDefault();
  document.getElementById('frmUpdate').reset()
}
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate)
async function sendUpdate(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  let index = document.getElementsByName('int_vessel')[0].selectedIndex
  let options = document.getElementsByName('int_vessel')[0].options
  let id = options[index].id

  let data = {}
  data.end_vessel = document.getElementsByName('end_vessel')[0].value
  data.end_vol = document.getElementsByName('end_vol')[0].value
  data.note = document.getElementsByName('note')[0].value

  let fails = await validateUpdate(data)
  
  if(fails.length === 0) {
    axios.patch('/api/hibernate//hibernated/tank/' + id, data)
      .then(data => {
        alert(data.data[0].int_vessel + ' updated')
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
  let failures = []
  let tank = document.getElementsByName('int_vessel')[0].value
  if(tank === ''){
    failures.push({input:'from tank', msg:'Required'})
  }

  if(data.end_vessel === ''){
    failures.push({input:'schoene tank', msg:'Required'})
    data.end_vessel = null
  }
   
  if(data.end_vol === ""){
    failures.push({input:'schoene fill volume', msg:'Required'})
    data.end_vol = null
  } else if(!data.end_vol.testNanFormat()) {
    failures.push({input:'schoene fill volume', msg:'To 2 Decimals Only'})
  }

  return failures
}
document.getElementsByName('int_vessel')[0].addEventListener('change', selectTank)
function selectTank(){
  let index = document.getElementsByName('int_vessel')[0].selectedIndex
  let options = document.getElementsByName('int_vessel')[0].options
  let id = options[index].id
  axios.post('/api/hibernate/hibernated/tank/get/' + id)
    .then(data => {
      let res = data.data[0]

      document.getElementsByName('int_vol')[0].value = res.int_vol
      document.getElementsByName('brw_id')[0].value = res.brand
      document.getElementsByName('note')[0].value = res.note
    })
}


// View
document.getElementById('view').onclick = view
let hibernateTable
function view() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('attView').style.display="block"
  document.getElementById('addBoxes').style.display="none"

  axios.post('/api/hibernate//hibernated/log/get')
    .then(res => {
      for(let i = 0; i < res.data.length; i++) {
        res.data[i].created_at = DateTime.fromISO(res.data[i].created_at).toFormat('yyyy-MM-dd HH:mm')
        res.data[i].updated_at = DateTime.fromISO(res.data[i].updated_at).toFormat('yyyy-MM-dd HH:mm')
        if(res.data[i].created_at === res.data[i].updated_at) {
          res.data[i].updated_at = ''
        }
      }
      let tableData = res.data
      
      hibernateTable = new Tabulator("#list", {
        printHeader:'<h1>Hibernation Log<h1>',
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"Brand", field:"brand",hozAlign:"center", frozen:true},
          {title:"Org Tk", field:"org_vessel",hozAlign:"center", frozen:true},
          {title:"Volume", field:"org_vol",hozAlign:"center"},
          {title:"Chp Tk", field:"int_vessel",hozAlign:"center"},
          {title:"Volume", field:"int_vol",hozAlign:"center"},
          {title:"Sch Tk", field:"end_vessel",hozAlign:"center"},
          {title:"Volume", field:"end_vol",hozAlign:"center"},
          {title:"Username", field:"username1",hozAlign:"center"},
          {title:"Hibernate Date", field:"created_at",hozAlign:"center"},
          {title:"Username", field:"username2",hozAlign:"center"},
          {title:"Pump Date", field:"updated_at",hozAlign:"center"},
          {title:"Note", field:"note",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
  document.getElementById('list').style.display="block"
}

document.getElementById('download-xlsx').addEventListener('click', hibernateExcel)
function hibernateExcel(){
  hibernateTable.download("xlsx", "hibernation_log.xlsx", {sheetName:"hibernate"})
}
document.getElementById("print-table").addEventListener('click', hibernatePrint)
function hibernatePrint(){
  hibernateTable.print(false, true);
}