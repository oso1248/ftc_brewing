document.getElementById('addBoxes').style.display="none"
document.getElementById('updateBoxes').style.display="none"
document.getElementById('deleteBoxes').style.display="none"
// document.getElementById('attView').style.display="none"
const api = '/api/brewery'


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
    console.log(list)
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

// Views
function viewBrands() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('addBoxes').style.display="block"
  document.getElementById('viewBrwBrand').style.display="none"
  document.getElementById('viewFinBrand').style.display="none"
  document.getElementById('viewPckBrand').style.display="none"

  // let dropDown = document.getElementById('brwBrandView')
  // dropDown.innerHTML = `<option value="" disabled selected hidden>Schoene Brand</option>`
  // let api = '/api/brand/brw/get'
  // let title = 'brand'
  // createList(api, dropDown, title)

  // dropDown = document.getElementById('finBrandView')
  // dropDown.innerHTML = `<option value="" disabled selected hidden>Finishing Brand</option>`
  // api = '/api/brand/fin/get'
  // title = 'brndFin'
  // createList(api, dropDown, title)

  // dropDown = document.getElementById('pckBrandView')
  // dropDown.innerHTML = `<option value="" disabled selected hidden>Packaging Brand</option>`
  // api = '/api/brand/pck/get'
  // title = 'brndPck'
  // createList(api, dropDown, title)
}
document.getElementById('schoene').addEventListener('click', viewBrandBrew)
let tableBrandBrw
function viewBrandBrew() {
  document.getElementById('viewPckBrand').style.display="none"
  document.getElementById('viewFinBrand').style.display="none"
  document.getElementById('viewBrwBrand').style.display="block"
  
  axios.post('/api/brand/brw/get', {active: false})
    .then(res => {
      let tableData = res.data

      tableBrandBrw = new Tabulator("#viewBrandBrw", {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Brand", field:"brand",hozAlign:"center", frozen:true},
        {title:"Active", field:"active",hozAlign:"center"},
        {title:"Hops", field:"hop_std",hozAlign:"center"},
        {title:"Craft Hops", field:"hop_crft",hozAlign:"center"},
        {title:"Dry Hops", field:"hop_dry",hozAlign:"center"},
        {title:"Super Sacks", field:"supr_sac",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
}
document.getElementById('finish').addEventListener('click', viewBrandFin)
let tableBrandFin
function viewBrandFin() {
  document.getElementById('viewBrwBrand').style.display="none"
  document.getElementById('viewPckBrand').style.display="none"
  document.getElementById('viewFinBrand').style.display="block"

  axios.post('/api/brand/fin/get', {active: false})
    .then(res => {
      let tableData = res.data
      tableBrandFin = new Tabulator("#viewBrandFin", {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Brand", field:"brndFin",hozAlign:"center", frozen:true},
        {title:"Active", field:"active",hozAlign:"center"},
        {title:"Schoene", field:"brndBrw",hozAlign:"center"},
        {title:"Package", field:"brndPck",hozAlign:"center"},
        {title:"Note", field:"note",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
}
document.getElementById('package').addEventListener('click', viewBrandPck)
let tableBrandPck
function viewBrandPck() {
  document.getElementById('viewBrwBrand').style.display="none"
  document.getElementById('viewFinBrand').style.display="none"
  document.getElementById('viewPckBrand').style.display="block"
  
  axios.post('/api/brand/pck/get', {active: false})
    .then(res => {
      let tableData = res.data
      tableBrandFin = new Tabulator("#viewBrandPck", {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Brand", field:"brndPck",hozAlign:"center", frozen:true},
        {title:"Active", field:"active",hozAlign:"center"},
        {title:"Finish", field:"brndFin",hozAlign:"center"},
        {title:"Schoene", field:"brndPck",hozAlign:"center"},
        {title:"Note", field:"note",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))

}


function selectBrandBrw(){
  let commodity = document.getElementById('brwBrandView').value
  
  axios.get('/api/commodity/' + commodity)
    .then(data => {
      document.getElementById(data.data.location).selected = 'selected'
      document.getElementById(data.data.type).selected = 'selected'
      document.getElementById(data.data.company).selected = 'selected'
      document.getElementById(data.data.enviro).selected = 'selected'
      document.getElementById(data.data.container).selected = 'selected'
      document.getElementById(data.data.uom).selected = 'selected'
      document.getElementById(data.data.inventory).selected = 'selected'
      document.getElementsByName('updateSap')[0].value = data.data.sap
      document.getElementsByName('updateActive')[0].value = data.data.active
      document.getElementsByName('updateThreshold')[0].value = data.data.threshold
      document.getElementsByName('updatePer_pallet')[0].value = data.data.per_pallet
      document.getElementsByName('updateUnit_total')[0].value = data.data.unit_total
      document.getElementsByName('updateNote')[0].value = data.data.note
    })
}

// routes add
function resetAdd(ev){
  ev.preventDefault();
  document.getElementById('frmAdd').reset()
}
async function sendAdd(ev){
  ev.preventDefault() 
  ev.stopPropagation()

  const form = document.getElementById('frmAdd')
  let data = {}
  let i
  for (i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value
    data[id] = name
  }
  let fails = await validateAdd(data)
  if(fails.length === 0) {  
    axios.post('/api/commodity', data)
      .then(data => {
        alert(data.data.commodity + ' has been added')
        document.getElementById('frmAdd').reset()
      })
      .catch(err => alert(err))
  } else {
    let msg = "Problems:\n"
    for(i = 0; i < fails.length; i++) {
       msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
    }
    alert(msg)
  }
}
async function validateAdd (data){
  let failures = []
  data.commodity = data.commodity.toNonAlpha('').toProperCase()

  if(!data.commodity) {
    failures.push({input:'commodity', msg:'Taken'})
  } else {
    let query = '/api/commodity/' + data.commodity
    let res = await axios.get(query)
    if(res.data.msg !== 'null') {
      failures.push({input:'commodity', msg:'Taken'})  
    }
  }

  if(data.sap === ""){
      failures.push({input:'sap', msg:'Required'})
      data.sap = null
  } else {
    data.sap = data.sap.toNonAlpha()
  }

  if(data.active === ""){
    failures.push({input:'active', msg:'Required'})
    data.active = null
  }

  if(data.inventory === ""){
    failures.push({input:'inventory', msg:'Required'})
    data.inventory = null
  } 
  if(data.location_id === ""){
    failures.push({input:'location', msg:'Required'})
    data.location_id = null
  } 
  if(data.supplier_id === ""){
    failures.push({input:'supplier', msg:'Required'})
    data.supplier_id = null
  } 
  if(data.type_id === ""){
    failures.push({input:'type', msg:'Required'})
    data.type_id = null
  } 
  if(data.container_id === ""){
    failures.push({input:'container', msg:'Required'})
    data.container_id = null
  } 
  if(data.enviro_id === ""){
    failures.push({input:'enviro', msg:'Required'})
    data.enviro_id = null
  }

  if(data.threshold === ""){
    failures.push({input:'threshold', msg:'Required'})
    data.threshold = null
  } else if(!data.threshold.testNanFormat()) {
    failures.push({input:'threshold', msg:'To 2 Decimals Only'})
    data.threshold = null
  } 
  
  if(data.per_pallet === ""){
    failures.push({input:'pallet', msg:'Required'})
    data.per_pallet = null
  } else if(!data.per_pallet.testNanFormat()) {
    failures.push({input:'pallet', msg:'To 2 Decimals Only'})
    data.per_pallet = null
  }
  
  if(data.unit_total === ""){
    failures.push({input:'unit', msg:'Required'})
    data.unit_total = null
  } else if(!data.unit_total.testNanFormat()) {
    failures.push({input:'unit total', msg:'To 2 Decimals Only'})
  } 
  
  if(data.uom_id === ""){
    failures.push({input:'uom', msg:'Required'})
    data.uom_id = null
  } 
  return failures
}

// routes update
function resetUpdate(ev){
  ev.preventDefault();
  document.getElementById('frmUpdate').reset()
}
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
    
    let name = document.getElementsByName('updateCommodity')[0].value
    axios.patch('/api/commodity/' + name, data)
      .then(data => {
        alert(data.data.commodity + ' updated')
        document.getElementById('frmUpdate').reset()
      })
      .catch(err => alert(err))
    } else {
      let msg = "Problems:\n"
      for(i = 0; i < fails.length; i++) {
        msg = msg + "\n" +fails[i]['input'] + " " + fails[i]['msg'] 
      }
      alert(msg)
    }
}
function validateUpdate(data){
  let failures = []

  let name = document.getElementsByName('updateCommodity')[0].value
  if(name === '') {
    failures.push({input:'commodity', msg:'Required'})
  }
    
  if(data.sap === ''){
    failures.push({input:'sap', msg:'Required'})
  } else {
    data.sap = data.sap.toNonAlpha()
  }

  if(data.active === ''){
    failures.push({input:'active', msg:'Required'})
    data.active = null
  }
  if(data.inventory === ''){
    failures.push({input:'inventory', msg:'Required'})
    data.inventory = null
  } 
  if(data.location_id === ''){
    failures.push({input:'location', msg:'Required'})
    data.location_id = null
  } 
  if(data.supplier_id === ''){
    failures.push({input:'supplier', msg:'Required'})
    data.supplier_id = null
  } 
  if(data.type_id === ''){
    failures.push({input:'type', msg:'Required'})
    data.type_id = null
  } 
  if(data.container_id === ''){
    failures.push({input:'container', msg:'Required'})
    data.container_id = null
  } 
  if(data.enviro_id === ''){
    failures.push({input:'enviro', msg:'Required'})
    data.enviro_id = null
  }

  if(data.threshold === ""){
    failures.push({input:'threshold', msg:'Required'})
    data.threshold = null
  } else if(!data.threshold.testNanFormat()) {
    failures.push({input:'threshold', msg:'To 2 Decimals Only'})
    data.threshold = null
  }

  if(data.per_pallet === ""){
    failures.push({input:'pallet', msg:'Required'})
    data.per_pallet = null
  } else if(!data.per_pallet.testNanFormat()) {
    failures.push({input:'pallet', msg:'To 2 Decimals Only'})
    data.per_pallet = null
  }

  if(data.unit_total === ""){
    failures.push({input:'unit', msg:'Required'})
    data.unit_total = null
  } else if(!data.unit_total.testNanFormat()) {
    failures.push({input:'unit total', msg:'To 2 Decimals Only'})
  }

  if(data.uom_id === ''){
    failures.push({input:'uom', msg:'Required'})
    data.uom_id = null
  } 
  return failures
}
function selectCommodity(){
  let commodity = document.getElementsByName('updateCommodity')[0].value
  
  axios.get('/api/commodity/' + commodity)
    .then(data => {
      document.getElementById(data.data.location).selected = 'selected'
      document.getElementById(data.data.type).selected = 'selected'
      document.getElementById(data.data.company).selected = 'selected'
      document.getElementById(data.data.enviro).selected = 'selected'
      document.getElementById(data.data.container).selected = 'selected'
      document.getElementById(data.data.uom).selected = 'selected'
      document.getElementById(data.data.inventory).selected = 'selected'
      document.getElementsByName('updateSap')[0].value = data.data.sap
      document.getElementsByName('updateActive')[0].value = data.data.active
      document.getElementsByName('updateThreshold')[0].value = data.data.threshold
      document.getElementsByName('updatePer_pallet')[0].value = data.data.per_pallet
      document.getElementsByName('updateUnit_total')[0].value = data.data.unit_total
      document.getElementsByName('updateNote')[0].value = data.data.note
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

  const name = document.getElementsByName('deleteCommodity')[0].value

  axios.delete('/api/commodity/' + name)
    .then(data => alert(data.data.msg))
  .catch(err => alert(err))
}


document.getElementById('btnDeleteClear').addEventListener('click', resetDelete)
document.getElementById('btnDeleteSubmit').addEventListener('click', sendDelete)

document.getElementById('viewBrands').onclick = viewBrands
document.getElementById('update').onclick = update
document.getElementById('view').onclick = view
// document.getElementById('delete').onclick = del

document.getElementById('download-xlsx').addEventListener('click', supplierExcel)
function supplierExcel(){
  commodityTable.download("xlsx", "commodities.xlsx", {sheetName:"Commodities"})
}

document.getElementById("print-table").addEventListener('click', supplierPrint)
function supplierPrint(){
  commodityTable.print(false, true);
}