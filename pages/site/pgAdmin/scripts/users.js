document.getElementById('frmAdd').style.display="none"
document.getElementById('frmUpdate').style.display="none"
document.getElementById('frmDelete').style.display="none"
document.getElementById('list').style.display="none"
const api = '/api/brewery'


function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}


// Views
function add() {
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('frmAdd').style.display="block"
  let breweries = document.getElementById('brewery_id')
  breweries.innerHTML = `<option value="" id="updateBrewery" disabled selected hidden>Select Brewery</option>`
  axios.get('/api/brewery')
    // .then(res => res.json())
    .then(data => {
      let response = data.data
      return response.map(elements => {

        let option = createNode('option')
        option.innerHTML = elements.brewery
        
        append(breweries, option)
      })
    })
  
}
function update() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('frmUpdate').style.display="block"
  
  const users = document.getElementsByName('updateUsers')[0]
  users.innerHTML = `<option value="" disabled selected hidden>Select User</option>`
  axios.get('/api/user')
  .then(data => {
    let user = data.data
    return user.map(listItem => {

      let username = createNode('option')
      username.innerHTML = listItem.username
      
      append(users, username)
    })
  })
  .catch(err => console.log(err.detail))

  const breweries = document.getElementsByName('updateBreweries')[0]
  breweries.innerHTML = `<option value="" disabled selected hidden>Select Brewery</option>`
  axios.get(api)
  .then(data => {
    let brewery = data.data
    
    return brewery.map(listItem => {

      let breweryName = createNode('option')
      breweryName.innerHTML = listItem.brewery
      
      append(breweries, breweryName)
    })
  })
  .catch(err => console.log(err.detail))
}
function view() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('list').style.display="block"
  
  axios.get('/api/user')
    .then(res => {
      let tableData = res.data

      var table = new Tabulator("#list", {
        height:"309px",
        layout:"fitDataFill",
        responsiveLayout:"collapse",
        data:tableData,
        columns:[
        {formatter:"responsiveCollapse", width:30, minWidth:30, hozAlign:"center", resizable:false, headerSort:false},
        {title:"Name", field:"username", width:200,hozAlign:"center", responsive:0},
        {title:"Email", field:"email", hozAlign:"center", width:150},
        {title:"Permissions", field:"permissions",hozAlign:"center", width:150, responsive:2},
        {title:"Brewery", field:"brewery",hozAlign:"center", width:150, responsive:2},
        ],
      })
      // sorter:""
    })
    .catch(err => console.log(err.detail))
  document.getElementById('list').style.display="block"
}
function del() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('frmDelete').style.display="block"
  document.getElementById('list').style.display="none"

  const users = document.getElementsByName('deleteUsers')[0]
  users.innerHTML = `<option value="" disabled selected hidden>Select User</option>`
  axios.get('/api/user')
  .then(data => {
    let user = data.data
    return user.map(listItem => {

      let username = createNode('option')
      username.innerHTML = listItem.username
      
      append(users, username)
    })
  })
  .catch(err => console.log(err.detail))
}


// routes add
function resetAdd(ev){
  ev.preventDefault();
  document.getElementById('frmAdd').reset();
}
async function sendAdd(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  
  let fails = await validateAdd()
  if(fails.length === 0) {
    var form = document.getElementById('frmAdd')
    let data = {}
    let i
  
    for (i = 0; i < form.length - 2; i++) {
      let id = form.elements[i].id
      let name = form.elements[i].value
      data[id] = name
    }
    data.permissions = parseInt(data.permissions)
    
    axios.post('/api/user', data)
      .then(data => {
        alert(data.data.username + ' has been added')
      })
      .catch(err => alert(err.detail))
    } else {
      console.log(fails)
      alert(JSON.stringify(fails))
    }
}
async function validateAdd (ev){
  
  let failures = [];
  
  let username = document.getElementById('username').value
  let email = document.getElementById('email').value
  let password = document.getElementById('password').value
  let permissions = document.getElementById('permissions').value
  let brewery = document.getElementById('brewery_id').value

  let query = '/api/user/' + username

  let res = await axios.get(query)
  
  if(res.data.msg !== 'null') {
    failures.push({input:'name', msg:'Taken'})
  } 

  if( email === ""){
      failures.push({input:'email', msg:'Required Field'})
  } 
  if( password === ""){
      failures.push({input:'password', msg:'Required Feild'})
  } 
  if( permissions === ""){
      failures.push({input:'permissions', msg:'Required Field'})
  }
  if( brewery === ""){
      failures.push({input:'brewery', msg:'Required Field'})
  }
  return failures
}


// routes update
function resetUpdate(ev){
  ev.preventDefault();
  document.getElementById('frmUpdate').reset();
}
async function sendUpdate(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  let fails = await validateUpdate()

  if(fails.length === 0) {
    let form = document.getElementById('frmUpdate')
    let data = {}
    let i

    for (i = 1; i < form.length - 2; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value
    data[id] = name
    }
    data.permissions = parseInt(data.permissions)
    
    let name = document.getElementsByName('updateUsers')[0].value
    
    axios.patch('/api/user/' + name, data)
      .then(data => {
        alert(data.data.username + ' updated')
      })
      .catch(err => alert(err.detail))
    } else {
      alert(JSON.stringify(fails))
    }
    
}
function validateUpdate(ev){
  let failures = [];
  
  let username = document.getElementsByName('updateUsers')[0].value
  let permissions = document.getElementsByName('updatePermissions')[0].value
  let brew = document.getElementsByName('updateBreweries')[0].value
  

  if( username === ""){
      failures.push({input:'username', msg:'Required Field'})
  } 
  if( permissions === ""){
      failures.push({input:'permissions', msg:'Required Feild'})
  } 
  if( brew === ""){
      failures.push({input:'brewery', msg:'Required Field'})
  }

  return failures

}


//  routes delete
function resetDelete(ev){
  ev.preventDefault();
  document.getElementById('frmDelete').reset();
}
function sendDelete(ev) {
  ev.preventDefault() 
  ev.stopPropagation()

  const user = document.getElementsByName('deleteUsers')[0].value

  axios.delete('/api/user/' + user)
    .then(data => alert(data.data.msg))
  .catch(err => alert(err.detail))
}



document.getElementById('btnAddClear').addEventListener('click', resetAdd)
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)

document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate)
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate)

document.getElementById('btnDeleteClear').addEventListener('click', resetDelete)
document.getElementById('btnDeleteSubmit').addEventListener('click', sendDelete)

document.getElementById('add').onclick = add
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view
document.getElementById('delete').onclick = del