// const { table } = require("../../../../api/dbConfig")

document.getElementById('updateBoxes').style.display="none"
document.getElementById('viewBoxes').style.display="none"


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
  const api = '/api/brand/brw/get/sac'
  let title = 'brand'
  createListBrwBrand(api, dropDown, title)
}


// routes hops
function resetUpdate(ev){
  ev.preventDefault()
  document.getElementById('frmUpdate').reset()
  hopTableUpdate.clearData()
}
function resetView(ev){
  ev.preventDefault()
  document.getElementById('frmView').reset()
  hopTableView.clearData()
}
async function sendUpdate(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  let tblData = hopTableUpdate.getData()
  axios.patch('/api/mtx/sac/patch', tblData)
    .then(data => {
      alert('Updated')
      document.getElementById('frmUpdate').reset()
      if(hopTableUpdate) {
        hopTableUpdate.clearData()
      }
    })
    .catch(err => alert(err))
}
let hopTableUpdate
function selectBrwBrandUpdate(){
  let brwBrand = document.getElementById('brwBrandUpdate').value
  axios.post('/api/mtx/sac', {brand: `${brwBrand}`, method: 'update'})
    .then(res => {
      let tableData = res.data
      res.data.unshift({commodity:'Brand', Units:`${brwBrand}`})
      hopTableUpdate = new Tabulator("#updateHop", {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Commodity", field:"commodity",hozAlign:"center", frozen:true},
        {title:"Units", field:"Units",hozAlign:"center", editor:true, validator:["numeric"]},
        ],
        // validationFailed:function(cell, value, validators){

        // }
      })
    })
    .catch(err => console.log(err))
}
let hopTableView
function selectBrwBrandView(){
  let brwBrand = document.getElementById('brwBrandView').value
  axios.post('/api/mtx/sac', {brand: `${brwBrand}`, method: 'view'})
    .then(res => {
      let tableData = res.data
      res.data.unshift({commodity:'Brand', Units:`${brwBrand}`})
      hopTableView = new Tabulator("#viewHop", {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Commodity", field:"commodity",hozAlign:"center", frozen:true},
        {title:"Units", field:"Units",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
}


// Views
function update() {
  document.getElementById('viewBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="block"
  
  let dropDown = document.getElementById('brwBrandUpdate')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`
  brwBrand(dropDown)

  if(hopTableUpdate) {
    hopTableUpdate.clearData()
  }
}
function view() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('viewBoxes').style.display="block"

  let dropDown = document.getElementById('brwBrandView')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Brand</option>`
  brwBrand(dropDown)

  if(hopTableView) {
    hopTableView.clearData()
  }
}


document.getElementById('btnUpdateClear').addEventListener('click', resetUpdate)
document.getElementById('btnUpdateSubmit').addEventListener('click', sendUpdate)
document.getElementById('brwBrandUpdate').addEventListener('change', selectBrwBrandUpdate)
document.getElementById('brwBrandView').addEventListener('change', selectBrwBrandView)

document.getElementById('btnViewClear').addEventListener('click', resetView)

document.getElementById('add').onclick = update
document.getElementById('update').onclick = view

document.getElementById('download_xlsx_Hop_Update').addEventListener('click', HopUpdate)
function HopUpdate(){
  hopTableUpdate.download("xlsx", "DryUpdate.xlsx", {sheetName:"DryUpdate"})
}

document.getElementById('print_table_Hop_Update').addEventListener('click', HopUpdatePrint)
function HopUpdatePrint(){
  hopTableUpdate.print(false, true);
}

document.getElementById('download_xlsx_Hop_View').addEventListener('click', HopView)
function HopView(){
  hopTableView.download("xlsx", "DryView.xlsx", {sheetName:"DryView"})
}

document.getElementById('print_table_Hop_View').addEventListener('click', HopViewPrint)
function HopViewPrint(){
  hopTableView.print(false, true);
}