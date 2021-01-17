document.getElementById('updateBoxes').style.display='none'
document.getElementById('viewBoxes').style.display='none'


function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}
function createListBrwBrand(api, parent, title) {
  axios.post(api, {active: false})
  .then(res => {
    let list = res.data
    list.forEach((elem) => {
    let listItem = elem[title]
    let option = createNode('option')
    option.innerHTML = listItem
    append(parent, option)
    });
  })
  .catch(err => {
    console.error(err)
  })
}
function brwBrand(dropDown){
  const api = '/api/brand/brw/get/std'
  let title = 'brand'
  createListBrwBrand(api, dropDown, title)
}


// Update
document.getElementById('add').onclick = update
function update() {
  document.getElementById('viewBoxes').style.display='none'
  document.getElementById('updateBoxes').style.display='block'
  
  let dropDown = document.getElementById('brwBrandUpdate')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`
  brwBrand(dropDown)

  if(hopTableUpdate) {
    hopTableUpdate.clearData()
  }
}
document.getElementById('btnUpdateClear').addEventListener('click', (ev) => {
  ev.preventDefault()
  document.getElementById('frmUpdate').reset()
  hopTableUpdate.clearData()
})
let hopTableUpdate
document.getElementById('brwBrandUpdate').addEventListener('change', selectBrwBrandUpdate)
function selectBrwBrandUpdate(){
  let brwBrand = document.getElementById('brwBrandUpdate').value
  axios.post('/api/mtx/brnd', {brand: `${brwBrand}`, method: 'update'})
    .then(res => {
      let tableData = res.data
      res.data.unshift({Hop:'Brand', Pounds:`${brwBrand}`})
      hopTableUpdate = new Tabulator('#updateHop', {
        resizableColumns:false,
        height:'330px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Hop', field:'Hop',hozAlign:'center', frozen:true},
        {title:'Pounds', field:'Pounds',hozAlign:'left', editor:true, validator:['numeric']},
        ],        
      })
    })
    .catch(err => console.log(err))
}
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate)
async function sendUpdate(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  let tblData = hopTableUpdate.getData()
  axios.patch('/api/mtx/brnd/patch', tblData)
    .then(data => {
      alert('Updated')
      document.getElementById('frmUpdate').reset()
      if(hopTableUpdate) {
        hopTableUpdate.clearData()
      }
    })
    .catch(err => alert(err))
}


// View
document.getElementById('update').onclick = view
function view() {
  document.getElementById('updateBoxes').style.display='none'
  document.getElementById('viewBoxes').style.display='block'
  
  let dropDown = document.getElementById('brwBrandView')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`
  brwBrand(dropDown)

  if(hopTableView) {
    hopTableView.clearData()
  }
}
document.getElementById('btnViewClear').addEventListener('click', (ev) => {
  ev.preventDefault()
  document.getElementById('frmView').reset()
  hopTableView.clearData()
})
let hopTableView
document.getElementById('brwBrandView').addEventListener('change', selectBrwBrandView)
function selectBrwBrandView(){
  let brwBrand = document.getElementById('brwBrandView').value
  axios.post('/api/mtx/brnd', {brand: `${brwBrand}`, method: 'view'})
    .then(res => {
      let tableData = res.data
      res.data.unshift({Hop:'Brand', Pounds:`${brwBrand}`})
      hopTableView = new Tabulator('#viewHop', {
        resizableColumns:false,
        height:'330px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Hop', field:'Hop',hozAlign:'center', frozen:true},
        {title:'Pounds', field:'Pounds',hozAlign:'left'},
        ],
      })
    })
    .catch(err => console.log(err))
}