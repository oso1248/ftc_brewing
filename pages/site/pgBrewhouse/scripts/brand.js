document.getElementById('brndViewHide').style.display="none"
document.getElementById('stdHopHide').style.display="none"
document.getElementById('dryHopHide').style.display="none"
document.getElementById('sprSacHide').style.display="none"


function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}
function createList(api, parent, title) {
  axios.post(api, {active: true})
  .then(res => {
    let list = res.data
    list.forEach((elem) => {
    let listItem = elem[title]
    let option = createNode('option')
    option.innerHTML = listItem
    // option.id = listItem
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


//Brand view
let viewBrandBrwTable
document.getElementById('brndView').onclick = brandView
function brandView() {
document.getElementById('brndViewHide').style.display="block"
document.getElementById('stdHopHide').style.display="none"
document.getElementById('dryHopHide').style.display="none"
document.getElementById('sprSacHide').style.display="none"
if(viewBrandBrwTable) {
  viewBrandBrwTable.clearData()
}
viewBrandBrew()
}
function viewBrandBrew() {
  axios.post('/api/brand/brw/get', {active: true})
    .then(res => {
      let tableData = res.data

      viewBrandBrwTable = new Tabulator("#brndViewTbl", {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Brand", field:"brand",hozAlign:"center", frozen:true},
        {title:"Active", field:"active",hozAlign:"center"},
        {title:"Standard Hops", field:"hop_std",hozAlign:"center"},
        {title:"Craft Hops", field:"hop_crft",hozAlign:"center"},
        {title:"Dry Hops", field:"hop_dry",hozAlign:"center"},
        {title:"Super Sacks", field:"supr_sac",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
}


// Standard hops
let viewStdHopTable
document.getElementById('stdHopView').onclick = stdHopView
function stdHopView() {
  document.getElementById('brndViewHide').style.display="none"
  document.getElementById('stdHopHide').style.display="block"
  document.getElementById('dryHopHide').style.display="none"
  document.getElementById('sprSacHide').style.display="none"
  stdHopList()
  if(viewStdHopTable) {
    viewStdHopTable.clearData()
  }
}
function stdHopList() {
  let dropDown = document.getElementById('stdHopSel')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Brand</option>`
  let api = '/api/brand/brw/get/std'
  let title = 'brand'
  createList(api, dropDown, title)
}
document.getElementById('stdHopSel').addEventListener('change', stdHopTbl)
async function stdHopTbl() {
  let name = document.getElementById('stdHopSel').value
  axios.post('/api/mtx/brnd', {brand: `${name}`, method: 'view'})
    .then(res => {
      res.data.unshift({Hop:'Brand', Pounds:`${name}`})
      let tableData = res.data

      viewStdHopTable = new Tabulator("#stdHopTbl", {
        resizableColumns:false,
        height:"300px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"Hop", field:"Hop", hozAlign:"Left"},
          {title:"Pounds", field:"Pounds", hozAlign:"Left"},
        ],
    })
    })
    .catch(err => console.log(err))  
}


// Dry Hops
let viewDryHopTable
document.getElementById('dryHopView').onclick = dryHopView
function dryHopView() {
  document.getElementById('brndViewHide').style.display="none"
  document.getElementById('stdHopHide').style.display="none"
  document.getElementById('dryHopHide').style.display="block"
  document.getElementById('sprSacHide').style.display="none"
  dryHopList()
  if(viewDryHopTable) {
    viewDryHopTable.clearData()
  }
}
function dryHopList() {
  let dropDown = document.getElementById('dryHopSel')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Brand</option>`
  let api = '/api/brand/brw/get/dry'
  let title = 'brand'
  createList(api, dropDown, title)
}
document.getElementById('dryHopSel').addEventListener('change', dryHopTbl)
async function dryHopTbl() {
  let name = document.getElementById('dryHopSel').value
  axios.post('/api/mtx/dry', {brand: `${name}`, method: 'view'})
    .then(res => {
      res.data.unshift({Hop:'Brand', Pounds:`${name}`})
      let tableData = res.data

      viewDryHopTable = new Tabulator("#dryHopTbl", {
        resizableColumns:false,
        height:"300px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"Hop", field:"Hop", hozAlign:"Left"},
          {title:"Pounds", field:"Pounds", hozAlign:"Left"},
        ],
    })
    })
    .catch(err => console.log(err))  
}


// Super Sacks
let viewSprSacTable
document.getElementById('sprSacView').onclick = sprSacView
function sprSacView() {
  document.getElementById('brndViewHide').style.display="none"
  document.getElementById('stdHopHide').style.display="none"
  document.getElementById('dryHopHide').style.display="none"
  document.getElementById('sprSacHide').style.display="block"
  sprSacList()
  if(viewSprSacTable) {
    viewSprSacTable.clearData()
  }
}
function sprSacList() {
  let dropDown = document.getElementById('sprSacSel')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Brand</option>`
  let api = '/api/brand/brw/get/sac'
  let title = 'brand'
  createList(api, dropDown, title)
}
document.getElementById('sprSacSel').addEventListener('change', sprSacTbl)
async function sprSacTbl() {
  let name = document.getElementById('sprSacSel').value
  axios.post('/api/mtx/sac', {brand: `${name}`, method: 'view'})
    .then(res => {
      res.data.unshift({commodity:'Brand', Units:`${name}`})
      let tableData = res.data
      viewSprSacTable = new Tabulator("#sprSacTbl", {
        resizableColumns:false,
        height:"300px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"Commodity", field:"commodity", hozAlign:"Left"},
          {title:"Units", field:"Units", hozAlign:"Left"},
        ],
    })
    })
    .catch(err => console.log(err))  
}








// document.getElementById('xlsxViewBrandPckTable').addEventListener('click', xlsxViewBrandPckTable)
// function xlsxViewBrandPckTable(){
//   viewBrandPckTable.download("xlsx", "brand_pck.xlsx", {sheetName:"Brands"})
// }
// document.getElementById('printViewBrandPckTable').addEventListener('click', printViewBrandPckTable)
// function printViewBrandPckTable(){
//   viewBrandPckTable.print(false, true);
// }
