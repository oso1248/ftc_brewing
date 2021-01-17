document.getElementById('frmAdd').style.display='none'
document.getElementById('frmUpdate').style.display='none'
document.getElementById('frmDelete').style.display='none'
document.getElementById('list').style.display='none'


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


// Add
document.getElementById('add').onclick = add
function add() {
  document.getElementById('frmUpdate').style.display='none'
  document.getElementById('frmDelete').style.display='none'
  document.getElementById('list').style.display='none'
  document.getElementById('frmAdd').style.display='block'

  let dropDown = document.getElementById('brewery_id')
  dropDown.innerHTML = `<option value="" id="updateBrewery" disabled selected hidden>Select Brewery</option>`
  let api = '/api/brewery/get'
  let title = 'brewery'
  createList(api, dropDown, title)
}
document.getElementById('btnAddClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('frmAdd').reset();
})
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)
async function sendAdd(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  let form = document.getElementById('frmAdd')
  let data = {}
  let i
  for (i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value
    data[id] = name
  }
  
  let fails = await validateAdd(data)
  if(fails.length === 0) {  
    axios.post('/api/user', data)
      .then(data => {
        alert(data.data.username + ' has been added')
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
async function validateAdd (data){
  let failures = [];
  let route = '/api/user/' + data.username
  let res = await axios.post(route).catch(err => alert(err.detail))
  
  if(res.data.msg !== 'null') {
    failures.push({input:'name', msg:'Taken'})
  } 

  if( data.username === ""){
    failures.push({input:'username', msg:'Required Field'})
    data.username = null
  } 

  if( data.email === ""){
      failures.push({input:'email', msg:'Required Field'})
      data.email = null
  } 
  if( data.password === ""){
      failures.push({input:'password', msg:'Required Field'})
      data.password = null
  } 
  if( data.permissions === ""){
      failures.push({input:'permissions', msg:'Required Field'})
      data.permissions = null
  } else {
    // data.permissions = parseInt(data.permissions)
    data.permissions = 1
  }
  if( data.brewery === ""){
      failures.push({input:'brewery', msg:'Required Field'})
      data.brewery = null
  }
  return failures
}



// Update
document.getElementById('update').onclick = update
function update() {
  document.getElementById('frmAdd').style.display='none'
  document.getElementById('frmDelete').style.display='none'
  document.getElementById('list').style.display='none'
  document.getElementById('frmUpdate').style.display='block'
  
  let dropDown = document.getElementsByName('updateUsers')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select User</option>`
  let api = '/api/user/get' 
  let title = 'username'
  createList(api, dropDown, title)

  dropDown = document.getElementsByName('updateBreweries')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brewery</option>`
  api = '/api/brewery/get'
  title = 'brewery'
  createList(api, dropDown, title)
}
document.getElementById('btnUpdateClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('frmUpdate').reset();
})
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
    let name = document.getElementsByName('updateUsers')[0].value
    axios.patch('/api/user/' + name, data)
      .then(data => {
        alert(data.data.username + ' updated')
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
function validateUpdate(data){
  let failures = [];
  let username = document.getElementsByName('updateUsers')[0].value
  
  if( username === ""){
    failures.push({input:'username', msg:'Required Field'})
  }

  if( data.permissions === ""){
    failures.push({input:'permissions', msg:'Required Feild'})
  } else {
    data.permissions = parseInt(data.permissions)
  }

  if( data.brewery_id === ""){
    failures.push({input:'brewery', msg:'Required Field'})
    data.brewery_id = null
  }

  return failures
}



// View
document.getElementById('view').onclick = view
function view() {
  document.getElementById('frmAdd').style.display='none'
  document.getElementById('frmDelete').style.display='none'
  document.getElementById('frmUpdate').style.display='none'
  document.getElementById('list').style.display='block'
  
  viewUsers()
}
let userTable
function viewUsers() {
  axios.post('/api/user/get')
    .then(res => {
      let tableData = res.data
      
      userTable = new Tabulator('#list', {
        height:'309px',
        layout:'fitDataFill',
        resizableColumns:false,
        data:tableData,
        columns:[
        {title:'Name', field:'username',hozAlign:'center', frozen:true},
        {title:'Email', field:'email', hozAlign:'center'},
        {title:'Permissions', field:'permissions',hozAlign:'center'},
        {title:'Brewery', field:'brewery',hozAlign:'center'},
        ],
      })
    })
    .catch(err => console.log(err.detail))
}



// Delete
document.getElementById('delete').onclick = del
function del() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('frmDelete').style.display="block"
  document.getElementById('list').style.display="none"

  let dropDown = document.getElementsByName('deleteUsers')[0]
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select User</option>`
  let api = '/api/user/get'
  let title = 'username'
  createList(api, dropDown, title)
}
document.getElementById('btnDeleteClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('frmDelete').reset();
})
document.getElementById('btnDeleteSubmit').addEventListener('click', sendDelete)
function sendDelete(ev) {
  ev.preventDefault() 
  ev.stopPropagation()

  let user = document.getElementsByName('deleteUsers')[0].value

  axios.delete('/api/user/' + user)
    .then(data => alert(data.data.msg))
  .catch(err => alert(err.detail))
}