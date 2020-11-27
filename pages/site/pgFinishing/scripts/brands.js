document.getElementById('addBoxes').style.display="none"
document.getElementById('updateBoxes').style.display="none"
document.getElementById('deleteBoxes').style.display="none"


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
function convert(obj) {
  let json = { }
  let data = []
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      json = {}
      json["object"] = key
      json["method"] = obj[key]
      data.push(json)
    }  
  }
  return data
}
function convert2(obj, labels) {
  let id = obj.id
  delete obj['id']
  let json = {}
  let data = []
  let i = 0
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      json = {}
      json['id'] = i
      json['id_brnd'] = id
      json['db'] = key
      json['object'] = labels[i]
      json['method'] = obj[key]
      data.push(json)
      i++
    }  
  }
  // console.log(data)
  return data
}


// View Brands
document.getElementById('viewBrands').onclick = viewBrands
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
// View Brw
document.getElementById('viewSchoene').addEventListener('click', viewBrandBrew)
let viewBrandBrwTable
function viewBrandBrew() {
  document.getElementById('viewPckBrand').style.display="none"
  document.getElementById('viewFinBrand').style.display="none"
  document.getElementById('viewBrwBrand').style.display="block"
  
  axios.post('/api/brand/brw/get', {active: true})
    .then(res => {
      let tableData = res.data

      viewBrandBrwTable = new Tabulator("#viewBrandBrw", {
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
document.getElementById('xlsxViewBrandBrwTable').addEventListener('click', xlsxViewBrandBrwTable)
function xlsxViewBrandBrwTable(){
  viewBrandBrwTable.download("xlsx", "brand_brw.xlsx", {sheetName:"Brands"})
}
document.getElementById('printViewBrandBrwTable').addEventListener('click', printViewBrandBrwTable)
function printViewBrandBrwTable(){
  viewBrandBrwTable.print(false, true);
}
// View Fin
document.getElementById('viewFinish').addEventListener('click', viewBrandFin)
let viewBrandFinTable
function viewBrandFin() {
  document.getElementById('viewBrwBrand').style.display="none"
  document.getElementById('viewPckBrand').style.display="none"
  document.getElementById('viewFinBrand').style.display="block"

  axios.post('/api/brand/fin/get', {active: true})
    .then(res => {
      let tableData = res.data
      viewBrandFinTable = new Tabulator("#viewBrandFin", {
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
document.getElementById('xlsxViewBrandFinTable').addEventListener('click', xlsxViewBrandFinTable)
function xlsxViewBrandFinTable(){
  viewBrandFinTable.download("xlsx", "brand_fin.xlsx", {sheetName:"Brands"})
}
document.getElementById('printViewBrandFinTable').addEventListener('click', printViewBrandFinTable)
function printViewBrandFinTable(){
  viewBrandFinTable.print(false, true);
}
// View Pck
document.getElementById('viewPackage').addEventListener('click', viewBrandPck)
let viewBrandPckTable
function viewBrandPck() {
  document.getElementById('viewBrwBrand').style.display="none"
  document.getElementById('viewFinBrand').style.display="none"
  document.getElementById('viewPckBrand').style.display="block"
  
  axios.post('/api/brand/pck/get', {active: true})
    .then(res => {
      let tableData = res.data
      viewBrandPckTable = new Tabulator("#viewBrandPck", {
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
document.getElementById('xlsxViewBrandPckTable').addEventListener('click', xlsxViewBrandPckTable)
function xlsxViewBrandPckTable(){
  viewBrandPckTable.download("xlsx", "brand_pck.xlsx", {sheetName:"Brands"})
}
document.getElementById('printViewBrandPckTable').addEventListener('click', printViewBrandPckTable)
function printViewBrandPckTable(){
  viewBrandPckTable.print(false, true);
}



// Details Brand
document.getElementById('detailsBrands').onclick = detailBrands
function detailBrands() {
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="block"
  document.getElementById('detailBrwBrand').style.display="none"
  document.getElementById('detailFinBrand').style.display="none"
  document.getElementById('detailPckBrand').style.display="none"
  
  let dropDown = document.getElementById('brwBrandDetail')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Schoene</option>`
  let api = '/api/brand/brw/get'
  let title = 'brand'
  createList(api, dropDown, title)

  dropDown = document.getElementById('finBrandDetail')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Filters</option>`
  api = '/api/brand/fin/get'
  title = 'brndFin'
  createList(api, dropDown, title)

  dropDown = document.getElementById('pckBrandDetail')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Releasing</option>`
  api = '/api/brand/fin/get'
  title = 'brndFin'
  createList(api, dropDown, title)
}
// Details Band Brw
document.getElementById('brwBrandDetail').addEventListener('change', detailBrandBrew)
let detailBrandBrwTablePre
let detailBrandBrwTablePost
async function detailBrandBrew() {
  document.getElementById('detailPckBrand').style.display="none"
  document.getElementById('detailFinBrand').style.display="none"
  document.getElementById('detailBrwBrand').style.display="block"
  console.log('detail brw')

  let name = document.getElementById('brwBrandDetail').value
  document.getElementById('finBrandDetail').selectedIndex = 0
  document.getElementById('pckBrandDetail').selectedIndex = 0
  await detailBrandBrewPre(name)
  await detailBrandBrewPost(name)
}
function detailBrandBrewPre(name) {
  let labels = ['Brand','Chip Tank', 'UniTank', 'Lines','Cooler', 'Seperators','ACP', 'Schoene Tank','Fill Tank', 'Note']
  axios.get('/api/brand/detail/csxpre/' + name)
    .then(res => {
      let tableData = res.data
      tableData = convert2(tableData, labels)
      
      detailBrandBrwTablePre = new Tabulator('#detailBrandBrwPre', {
        resizableColumns:false,
        height:'300px',
        layout:'fitDataFill',
        data:tableData,
        columns:[


          

          // {formatter:'rowSelection', titleFormatter:'rowSelection', hozAlign:'center', cellClick:function(e, cell) {cell.getRow().toggleSelect()}},
          {title:'Object', field:'object', hozAlign:'Left'},
          {title:'Method', field:'method', hozAlign:'Left'},
        ],
      })
    })
    .catch(err => console.log(err))
}
function detailBrandBrewPost(name) {
  let labels = ['Brand','Chip Tank', 'UniTank', 'Lines', 'Seperators', 'Schoene Tank', 'Note']
  axios.get('/api/brand/detail/csxpost/' + name)
    .then(res => {
      let tableData = res.data
      tableData = convert2(tableData, labels)
      
      detailBrandBrwTablePost = new Tabulator('#detailBrandBrwPost', {
        resizableColumns:false,
        height:'218px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
          // {formatter:'rowSelection', titleFormatter:'rowSelection', hozAlign:'center', cellClick:function(e, cell) {cell.getRow().toggleSelect()}},
          {title:'Object', field:'object', hozAlign:'Left'},
          {title:'Method', field:'method', hozAlign:'Left'},
        ],
      })
    })
    .catch(err => console.log(err))
}
document.getElementById('xlsxDetailBrandBrwTablePre').addEventListener('click', xlsxDetailBrandBrwTablePre)
function xlsxDetailBrandBrwTablePre(){
  detailBrandBrwTablePre.download("xlsx", "brand_brw.xlsx", {sheetName:"Brands"})
}
document.getElementById('printDetailBrandBrwTablePre').addEventListener('click', printDetailBrandBrwTablePre)
function printDetailBrandBrwTablePre(){
  detailBrandBrwTablePre.print(false, true);
}
document.getElementById('xlsxDetailBrandBrwTablePost').addEventListener('click', xlsxDetailBrandBrwTablePost)
function xlsxDetailBrandBrwTablePost(){
  detailBrandBrwTablePost.download("xlsx", "brand_brw.xlsx", {sheetName:"Brands"})
}
document.getElementById('printDetailBrandBrwTablePost').addEventListener('click', printDetailBrandBrwTablePost)
function printDetailBrandBrwTablePost(){
  detailBrandBrwTablePost.print(false, true);
}
// Details Brand Fin
document.getElementById('finBrandDetail').addEventListener('change', detailBrandFin)
let detailBrandFinTablePre
let detailBrandFinTablePost
async function detailBrandFin() {
  document.getElementById('detailPckBrand').style.display="none"
  document.getElementById('detailBrwBrand').style.display="none"
  document.getElementById('detailFinBrand').style.display="block"
  console.log('detail fin')
  
  let name = document.getElementById('finBrandDetail').value
  document.getElementById('brwBrandDetail').selectedIndex = 0
  document.getElementById('pckBrandDetail').selectedIndex = 0
  await detailBrandFinPre(name)
  await detailBrandFinPost(name)
}
function detailBrandFinPre(name) {
  let labels = ['Brand','Schoene Tank', 'System', 'Trap', 'Filter Beer Tank', 'Fill Tank', 'Injection', 'Control', 'Note']
  axios.get('/api/brand/detail/filpre/' + name)
    .then(res => {
      let tableData = res.data
      tableData = convert2(tableData, labels)
      
      detailBrandFinTablePre = new Tabulator('#detailBrandFinPre', {
        resizableColumns:false,
        height:'272px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
          // {formatter:'rowSelection', titleFormatter:'rowSelection', hozAlign:'center', cellClick:function(e, cell) {cell.getRow().toggleSelect()}},
          {title:'Object', field:'object', hozAlign:'Left'},
          {title:'Method', field:'method', hozAlign:'Left'},
        ],
      })
    })
    .catch(err => console.log(err))
}
function detailBrandFinPost(name) {
  let labels = ['Brand','Schoene Tank', 'System', 'Trap', 'Filter Beer Tank', 'Recover', 'Note']
  axios.get('/api/brand/detail/filpost/' + name)
    .then(res => {
      let tableData = res.data
      tableData = convert2(tableData, labels)
      
      detailBrandFinTablePost = new Tabulator('#detailBrandFinPost', {
        resizableColumns:false,
        height:'218px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
          // {formatter:'rowSelection', titleFormatter:'rowSelection', hozAlign:'center', cellClick:function(e, cell) {cell.getRow().toggleSelect()}},
          {title:'Object', field:'object', hozAlign:'Left'},
          {title:'Method', field:'method', hozAlign:'Left'},
        ],
      })
    })
    .catch(err => console.log(err))
}
document.getElementById('xlsxDetailBrandFinTablePre').addEventListener('click', xlsxDetailBrandFinTablePre)
function xlsxDetailBrandFinTablePre(){
  detailBrandFinTablePre.download("xlsx", "brand_fin.xlsx", {sheetName:"Brands"})
}
document.getElementById('printDetailBrandFinTablePre').addEventListener('click', printDetailBrandFinTablePre)
function printDetailBrandFinTablePre(){
  detailBrandFinTablePre.print(false, true)
}
document.getElementById('xlsxDetailBrandFinTablePost').addEventListener('click', xlsxDetailBrandFinTablePost)
function xlsxDetailBrandFinTablePost(){
  detailBrandFinTablePost.download("xlsx", "brand_fin.xlsx", {sheetName:"Brands"})
}
document.getElementById('printDetailBrandFinTablePost').addEventListener('click', printDetailBrandFinTablePost)
function printDetailBrandFinTablePost(){
  detailBrandFinTablePost.print(false, true)
}
// Details Brand Pck
document.getElementById('pckBrandDetail').addEventListener('change', detailBrandPck)
let detailBrandPckTablePre
let detailBrandPckTablePost
async function detailBrandPck() {
  document.getElementById('detailBrwBrand').style.display="none"
  document.getElementById('detailFinBrand').style.display="none"
  document.getElementById('detailPckBrand').style.display="block"
  console.log('detail pck')
  
  let name = document.getElementById('pckBrandDetail').value
  document.getElementById('brwBrandDetail').selectedIndex = 0
  document.getElementById('finBrandDetail').selectedIndex = 0
  await detailBrandPckPre(name)
  await detailBrandPckPost(name)
}
function detailBrandPckPre(name) {
  let labels = ['Brand','Filter Beer Tank','Release Line','Package Line','Draft Line','Recover','Control','Note']
  axios.get('/api/brand/detail/relpre/' + name)
    .then(res => {
      let tableData = res.data
      tableData = convert2(tableData, labels)
      detailBrandPckTablePre = new Tabulator('#detailBrandPckPre', {
        resizableColumns:false,
        height:'272px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
          {title:'Object', field:'object', hozAlign:'Left'},
          {title:'Method', field:'method', hozAlign:'Left'},
        ],
      })
    })
    .catch(err => console.log(err))
}
function detailBrandPckPost(name) {
  let labels = ['Brand','Filter Beer Tank','System Lines','Package','Draft','Recover','Note']
  axios.get('/api/brand/detail/relpost/' + name)
    .then(res => {
      let tableData = res.data
      tableData = convert2(tableData, labels)
      detailBrandPckTablePost = new Tabulator('#detailBrandPckPost', {
        resizableColumns:false,
        height:'218px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
          {title:'Object', field:'object', hozAlign:'Left'},
          {title:'Method', field:'method', hozAlign:'Left'},
        ],
      })
    })
    .catch(err => console.log(err))
}



//Recipe Brand
document.getElementById('recipeBrands').onclick = recipeBrands
function recipeBrands() {
  document.getElementById('deleteBoxes').style.display="block"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('recipeChpBrand').style.display="none"
  document.getElementById('recipeSchBrand').style.display="none"
  document.getElementById('recipeFinBrand').style.display="none"
  
  let dropDown = document.getElementById('chpBrandRecipe')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Chip</option>`
  let api = '/api/brand/brw/get'
  let title = 'brand'
  createList(api, dropDown, title)

  dropDown = document.getElementById('schBrandRecipe')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Schoene</option>`
  api = '/api/brand/brw/get'
  title = 'brand'
  createList(api, dropDown, title)

  dropDown = document.getElementById('finBrandRecipe')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Filtered</option>`
  api = '/api/brand/fin/get'
  title = 'brndFin'
  createList(api, dropDown, title)
}
// Recipe Chp
document.getElementById('chpBrandRecipe').addEventListener('change', recipeBrandChp)
let recipeBrandChpTable
async function recipeBrandChp() {
  document.getElementById('recipeChpBrand').style.display="block"
  document.getElementById('recipeSchBrand').style.display="none"
  document.getElementById('recipeFinBrand').style.display="none"
  console.log('recipe chp')

  let name = document.getElementById('chpBrandRecipe').value
  document.getElementById('schBrandRecipe').selectedIndex = 0
  document.getElementById('finBrandRecipe').selectedIndex = 0
  await recipeBrandChpDetail(name)
}
function recipeBrandChpDetail(name) {
  axios.get('/api/brand/recipe/chp/' + name)
    .then(res => {
      let tableData = res.data
      tableData = convert(tableData)
      recipeBrandChpTable = new Tabulator("#recipeBrandChp", {
        resizableColumns:false,
        height:"220px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"Parameter", field:"object", hozAlign:"Left"},
          {title:"Specification", field:"method", hozAlign:"Left"},
        ],
      })
    })
    .catch(err => console.log(err))
}
document.getElementById('xlsxRecipeBrandChp').addEventListener('click', xlsxRecipeBrandChp)
function xlsxRecipeBrandChp(){
  recipeBrandChpTable.download("xlsx", "param_chp.xlsx", {sheetName:"Chip"})
}
document.getElementById('printRecipeBrandChp').addEventListener('click', printRecipeBrandChp)
function printRecipeBrandChp(){
  recipeBrandChpTable.print(false, true)
}
// Recipe Sch
document.getElementById('schBrandRecipe').addEventListener('change', recipeBrandSch)
let recipeBrandSchTable
async function recipeBrandSch() {
  document.getElementById('recipeChpBrand').style.display="none"
  document.getElementById('recipeSchBrand').style.display="block"
  document.getElementById('recipeFinBrand').style.display="none"
  console.log('recipe sch')

  let name = document.getElementById('schBrandRecipe').value
  document.getElementById('chpBrandRecipe').selectedIndex = 0
  document.getElementById('finBrandRecipe').selectedIndex = 0
  await recipeBrandSchDetail(name)
}
function recipeBrandSchDetail(name) {
  axios.get('/api/brand/recipe/sch/' + name)
    .then(res => {
      let tableData = res.data
      tableData = convert(tableData)
      recipeBrandSchTable = new Tabulator("#recipeBrandSch", {
        resizableColumns:false,
        height:"150px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"Parameter", field:"object", hozAlign:"Left"},
          {title:"Specification", field:"method", hozAlign:"Left"},
        ],
      })
    })
    .catch(err => console.log(err))
}
document.getElementById('xlsxRecipeBrandSch').addEventListener('click', xlsxRecipeBrandSch)
function xlsxRecipeBrandSch(){
  recipeBrandSchTable.download("xlsx", "param_sch.xlsx", {sheetName:"Schoene"})
}
document.getElementById('printRecipeBrandSch').addEventListener('click', printRecipeBrandSch)
function printRecipeBrandSch(){
  recipeBrandSchTable.print(false, true)
}
// Recipe Fin
document.getElementById('finBrandRecipe').addEventListener('change', recipeBrandFin)
let recipeBrandFinTable
async function recipeBrandFin() {
  document.getElementById('recipeChpBrand').style.display="none"
  document.getElementById('recipeSchBrand').style.display="none"
  document.getElementById('recipeFinBrand').style.display="block"
  console.log('recipe fin')

  let name = document.getElementById('finBrandRecipe').value
  document.getElementById('chpBrandRecipe').selectedIndex = 0
  document.getElementById('schBrandRecipe').selectedIndex = 0
  await recipeBrandFinDetail(name)
}
function recipeBrandFinDetail(name) {
  axios.get('/api/brand/recipe/fin/' + name)
    .then(res => {
      let tableData = res.data
      tableData = convert(tableData)
      recipeBrandFinTable = new Tabulator("#recipeBrandFinTbl", {
        resizableColumns:false,
        height:"1025px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          {title:"Object", field:"object", hozAlign:"Left"},
          {title:"Method", field:"method", hozAlign:"Left"},
        ],
      })
    })
    .catch(err => console.log(err))
}
document.getElementById('xlsxRecipeBrandFin').addEventListener('click', xlsxRecipeBrandFin)
function xlsxRecipeBrandFin(){
  recipeBrandFinTable.download("xlsx", "param_fin.xlsx", {sheetName:"Filtered"})
}
document.getElementById('printRecipeBrandFin').addEventListener('click', printRecipeBrandFin)
function printRecipeBrandFin(){
  recipeBrandFinTable.print(false, true)
}