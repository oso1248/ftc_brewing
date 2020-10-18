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

// Views
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

// Details
document.getElementById('detailsBrands').onclick = detailBrands
function detailBrands() {
  document.getElementById('deleteBoxes').style.display="none"
  document.getElementById('addBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="block"
  document.getElementById('detailBrwBrand').style.display="none"
  document.getElementById('detailFinBrand').style.display="none"
  document.getElementById('detailPckBrand').style.display="none"
  
  let dropDown = document.getElementById('brwBrandDetail')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Schoene Brand</option>`
  let api = '/api/brand/brw/get'
  let title = 'brand'
  createList(api, dropDown, title)

  dropDown = document.getElementById('finBrandDetail')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Finishing Brand</option>`
  api = '/api/brand/fin/get'
  title = 'brndFin'
  createList(api, dropDown, title)

  dropDown = document.getElementById('pckBrandDetail')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Packaging Brand</option>`
  api = '/api/brand/pck/get'
  title = 'brndPck'
  createList(api, dropDown, title)
}
document.getElementById('brwBrandDetail').addEventListener('change', detailBrandBrew)
let detailBrandBrwTablePre
let detailBrandBrwTablePost
async function detailBrandBrew() {
  document.getElementById('detailPckBrand').style.display="none"
  document.getElementById('detailFinBrand').style.display="none"
  document.getElementById('detailBrwBrand').style.display="block"
  let name = document.getElementById('brwBrandDetail').value
  console.log('detail brew')
  await detailBrandBrewPre(name)
  await detailBrandBrewPost(name)
}
function detailBrandBrewPre(name) {
  axios.get('/api/brand/detail/brwpre/' + name)
    .then(res => {
      let tableData = res.data
      tableData = convert(tableData)
      
      detailBrandBrwTablePre = new Tabulator("#detailBrandBrwPre", {
        resizableColumns:false,
        height:"300px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          // {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center", cellClick:function(e, cell) {cell.getRow().toggleSelect()}},
          {title:"Object", field:"object", hozAlign:"Left"},
          {title:"Method", field:"method", hozAlign:"Left"},
        ],
      })
    })
    .catch(err => console.log(err))

}
function detailBrandBrewPost(name) {
  axios.get('/api/brand/detail/brwpost/' + name)
    .then(res => {
      let tableData = res.data
      tableData = convert(tableData)
      
      detailBrandBrwTablePost = new Tabulator("#detailBrandBrwPost", {
        resizableColumns:false,
        height:"218px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
          // {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center", cellClick:function(e, cell) {cell.getRow().toggleSelect()}},
          {title:"Object", field:"object", hozAlign:"Left"},
          {title:"Method", field:"method", hozAlign:"Left"},
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



document.getElementById('finBrandDetail').addEventListener('change', detailBrandFin)
let detailBrandFinTable
function detailBrandFin() {
  document.getElementById('detailPckBrand').style.display="none"
  document.getElementById('detailBrwBrand').style.display="none"
  document.getElementById('detailFinBrand').style.display="block"
  console.log('detail fin')
  // axios.post('/api/brand/brw/get', {active: false})
  //   .then(res => {
  //     let tableData = res.data

  //     detailBrandFinTable = new Tabulator("#detailBrandBrw", {
  //       resizableColumns:false,
  //       height:"330px",
  //       layout:"fitDataFill",
  //       data:tableData,
  //       columns:[
  //       {title:"Brand", field:"brand",hozAlign:"center", frozen:true},
  //       {title:"Active", field:"active",hozAlign:"center"},
  //       {title:"Hops", field:"hop_std",hozAlign:"center"},
  //       {title:"Craft Hops", field:"hop_crft",hozAlign:"center"},
  //       {title:"Dry Hops", field:"hop_dry",hozAlign:"center"},
  //       {title:"Super Sacks", field:"supr_sac",hozAlign:"center"},
  //       ],
  //     })
  //   })
  //   .catch(err => console.log(err))
}
document.getElementById('xlsxDetailBrandFinTable').addEventListener('click', xlsxDetailBrandFinTable)
function xlsxDetailBrandFinTable(){
  detailBrandFinTable.download("xlsx", "brand_fin.xlsx", {sheetName:"Brands"})
}
document.getElementById('printDetailBrandFinTable').addEventListener('click', printDetailBrandFinTable)
function printDetailBrandFinTable(){
  detailBrandFinTable.print(false, true);
}
document.getElementById('pckBrandDetail').addEventListener('change', detailBrandPck)
let detailBrandPckTable
function detailBrandPck() {
  document.getElementById('detailBrwBrand').style.display="none"
  document.getElementById('detailFinBrand').style.display="none"
  document.getElementById('detailPckBrand').style.display="block"
  console.log('detail pck')
  // axios.post('/api/brand/brw/get', {active: false})
  //   .then(res => {
  //     let tableData = res.data

  //     detailBrandPckTable = new Tabulator("#detailBrandBrw", {
  //       resizableColumns:false,
  //       height:"330px",
  //       layout:"fitDataFill",
  //       data:tableData,
  //       columns:[
  //       {title:"Brand", field:"brand",hozAlign:"center", frozen:true},
  //       {title:"Active", field:"active",hozAlign:"center"},
  //       {title:"Hops", field:"hop_std",hozAlign:"center"},
  //       {title:"Craft Hops", field:"hop_crft",hozAlign:"center"},
  //       {title:"Dry Hops", field:"hop_dry",hozAlign:"center"},
  //       {title:"Super Sacks", field:"supr_sac",hozAlign:"center"},
  //       ],
  //     })
  //   })
  //   .catch(err => console.log(err))
}
document.getElementById('xlsxDetailBrandPckTable').addEventListener('click', xlsxDetailBrandPckTable)
function xlsxDetailBrandPckTable(){
  detailBrandFinTable.download("xlsx", "brand_pck.xlsx", {sheetName:"Brands"})
}
document.getElementById('printDetailBrandPckTable').addEventListener('click', printDetailBrandPckTable)
function printDetailBrandPckTable(){
  detailBrandPckTable.print(false, true);
}