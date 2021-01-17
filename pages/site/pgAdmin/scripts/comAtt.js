document.getElementById('addBoxes').style.display='none'
document.getElementById('updateBoxes').style.display='none'
document.getElementById('deleteBoxes').style.display='none'
document.getElementById('attView').style.display='none'


function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}
function createList(api, parent, title) {
  axios.post(api)
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

//Views
function add() {
  document.getElementById('updateBoxes').style.display='none'
  document.getElementById('deleteBoxes').style.display='none'
  document.getElementById('attView').style.display='none'
  document.getElementById('addBoxes').style.display='grid'
}
function update() {
  document.getElementById('deleteBoxes').style.display='none'
  document.getElementById('attView').style.display='none'
  document.getElementById('addBoxes').style.display='none'
  document.getElementById('updateBoxes').style.display='grid'


  let dropDown = document.getElementsByName('updateLocation')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Location</option>`
  let api = '/api/location/all'
  let title = 'location'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('updateType')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Type</option>`
  api = '/api/type/all'
  title = 'type'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('updateEnviro')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Enviro</option>`
  api = '/api/enviro/all'
  title = 'enviro'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('updateContainer')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Container</option>`
  api = '/api/container/all'
  title = 'container'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('updateUom')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select UOM</option>`
  api = '/api/uom/all'
  title = 'uom'
  createList(api, dropDown, title)
}
function view() {
  document.getElementById('updateBoxes').style.display='none'
  document.getElementById('deleteBoxes').style.display='none'
  document.getElementById('attView').style.display='grid'
  document.getElementById('addBoxes').style.display='none'


  axios.post('/api/location/all')
    .then(res => {
      let tableData = res.data
      var table = new Tabulator('#listLocation', {
        height:'309px',
        layout:'fitDataFill',
        responsiveLayout:'collapse',
        resizableColumns:false,
        responsiveLayoutCollapseStartOpen:false,
        data:tableData,
        columns:[
        {formatter:'responsiveCollapse', width:30, minWidth:30, hozAlign:'left', resizable:false, headerSort:false},
        {title:'Location', field:'location', width:200,hozAlign:'left', responsive:0},
        {title:'Note', field:'note', hozAlign:'left', width:250},
        ],
      })
    })
    .catch(err => console.log(err))

    axios.post('/api/Type/all')
    .then(res => {
      let tableData = res.data
      var table = new Tabulator('#listType', {
        height:'309px',
        layout:'fitDataFill',
        responsiveLayout:'collapse',
        resizableColumns:false,
        responsiveLayoutCollapseStartOpen:false,
        data:tableData,
        columns:[
        {formatter:'responsiveCollapse', width:30, minWidth:30, hozAlign:'left', resizable:false, headerSort:false},
        {title:'Type', field:'type', width:200,hozAlign:'left', responsive:0},
        {title:'Note', field:'note', hozAlign:'left', width:250},
        ],
      })
    })
    .catch(err => console.log(err))

    axios.post('/api/Enviro/all')
    .then(res => {
      let tableData = res.data
      var table = new Tabulator('#listEnviro', {
        height:'309px',
        layout:'fitDataFill',
        responsiveLayout:'collapse',
        resizableColumns:false,
        responsiveLayoutCollapseStartOpen:false,
        data:tableData,
        columns:[
        {formatter:'responsiveCollapse', width:30, minWidth:30, hozAlign:'left', resizable:false, headerSort:false},
        {title:'Enviro', field:'enviro', width:200,hozAlign:'left', responsive:0},
        {title:'Note', field:'note', hozAlign:'left', width:250},
        ],
      })
    })
    .catch(err => console.log(err))

    axios.post('/api/Container/all')
    .then(res => {
      let tableData = res.data
      var table = new Tabulator('#listContainer', {
        height:'309px',
        layout:'fitDataFill',
        responsiveLayout:'collapse',
        resizableColumns:false,
        responsiveLayoutCollapseStartOpen:false,
        data:tableData,
        columns:[
        {formatter:'responsiveCollapse', width:30, minWidth:30, hozAlign:'left', resizable:false, headerSort:false},
        {title:'Container', field:'container', width:200,hozAlign:'left', responsive:0},
        {title:'Note', field:'note', hozAlign:'left', width:250},
        ],
      })
    })
    .catch(err => console.log(err))

    axios.post('/api/uom/all')
    .then(res => {
      let tableData = res.data
      var table = new Tabulator('#listUOM', {
        height:'309px',
        layout:'fitDataFill',
        responsiveLayout:'collapse',
        resizableColumns:false,
        responsiveLayoutCollapseStartOpen:false,
        data:tableData,
        columns:[
        {formatter:'responsiveCollapse', width:30, minWidth:30, hozAlign:'left', resizable:false, headerSort:false},
        {title:'UOM', field:'uom', width:200,hozAlign:'left', responsive:0},
        {title:'Note', field:'note', hozAlign:'left', width:250},
        ],
      })
    })
    .catch(err => console.log(err))



}
function del() {
  document.getElementById('attView').style.display='none'
  document.getElementById('addBoxes').style.display='none'
  document.getElementById('updateBoxes').style.display='none'
  document.getElementById('deleteBoxes').style.display='grid'

  let dropDown = document.getElementsByName('deleteLocation')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Location</option>`
  let api = '/api/location/all'
  let title = 'location'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('deleteType')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Type</option>`
  api = '/api/type/all'
  title = 'type'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('deleteEnviro')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Enviro</option>`
  api = '/api/enviro/all'
  title = 'enviro'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('deleteContainer')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Container</option>`
  api = '/api/container/all'
  title = 'container'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('deleteUOM')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select UOM</option>`
  api = '/api/uom/all'
  title = 'uom'
  createList(api, dropDown, title)
}

//Routes Add Clear Form
function resetAddLocation(ev){
  ev.preventDefault();
  document.getElementById('frmAddLocation').reset();
}
function resetAddType(ev){
  ev.preventDefault();
  document.getElementById('frmAddType').reset();
}
function resetAddEnviro(ev){
  ev.preventDefault();
  document.getElementById('frmAddEnviro').reset();
}
function resetAddContainer(ev){
  ev.preventDefault();
  document.getElementById('frmAddContainer').reset();
}
function resetAddUOM(ev){
  ev.preventDefault();
  document.getElementById('frmAddUOM').reset();
}

//Routes Add
async function sendAddLocation(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  let fails = await validateAddLocation()
  if(fails.length === 0) {
    var form = document.getElementById('frmAddLocation')
    let data = {}
    let i
  
    for (i = 0; i < form.length - 2; i++) {
      let id = form.elements[i].id
      let name = form.elements[i].value
      data[id] = name
    }
    
    axios.post('/api/location', data)
      .then(data => {
        alert(data.data.location + ' has been added')
      })
      .catch(err => alert(err.detail))
    } else {
      let msg = "Problems:\n"
      for(i = 0; i < fails.length; i++) {
        msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
      }
      alert(msg)
      // alert(JSON.stringify(fails))
    }
}
async function validateAddLocation (ev){
  
  let failures = [];
  
  let location = document.getElementById('location').value
  
  let query = '/api/location/' + location

  let res = await axios.get(query).catch(err => console.log(err))
  
  if(res.data.msg !== 'null') {
    failures.push({input:'name', msg:'Taken'})
  } 

  if( location === ""){
      failures.push({input:'location', msg:'Required Field'})
  } 
  return failures
}
async function sendAddType(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  let fails = await validateAddType()
  if(fails.length === 0) {
    var form = document.getElementById('frmAddType')
    let data = {}
    let i
  
    for (i = 0; i < form.length - 2; i++) {
      let id = form.elements[i].id
      let name = form.elements[i].value
      data[id] = name
    }
    
    axios.post('/api/type', data)
      .then(data => {
        alert(data.data.type + ' has been added')
      })
      .catch(err => alert(err.detail))
    } else {
      let msg = "Problems:\n"
      for(i = 0; i < fails.length; i++) {
        msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
      }
      alert(msg)
    }
}
async function validateAddType (ev){
  
  let failures = [];
  
  let Type = document.getElementById('type').value
  
  let query = '/api/type/' + Type

  let res = await axios.get(query).catch(err => console.log(err))
  
  if(res.data.msg !== 'null') {
    failures.push({input:'name', msg:'Taken'})
  } 

  if( Type === ""){
      failures.push({input:'Type', msg:'Required Field'})
  } 
  return failures
}
async function sendAddEnviro(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  let fails = await validateAddEnviro()
  if(fails.length === 0) {
    var form = document.getElementById('frmAddEnviro')
    let data = {}
    let i
  
    for (i = 0; i < form.length - 2; i++) {
      let id = form.elements[i].id
      let name = form.elements[i].value
      data[id] = name
    }
    
    axios.post('/api/enviro', data)
      .then(data => {
        alert(data.data.enviro + ' has been added')
      })
      .catch(err => alert(err.detail))
    } else {
      let msg = "Problems:\n"
      for(i = 0; i < fails.length; i++) {
        msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
      }
      alert(msg)
    }
}
async function validateAddEnviro (ev){
  
  let failures = [];
  
  let Enviro = document.getElementById('enviro').value
  
  let query = '/api/enviro/' + Enviro

  let res = await axios.get(query).catch(err => console.log(err))
  
  if(res.data.msg !== 'null') {
    failures.push({input:'name', msg:'Taken'})
  } 

  if( Enviro === ""){
      failures.push({input:'Enviro', msg:'Required Field'})
  } 
  return failures
}
async function sendAddContainer(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  let fails = await validateAddContainer()
  if(fails.length === 0) {
    var form = document.getElementById('frmAddContainer')
    let data = {}
    let i
  
    for (i = 0; i < form.length - 2; i++) {
      let id = form.elements[i].id
      let name = form.elements[i].value
      data[id] = name
    }
    
    axios.post('/api/container', data)
      .then(data => {
        alert(data.data.container + ' has been added')
      })
      .catch(err => alert(err.detail))
    } else {
      let msg = "Problems:\n"
      for(i = 0; i < fails.length; i++) {
        msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
      }
      alert(msg)
    }
}
async function validateAddContainer (ev){
  
  let failures = [];
  
  let Container = document.getElementById('container').value
  
  let query = '/api/container/' + Container

  let res = await axios.get(query).catch(err => console.log(err))
  
  if(res.data.msg !== 'null') {
    failures.push({input:'name', msg:'Taken'})
  } 

  if( Container === ""){
      failures.push({input:'Container', msg:'Required Field'})
  } 
  return failures
}
async function sendAddUom(ev){
  console.log('add')
  ev.preventDefault() 
  ev.stopPropagation()
  let fails = await validateAddUom()
  if(fails.length === 0) {
    var form = document.getElementById('frmAddUOM')
    let data = {}
    let i
  
    for (i = 0; i < form.length - 2; i++) {
      let id = form.elements[i].id
      let name = form.elements[i].value
      data[id] = name
    }
    
    axios.post('/api/uom', data)
      .then(data => {
        alert(data.data.uom + ' has been added')
      })
      .catch(err => alert(err.detail))
    } else {
      let msg = "Problems:\n"
      for(i = 0; i < fails.length; i++) {
        msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
      }
      alert(msg)
    }
}
async function validateAddUom (ev){
  
  let failures = [];
  
  let Uom = document.getElementById('uom').value
  
  let query = '/api/uom/' + Uom

  let res = await axios.get(query).catch(err => console.log(err))
  
  if(res.data.msg !== 'null') {
    failures.push({input:'name', msg:'Taken'})
  } 

  if( Uom === ""){
      failures.push({input:'UOM', msg:'Required Field'})
  } 
  return failures
}


//Routes Update Clear form
function resetUpdateLocation(ev){
  ev.preventDefault();
  document.getElementById('frmUpdateLocation').reset();
}
function resetUpdateType(ev){
  ev.preventDefault();
  document.getElementById('frmUpdateType').reset();
}
function resetUpdateEnviro(ev){
  ev.preventDefault();
  document.getElementById('frmUpdateEnviro').reset();
}
function resetUpdateContainer(ev){
  ev.preventDefault();
  document.getElementById('frmUpdateContainer').reset();
}
function resetUpdateUOM(ev){
  ev.preventDefault();
  document.getElementById('frmUpdateUOM').reset();
}

//Routes Update
async function sendUpdateLocation(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  let form = document.getElementById('frmUpdateLocation')
  let data = {}
  let i

  for (i = 1; i < form.length - 2; i++) {
  let id = form.elements[i].id
  let name = form.elements[i].value
  data[id] = name
  }
  let name = document.getElementsByName('updateLocation')[0].value
  if(name === '') {
    alert('Location Needed')
    return
  }

  axios.patch('/api/location/' + name, data)
    .then(data => {
      alert(data.data.location + ' updated')
    })
    .catch(err => alert(err.detail))
}
async function sendUpdateType(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  let form = document.getElementById('frmUpdateType')
  let data = {}
  let i

  for (i = 1; i < form.length - 2; i++) {
  let id = form.elements[i].id
  let name = form.elements[i].value
  data[id] = name
  }
  let name = document.getElementsByName('updateType')[0].value
  if(name === '') {
    alert('Type Needed')
    return
  }
  axios.patch('/api/type/' + name, data)
    .then(data => {
      alert(data.data.type + ' updated')
    })
    .catch(err => alert(err.detail))
}
async function sendUpdateEnviro(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  let form = document.getElementById('frmUpdateEnviro')
  let data = {}
  let i

  for (i = 1; i < form.length - 2; i++) {
  let id = form.elements[i].id
  let name = form.elements[i].value
  data[id] = name
  }
  let name = document.getElementsByName('updateEnviro')[0].value
  if(name === '') {
    alert('Enviro Needed')
    return
  }
  axios.patch('/api/enviro/' + name, data)
    .then(data => {
      alert(data.data.enviro + ' updated')
    })
    .catch(err => alert(err.detail))
}
async function sendUpdateContainer(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  let form = document.getElementById('frmUpdateContainer')
  let data = {}
  let i

  for (i = 1; i < form.length - 2; i++) {
  let id = form.elements[i].id
  let name = form.elements[i].value
  data[id] = name
  }
  let name = document.getElementsByName('updateContainer')[0].value
  if(name === '') {
    alert('Container Needed')
    return
  }
  axios.patch('/api/container/' + name, data)
    .then(data => {
      alert(data.data.container + ' updated')
    })
    .catch(err => alert(err.detail))
}
async function sendUpdateUom(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  let form = document.getElementById('frmUpdateUOM')
  let data = {}
  let i

  for (i = 1; i < form.length - 2; i++) {
  let id = form.elements[i].id
  let name = form.elements[i].value
  data[id] = name
  }
  let name = document.getElementsByName('updateUom')[0].value
  if(name === '') {
    alert('UOM Needed')
    return
  }
  axios.patch('/api/uom/' + name, data)
    .then(data => {
      alert(data.data.uom + ' updated')
    })
    .catch(err => alert(err.detail))
}

//Routes Delete Clear Form
function resetDeleteLocation(ev){
  ev.preventDefault();
  document.getElementById('frmDeleteLocation').reset();
}
function resetDeleteType(ev){
  ev.preventDefault();
  document.getElementById('frmDeleteType').reset();
}
function resetDeleteEnviro(ev){
  ev.preventDefault();
  document.getElementById('frmDeleteEnviro').reset();
}
function resetDeleteContainer(ev){
  ev.preventDefault();
  document.getElementById('frmDeleteContainer').reset();
}
function resetDeleteUOM(ev){
  ev.preventDefault();
  document.getElementById('frmDeleteUOM').reset();
}

// Routes delete
async function sendDeleteLocation(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  console.log('delete')
  let name = document.getElementsByName('deleteLocation')[0].value
  if(name === '') {
    alert('Location Needed')
    return
  }

  axios.delete('/api/location/' + name)
    .then(data => {
      alert(data.data.msg)
    })
    .catch(err => alert(err.detail))
}
async function sendDeleteType(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  console.log('delete')
  let name = document.getElementsByName('deleteType')[0].value
  if(name === '') {
    alert('Type Needed')
    return
  }

  axios.delete('/api/type/' + name)
    .then(data => {
      alert(data.data.msg)
    })
    .catch(err => alert(err.detail))
}
async function sendDeleteEnviro(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  console.log('delete')
  let name = document.getElementsByName('deleteEnviro')[0].value
  if(name === '') {
    alert('Enviro Needed')
    return
  }

  axios.delete('/api/enviro/' + name)
    .then(data => {
      alert(data.data.msg)
    })
    .catch(err => alert(err.detail))
}
async function sendDeleteContainer(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  console.log('delete')
  let name = document.getElementsByName('deleteContainer')[0].value
  if(name === '') {
    alert('Container Needed')
    return
  }

  axios.delete('/api/container/' + name)
    .then(data => {
      alert(data.data.msg)
    })
    .catch(err => alert(err.detail))
}
async function sendDeleteUOM(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  console.log('delete')
  let name = document.getElementsByName('deleteUOM')[0].value
  if(name === '') {
    alert('UOM Needed')
    return
  }

  axios.delete('/api/uom/' + name)
    .then(data => {
      alert(data.data.msg)
    })
    .catch(err => alert(err.detail))
}


//Clear forms add
document.getElementById('btnAddClearLocation').addEventListener('click', resetAddLocation)
document.getElementById('btnAddClearType').addEventListener('click', resetAddType)
document.getElementById('btnAddClearEnviro').addEventListener('click', resetAddEnviro)
document.getElementById('btnAddClearContainer').addEventListener('click', resetAddContainer)
document.getElementById('btnAddClearUOM').addEventListener('click', resetAddUOM)
//Clear forms update
document.getElementById('btnUpdateClearLocation').addEventListener('click', resetUpdateLocation)
document.getElementById('btnUpdateClearType').addEventListener('click', resetUpdateType)
document.getElementById('btnUpdateClearEnviro').addEventListener('click', resetUpdateEnviro)
document.getElementById('btnUpdateClearContainer').addEventListener('click', resetUpdateContainer)
document.getElementById('btnUpdateClearUOM').addEventListener('click', resetUpdateUOM)
//Clear forms delete
document.getElementById('btnDeleteClearLocation').addEventListener('click', resetDeleteLocation)
document.getElementById('btnDeleteClearType').addEventListener('click', resetDeleteType)
document.getElementById('btnDeleteClearEnviro').addEventListener('click', resetDeleteEnviro)
document.getElementById('btnDeleteClearContainer').addEventListener('click', resetDeleteContainer)
document.getElementById('btnDeleteClearUOM').addEventListener('click', resetDeleteUOM)
//Send forms add
document.getElementById('btnAddSubmitLocation').addEventListener('click', sendAddLocation)
document.getElementById('btnAddSubmitType').addEventListener('click', sendAddType)
document.getElementById('btnAddSubmitEnviro').addEventListener('click', sendAddEnviro)
document.getElementById('btnAddSubmitContainer').addEventListener('click', sendAddContainer)
document.getElementById('btnAddSubmitUOM').addEventListener('click', sendAddUom)
//Send forms Update
document.getElementById('btnUpdateSubmitLocation').addEventListener('click', sendUpdateLocation)
document.getElementById('btnUpdateSubmitType').addEventListener('click', sendUpdateType)
document.getElementById('btnUpdateSubmitEnviro').addEventListener('click', sendUpdateEnviro)
document.getElementById('btnUpdateSubmitContainer').addEventListener('click', sendUpdateContainer)
document.getElementById('btnUpdateSubmitUOM').addEventListener('click', sendUpdateUom)
// Send forms delete
document.getElementById('btnDeleteSubmitLocation').addEventListener('click', sendDeleteLocation)
document.getElementById('btnDeleteSubmitType').addEventListener('click', sendDeleteType)
document.getElementById('btnDeleteSubmitEnviro').addEventListener('click', sendDeleteEnviro)
document.getElementById('btnDeleteSubmitContainer').addEventListener('click', sendDeleteContainer)
document.getElementById('btnDeleteSubmitUOM').addEventListener('click', sendDeleteUOM)
// view
document.getElementById('add').onclick = add
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view
