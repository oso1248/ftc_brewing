document.getElementById('frmAdd').style.display="none"
document.getElementById('frmUpdate').style.display="none"
document.getElementById('frmDelete').style.display="none"
document.getElementById('list').style.display="none"
const api = '/api/brewery'


function createNode(element) {
  return document.createElement(element)
};
function append(parent, e1) {
  return parent.appendChild(e1)
};


// Views
function add() {
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('frmAdd').style.display="block" 
}
function update() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('frmUpdate').style.display="block"
  
  const suppliers = document.getElementsByName('updateCompany')[0]
  suppliers.innerHTML = `<option value="" disabled selected hidden>Select Supplier</option>`
  axios.get('/api/supplier')
  .then(data => {
    let supplier = data.data
    return supplier.map(listItem => {

      let supplier = createNode('option')
      supplier.innerHTML = listItem.company
      
      append(suppliers, supplier)
    })
  })
  .catch(err => console.log(err.detail))
}
function view() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('list').style.display="block"
  
  axios.get('/api/supplier')
    .then(res => {
      let tableData = res.data

      var table = new Tabulator("#list", {
        height:"309px",
        layout:"fitDataFill",
        responsiveLayout:"collapse",
        responsiveLayoutCollapseStartOpen:false,
        data:tableData,
        columns:[
        {formatter:"responsiveCollapse", width:30, minWidth:30, hozAlign:"center", resizable:false, headerSort:false},
        {title:"Company", field:"company", width:200,hozAlign:"center", responsive:0},
        {title:"Contact", field:"contact", hozAlign:"center", width:150},
        {title:"Email", field:"email",hozAlign:"center", width:150, responsive:2},
        {title:"Phone", field:"phone",hozAlign:"center", width:150, responsive:2},
        {title:"Address", field:"address",hozAlign:"center", width:150, responsive:2},
        {title:"Note", field:"note",hozAlign:"center", width:150, responsive:2},
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

  const users = document.getElementsByName('deleteCompany')[0]
  users.innerHTML = `<option value="" disabled selected hidden>Select Supplier</option>`
  axios.get('/api/supplier')
  .then(data => {
    let user = data.data
    return user.map(listItem => {

      let username = createNode('option')
      username.innerHTML = listItem.company
      
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
    const form = document.getElementById('frmAdd')
    let data = {}
    let i
  
    for (i = 0; i < form.length - 2; i++) {
      let id = form.elements[i].id
      let name = form.elements[i].value
      data[id] = name
    }
    axios.post('/api/supplier', data)
      .then(data => {
        alert(data.data.company + ' has been added')
      })
      .catch(err => alert(err))
    } else {
      let msg = "Problems:\n"
      for(i = 0; i < fails.length; i++) {
        msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
      }
      alert(msg)
      // alert(JSON.stringify(fails))
    }
}
async function validateAdd (ev){
  let failures = [];
  
  let company = document.getElementById('company').value
  // let contact = document.getElementById('contact').value
  // let email = document.getElementById('email').value
  // let phone = document.getElementById('phone').value
  // let address = document.getElementById('address').value
  // let note = document.getElementById('note').value

  let query = '/api/supplier/' + company

  let res = await axios.get(query)
  
  if(res.data.msg !== 'null') {
    failures.push({input:'name', msg:'Taken'})
  } 

  if(company === ""){
      failures.push({input:'company', msg:'Required'})
  } 
  // if(contact === ""){
  //     failures.push({input:'contact', msg:'Required'})
  // } 
  // if(email === ""){
  //     failures.push({input:'email', msg:'Required'})
  // }
  // if(phone === ""){
  //     failures.push({input:'phone', msg:'Requied'})
  // }
  // if(address === ""){
  //   failures.push({input:'address', msg:'Requied'})
  // }
  // if(note === ""){
  //   failures.push({input:'note', msg:'Requied'})
  // }
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

  // let fails = await validateUpdate()

  if(0 === 0) {
    let form = document.getElementById('frmUpdate')
    let data = {}
    let i

    for (i = 1; i < form.length - 2; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value
    data[id] = name
    }
    
    let name = document.getElementsByName('updateCompany')[0].value
    axios.patch('/api/supplier/' + name, data)
      .then(data => {
        alert(data.data.company + ' updated')
      })
      .catch(err => alert(err))
    } else {
      let msg = "Problems:\n"
      for(i = 0; i < fails.length; i++) {
        msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
      }
      alert(msg)
      // alert(JSON.stringify(fails))
    }
    
}
function validateUpdate(ev){
  let failures = [];
  
  let company = document.getElementsByName('updateCompany')[0].value
  // let contact = document.getElementsByName('updateContact')[0].value
  // let email = document.getElementsByName('updateEmail')[0].value
  // let phone = document.getElementsByName('updatePhone')[0].value
  // let address = document.getElementsByName('updateAddress')[0].value
  // let note = document.getElementsByName('updateNote')[0].value
  
  // if(company === ""){
  //   failures.push({input:'company', msg:'Required'})
  // } 
  // if(contact === ""){
  //   failures.push({input:'contact', msg:'Required'})
  // } 
  // if(email === ""){
  //   failures.push({input:'email', msg:'Required'})
  // }
  // if(phone === ""){
  //   failures.push({input:'phone', msg:'Requied'})
  // }
  // if(address === ""){
  //   failures.push({input:'address', msg:'Requied'})
  // }
  // if(note === ""){
  //   failures.push({input:'note', msg:'Requied'})
  // }
  return failures
}
function selectSupplier(){
  let company = document.getElementsByName('updateCompany')[0].value
  let contact = document.getElementsByName('updateContact')[0]
  let email = document.getElementsByName('updateEmail')[0]
  let phone = document.getElementsByName('updatePhone')[0]
  let address = document.getElementsByName('updateAddress')[0]
  let note = document.getElementsByName('updateNote')[0]
  axios.get('/api/supplier/' + company)
    .then(data => {
      contact.value = data.data.contact
      email.value = data.data.email
      phone.value = data.data.phone
      address.value = data.data.address
      note.value = data.data.note
    })
}

//  routes delete
function resetDelete(ev){
  ev.preventDefault();
  document.getElementById('frmDelete').reset();
}

function sendDelete(ev) {
  ev.preventDefault() 
  ev.stopPropagation()

  const user = document.getElementsByName('deleteCompany')[0].value

  axios.delete('/api/supplier/' + user)
    .then(data => alert(data.data.msg))
  .catch(err => alert(err.detail))
}



document.getElementById('btnAddClear').addEventListener('click', resetAdd)
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)

document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate)
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate)
document.getElementsByName('updateCompany')[0].addEventListener('change', selectSupplier)



document.getElementById('btnDeleteClear').addEventListener('click', resetDelete)
document.getElementById('btnDeleteSubmit').addEventListener('click', sendDelete)

document.getElementById('add').onclick = add
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view
document.getElementById('delete').onclick = del