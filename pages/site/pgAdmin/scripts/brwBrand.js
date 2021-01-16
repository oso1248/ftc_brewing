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

  let dropDown = document.getElementsByName('updateBrand')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`
  let api = '/api/brand/brw/get'
  let title = 'brand'
  createList(api, dropDown, title)

}
function view() {
  document.getElementById('updateBoxes').style.display='none'
  document.getElementById('deleteBoxes').style.display='none'
  document.getElementById('attView').style.display='grid'
  document.getElementById('addBoxes').style.display='none'

  axios.post('/api/brand/brw/get', {active:false})
    .then(res => {
      let tableData = res.data
      var table = new Tabulator('#list', {
        resizableColumns:false,
        height:'309px',
        layout:'fitDataStretch',
        data:tableData,
        columns:[
        {title:'Brand', field:'brand',hozAlign:'center'},
        {title:'Active', field:'active',hozAlign:'center'},
        {title:'Standard Hops', field:'hop_std',hozAlign:'center'},
        {title:'Craft Hops', field:'hop_crft',hozAlign:'center'},
        {title:'Dry Hops', field:'hop_dry',hozAlign:'center'},
        {title:'Super Sacks', field:'supr_sac',hozAlign:'center'},
        {title:'Note', field:'note', hozAlign:'left'},
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

  let dropDown = document.getElementsByName('delete')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`
  let api = '/api/brand/brw'
  let title = 'brand'
  createList(api, dropDown, title)

}


//Routes Add Clear Form
function resetAdd(ev){
  ev.preventDefault();
  document.getElementById('frmAdd').reset()
}
//Routes Add
async function sendAdd(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  var form = document.getElementById('frmAdd')
  let data = {}
  let i
  for (i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value.toProperCase()
    if(id == 'brand'){
      name = name.toNonAlpha().toUpperCase()
    }
    data[id] = name
  }
  let fails = await validateAdd(data)
  if(fails.length === 0) {
    axios.post('/api/brand/brw', data)
      .then(data => {
        alert(data.data.brand + ' has been added')
        document.getElementById('frmAdd').reset()
      })
      .catch(err => alert(err))
      // .catch(err => console.log(err))
  } else {
    let msg = 'Problems:\n'
    for(i = 0; i < fails.length; i++) {
      msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
    }
    alert(msg)
  }
}
async function validateAdd(data){
  console.log('hello')
  let failures = [];
  let name = data.brand
  if(!data.brand) {
    failures.push({input:'brand', msg:'Taken'})
  } else {
    let query = '/api/brand/brw/name'
    let res = await axios.post(query, {name: name})
    if(res.data.msg !== 'null') {
      failures.push({input:'brand', msg:'Taken'})  
    }
  }

  if( data.brand === ""){
      failures.push({input:'brand', msg:'Required Field'})
      data.brand = null
  }
  if( data.hop_std === ""){
    failures.push({input:'standard hops', msg:'Required Field'})
    data.hop_std = null
  }
  if( data.hop_crft === ""){
    failures.push({input:'craft hops', msg:'Required Field'})
    data.hop_crft = null
  }
  if( data.hop_dry === ""){
    failures.push({input:'dry hops', msg:'Required Field'})
    data.hop_dry = null
  }
  if( data.supr_sac === ""){
    failures.push({input:'super sacks', msg:'Required Field'})
    data.supr_sac = null
  }
  if( data.active === ""){
    failures.push({input:'active', msg:'Required Field'})
    data.supr_sac = null
  }
  return failures
}


//Routes Update Clear form
function resetUpdate(ev){
  ev.preventDefault();
  document.getElementById('frmUpdate').reset()
}
//Routes Update
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
    let brand = document.getElementsByName('updateBrand')[0].value
    axios.patch('/api/brand/brw/' + brand, data)
      .then(data => {
        alert(data.data.brand + ' has been updated')
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
  let brand = document.getElementsByName('updateBrand')[0].value
  if( brand === ""){
      failures.push({input:'brand', msg:'Required Field'})
      data.brand = null
  }
  if( data.hop_std === ""){
    failures.push({input:'standard hops', msg:'Required Field'})
    data.hop_std = null
  }
  if( data.hop_crft === ""){
    failures.push({input:'craft hops', msg:'Required Field'})
    data.hop_crft = null
  }
  if( data.hop_dry === ""){
    failures.push({input:'dry hops', msg:'Required Field'})
    data.hop_dry = null
  }
  if( data.supr_sac === ""){
    failures.push({input:'super sacks', msg:'Required Field'})
    data.supr_sac = null
  }
  if( data.active === ""){
    failures.push({input:'active', msg:'Required Field'})
    data.supr_sac = null
  }
  return failures
}
function selectBrand(){
  let brand = document.getElementsByName('updateBrand')[0].value
  
  axios.post('/api/brand/brw/name', {name: brand})
    .then(data => {
      document.getElementsByName('updateStandard')[0].value = data.data.hop_std
      document.getElementsByName('updateCraft')[0].value = data.data.hop_crft
      document.getElementsByName('updateDry')[0].value = data.data.hop_dry
      document.getElementsByName('updateSuper')[0].value = data.data.supr_sac
      document.getElementsByName('updateActive')[0].value = data.data.active
      document.getElementsByName('updateNote')[0].value = data.data.note
    })
}


//Routes Delete Clear Form
function resetDelete(ev){
  ev.preventDefault();
  document.getElementById('frmDelete').reset();
}
// Routes delete
async function sendDelete(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  let name = document.getElementsByName('delete')[0].value
  if(name === '') {
    alert('brand Required')
    return
  }

  axios.delete('/api/brand/brw/' + name)
    .then(data => {
      alert(data.data.msg)
    })
    .catch(err => alert(err.detail))
}


//Clear forms add
document.getElementById('btnAddClear').addEventListener('click', resetAdd)
//Clear forms update
document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate)
//Clear forms delete
document.getElementById('btnDeleteClear').addEventListener('click', resetDelete)


//Send forms add
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)
//Send forms Update
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate)
// Send forms delete
document.getElementById('btnDeleteSubmit').addEventListener('click', sendDelete)


document.getElementsByName('updateBrand')[0].addEventListener('change', selectBrand)


document.getElementById('add').onclick = add
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view
// document.getElementById('delete').onclick = del