document.getElementById('addBoxes').style.display="none"
document.getElementById('updateBoxes').style.display="none"
document.getElementById('deleteBoxes').style.display="none"
document.getElementById('attView').style.display="none"

function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}
function createList(api, parent, title) {
  axios.post(api, {active:false})
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
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + 
    txt.substr(1).toLowerCase()})
}
String.prototype.toNonAlpha = function () {
  return this.replace(/[^0-9a-z]/gi, '')
}
String.prototype.testLengthFour = function () {
  return (/^[^\s]{4}$/).test(this)
}

//views
function del() {
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="grid"

  let dropDown = document.getElementsByName('delete')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`
  let api = '/api/brand/brw'
  let title = 'brand'
  createList(api, dropDown, title)

}

//Routes Add
document.getElementById('add').onclick = add
function add() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="grid"

  let dropDown = document.getElementById('type_id')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Type</option>`
  api = '/api/vessel/type/get'
  title = 'type'
  createList(api, dropDown, title)

  dropDown = document.getElementById('loc_id')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Location</option>`
  api = '/api/location/all'
  title = 'location'
  createList(api, dropDown, title)
}
document.getElementById('btnAddClear').addEventListener('click', resetAdd)
function resetAdd(ev){
  ev.preventDefault();
  document.getElementById('frmAdd').reset();
}
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)
async function sendAdd(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  var form = document.getElementById('frmAdd')
  
  let data = {}
  let i
  for (i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value    
    data[id] = name
  }
  let fails = await validateAdd(data)
  if(fails.length === 0) {
    axios.post('/api/vessel', data)
      .then(data => {
        alert(data.data.vessel + ' has been added')
        document.getElementById('frmAdd').reset();
      })
      .catch(err => alert(err))
  } else {
    let msg = 'Problems:\n'
    for(i = 0; i < fails.length; i++) {
      msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
    }
    alert(msg)
  }
}
async function validateAdd(data){
  data.vessel = data.vessel.toNonAlpha().toUpperCase()
  let failures = []
  let name = data.vessel
  if(!data.vessel) {
    failures.push({input:'vessel', msg:'Required Field'})
  } else {
    let query = '/api/vessel/name'
    let res = await axios.post(query, {name: name})
    if(res.data.msg !== 'null') {
      failures.push({input:'vessel', msg:'Taken'})  
    }
  }
  if(data.vessel === ""){
    failures.push({input:'vessel', msg:'Required Field'})
    data.vessel = null
  } else if (!data.vessel.testLengthFour()) {  
      failures.push({input:'vessel', msg:'4 Characters Only'})
  }
  if( data.loc_id === ""){
    failures.push({input:'location', msg:'Required Field'})
    data.loc_id = null
  }
  if( data.type_id === ""){
    failures.push({input:'type', msg:'Required Field'})
    data.type_id = null
  }
  if( data.active === ""){
    failures.push({input:'active', msg:'Required Field'})
    data.active = null
  }
  return failures
}

//Routes Update
document.getElementById('update').onclick = update
function update() {
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="none"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="grid"

  let dropDown = document.getElementsByName('updateVessel')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Vessel</option>`
  let api = '/api/vessel/get'
  let title = 'vessel'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('updateType')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Type</option>`
  api = '/api/vessel/type/get'
  title = 'type'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('updateLocation')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Location</option>`
  api = '/api/location/all'
  title = 'location'
  createList(api, dropDown, title)
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
    let brand = document.getElementsByName('updateVessel')[0].value
    axios.patch('/api/vessel/' + brand, data)
      .then(data => {
        alert(data.data.vessel + ' has been updated')
        document.getElementById('frmUpdate').reset()
      })
      .catch(err => alert(err))
  } else {
    let msg = 'Problems:\n'
    for(i = 0; i < fails.length; i++) {
      msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
    }
    alert(msg)
  }
}
async function validateUpdate(data){
  let failures = []
  if( data.loc_id === ""){
    failures.push({input:'location', msg:'Required Field'})
    data.loc_id = null
  }
  if( data.type_id === ""){
    failures.push({input:'type', msg:'Required Field'})
    data.type_id = null
  }
  if( data.active === ""){
    failures.push({input:'active', msg:'Required Field'})
    data.active = null
  }
  return failures
}
document.getElementsByName('updateVessel')[0].addEventListener('change', selectBrand)
function selectBrand(){
  let vessel = document.getElementsByName('updateVessel')[0].value
  
  axios.post('/api/vessel/name', {name: vessel})
    .then(data => {
      document.getElementsByName('updateType')[0].value = data.data.type
      document.getElementsByName('updateLocation')[0].value = data.data.location
      document.getElementsByName('updateActive')[0].value = data.data.active
      document.getElementsByName('updateNote')[0].value = data.data.note
    })
}


//View
document.getElementById('view').onclick = view
let vesselTable
function view() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('attView').style.display="grid"
  document.getElementById('addBoxes').style.display="none"

  axios.post('/api/vessel/get', {active: false})
    .then(res => {
      let tableData = res.data
      vesselTable = new Tabulator("#list", {
        resizableColumns:false,
        height:"309px",
        layout:"fitDataStretch",
        responsiveLayoutCollapseStartOpen:false,
        data:tableData,
        columns:[
        // {formatter:"responsiveCollapse", width:30, minWidth:30, hozAlign:"center", resizable:false, headerSort:false},
        {title:"Vessel", field:"vessel",hozAlign:"center", frozen:true},
        {title:"Active", field:"active",hozAlign:"center"},
        {title:"Type", field:"type",hozAlign:"center"},
        {title:"Location", field:"location",hozAlign:"center"},
        {title:"Note", field:"note", hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))

}

