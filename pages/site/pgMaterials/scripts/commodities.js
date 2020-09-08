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
function createList(api, parent, title) {
  axios.get(api)
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
function commodity(dropDown){
  const api = '/api/commodity'
  let title = 'commodity'
  createList(api, dropDown, title)
}
function supplier(dropDown){
  const api = '/api/supplier'
  let title = 'company'
  createList(api, dropDown, title)
}
function locations(dropDown){
  const api = '/api/location'
  let title = 'location'
  createList(api, dropDown, title)
}
function type(dropDown){
  const api = '/api/type'
  let title = 'type'
  createList(api, dropDown, title)
}
function container(dropDown){
  const api = '/api/container'
  let title = 'container'
  createList(api, dropDown, title)
}
function environmental(dropDown){
  const api = '/api/enviro'
  let title = 'enviro'
  createList(api, dropDown, title)
}
function uom(dropDown){
  const api = '/api/uom'
  let title = 'uom'
  createList(api, dropDown, title)
}

// Views
function add() {
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('frmAdd').style.display="block"

  
  let dropDown = document.getElementById('supplier_id')
  supplier(dropDown)
  dropDown = document.getElementById('location_id')
  // locations()
  dropDown = document.getElementById('type_id')
  // type()
  dropDown = document.getElementById('container_id')
  // container()
  dropDown = document.getElementById('enviro_id')
  // environmental()
  dropDown = document.getElementById('uom_id')
  // uom()
}
function update() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('list').style.display="none"
  document.getElementById('frmUpdate').style.display="block"
  
  let dropDown = document.getElementsByName('updateCommodity')[0]
  commodity(dropDown)
  dropDown = document.getElementsByName('updateSupplier_id')[0]
  supplier(dropDown)
  // dropDown = document.getElementById('location_id')
  // locations()
  // dropDown = document.getElementById('type_id')
  // type()
  // dropDown = document.getElementById('container_id')
  // container()
  // dropDown = document.getElementById('enviro_id')
  // environmental()
  // dropDown = document.getElementById('uom_id')
  // uom()
}
function view() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmDelete').style.display="none"
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('list').style.display="block"
  
  axios.get('/api/commodity')
    .then(res => {
      let tableData = res.data

      var table = new Tabulator("#list", {
        height:"330px",
        layout:"fitDataFill",
        responsiveLayout:"collapse",
        data:tableData,
        columns:[
        {formatter:"responsiveCollapse", width:30, minWidth:30, hozAlign:"center", resizable:false, headerSort:false},
        {title:"Commodity", field:"commodity",hozAlign:"center", width:150, responsive:2},
        {title:"SAP", field:"sap",hozAlign:"center", width:115, responsive:2},
        {title:"Active", field:"active",hozAlign:"center", width:115, responsive:2},
        {title:"Inventory", field:"inventory",hozAlign:"center", width:115, responsive:2},
        {title:"Location", field:"location",hozAlign:"center", width:115, responsive:2},
        {title:"Company", field:"company",hozAlign:"center", width:115, responsive:2},
        {title:"Type", field:"type",hozAlign:"center", width:115, responsive:2},
        {title:"Container", field:"container",hozAlign:"center", width:115, responsive:2},
        {title:"Environmental", field:"enviro",hozAlign:"center", width:115, responsive:2},
        {title:"Threshold", field:"threshold",hozAlign:"center", width:115, responsive:2},
        {title:"Per Pallet", field:"per_pallet",hozAlign:"center", width:115, responsive:2},
        {title:"Unit Total", field:"unit_total",hozAlign:"center", width:115, responsive:2},
        {title:"UOM", field:"uom",hozAlign:"center", width:115, responsive:2},
        {title:"Note", field:"note",hozAlign:"center", width:150, responsive:2},
        ],
      })
      // sorter:""
    })
    .catch(err => console.log(err))
  document.getElementById('list').style.display="block"
}
function del() {
  document.getElementById('frmAdd').style.display="none"
  document.getElementById('frmUpdate').style.display="none"
  document.getElementById('frmDelete').style.display="block"
  document.getElementById('list').style.display="none"

  const users = document.getElementsByName('deleteCommodity')[0]
  users.innerHTML = `<option value="" disabled selected hidden>Select Commodity</option>`
  axios.get('/api/commodity')
  .then(data => {
    let user = data.data
    
    return user.map(listItem => {
      let username = createNode('option')
      username.innerHTML = listItem.commodity
      
      append(users, username)
    })
  })
  .catch(err => console.log(err))
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
      alert(JSON.stringify(fails))
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
      alert(JSON.stringify(fails))
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
// function selectSupplier(){
//   let company = document.getElementsByName('updateCompany')[0].value
//   let contact = document.getElementsByName('updateContact')[0]
//   let email = document.getElementsByName('updateEmail')[0]
//   let phone = document.getElementsByName('updatePhone')[0]
//   let address = document.getElementsByName('updateAddress')[0]
//   let note = document.getElementsByName('updateNote')[0]
//   axios.get('/api/supplier/' + company)
//     .then(data => {
//       contact.value = data.data.contact
//       email.value = data.data.email
//       phone.value = data.data.phone
//       address.value = data.data.address
//       note.value = data.data.note
//     })
// }


//  routes delete
function resetDelete(ev){
  ev.preventDefault();
  document.getElementById('frmDelete').reset();
}
function sendDelete(ev) {
  ev.preventDefault() 
  ev.stopPropagation()

  const user = document.getElementsByName('deleteCommodity')[0].value

  axios.delete('/api/commodity/' + user)
    .then(data => alert(data.data.msg))
  .catch(err => alert(err))
}



document.getElementById('btnAddClear').addEventListener('click', resetAdd)
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)

document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate)
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate)
// document.getElementsByName('updateCommodity')[0].addEventListener('change', selectSupplier)



document.getElementById('btnDeleteClear').addEventListener('click', resetDelete)
document.getElementById('btnDeleteSubmit').addEventListener('click', sendDelete)

document.getElementById('add').onclick = add
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view
document.getElementById('delete').onclick = del