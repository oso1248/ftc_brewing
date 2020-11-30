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
    })
  })
  .catch(err => {
    console.error(err)
  })
}
function convert2(obj) {
  let json = { }
  let data = []
  let i = 1
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      json = {}
      json['id'] = i
      json['db'] = Object.keys(obj)[i-1]
      json['object'] = key
      json['method'] = obj[key]
      data.push(json)
      i++
    }  
  }
  return data
}
function convert(obj, labels) {
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
function convertBrand(obj) {
  let json = { }
  let data = []
  let i = 1
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      json = {}
      json['brand'] = key
      json['active'] = obj[key]
      data.push(json)
    }  
  }
  return data
}


// Update
let tableUpdateBrandChp
let tableUpdateBrandSch
let tableUpdateBrandFin

function resetUpdate(ev){
  ev.preventDefault()
  document.getElementById('frmUpdate').reset()
  if (tableUpdateBrandLineage) {
    tableUpdateBrandLineage.clearData()
    tableUpdateFinDetailPreCsx.clearData()
    tableUpdateFinDetailPostCsx.clearData()
    tableUpdateFinDetailPreFil.clearData()
    tableUpdateFinDetailPostFil.clearData()
    tableUpdateFinDetailPreRel.clearData()
    tableUpdateFinDetailPostRel.clearData()
  }
}
document.getElementById('add').onclick = updateView
function updateView() {
  document.getElementById('viewBoxes').style.display="none"
  document.getElementById('updateBoxes').style.display="block"

  document.getElementById('updateLineageBoxChp').style.display="none"
  document.getElementById('updateLineageBoxFin').style.display="none"
  

  let dropDown = document.getElementById('finBrandUpdate')
  let api = '/api/brand/fin/get/'
  let title = 'brndFin'
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Finished Brand</option>`
  createListBrwBrand(api, dropDown, title)

  dropDown = document.getElementById('brwBrandUpdate')
  api = '/api/brand/brw/get/'
  title = 'brand'
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Schoene Brand</option>`
  createListBrwBrand(api, dropDown, title)

}

document.getElementById('brwBrandUpdate').addEventListener('change', selectUpdateBrw)
function selectUpdateBrw() {
  document.getElementById('updateLineageBoxChp').style.display="block"
  document.getElementById('updateLineageBoxFin').style.display="none"

  let brand = document.getElementById('brwBrandUpdate').value
  
  chpBrandUpdate(brand)
  schBrandUpdate(brand)

  document.getElementById('finBrandUpdate').selectedIndex = 0
}
async function chpBrandUpdate(name) {
  let labels = [
    'Brand',
    
  ]
  await axios.get('/api/brand/recipe/chp/' + name)
    .then(res => {
      let data = res.data
      // let tableData = convert(data, labels)
      let tableData = convert2(data)
      // let tableData = convert2(data)
      tableUpdateBrandChp = new Tabulator('#updateFinRecipeChpTable', {
        resizableColumns:false,
        height:'1000x',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Object', field:'object',hozAlign:'left', frozen:true},        
        {title:'Method', field:'method',hozAlign:'left'},
        ],
      })
    })
    .catch(err => console.log(err))
}
async function schBrandUpdate(name) {
  let labels = [
    'Brand',
    
  ]
  await axios.get('/api/brand/recipe/sch/' + name)
    .then(res => {
      let data = res.data
      // let tableData = convert(data, labels)
      let tableData = convert2(data)
      // let tableData = convert2(data)
      tableUpdateBrandSch = new Tabulator('#updateFinRecipeSchTable', {
        resizableColumns:false,
        height:'1000x',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Object', field:'object',hozAlign:'left', frozen:true},        
        {title:'Method', field:'method',hozAlign:'left'},
        ],
      })
    })
    .catch(err => console.log(err))
}

document.getElementById('finBrandUpdate').addEventListener('change', selectUpdateFin)
function selectUpdateFin() {
  document.getElementById('updateLineageBoxFin').style.display="block"
  document.getElementById('updateLineageBoxChp').style.display="none"

  let brand = document.getElementById('finBrandUpdate').value
  
  finBrandUpdate(brand)

  document.getElementById('brwBrandUpdate').selectedIndex = 0
  
}
async function finBrandUpdate(name) {
  let labels = [
    'Brand',
    'Ctrl Filter OG',
    'Ctrl Filter Alc',
    'Ctrl Filter Cal',
    'Ctrl Filter Carb',
    'Ctrl Filter RDF',
    'Ctrl Filter Co2',
    'Ctrl Filter CC',
    'Ctrl Release OG',
    'Ctrl Release Alc',
    'Ctrl Release Cal',
    'Ctrl Release Carb',
    'Ctrl Release RDF',
    'Ctrl Release Co2',
    'Ctrl Release CC',
    'Set Point OG',
    'LOSL OG',
    'LOSH OG',
    'Set Point Alc',
    'LOSL Alc',
    'LOSH ALc',
    'Set Point Cal',
    'LOSL Cal',
    'LOSH Cal',
    'Set Point Carb',
    'LOSL Carb',
    'LOSH Carb',
    'Set Point RDF',
    'LOSL RDF',
    'LOSH RDF',
    'Set Point Co2',
    'LOSL Co2',
    'LOSH Co2',
    'Set Point CC',
    'LOSL CC',
    'LOSH CC',
    'Note'
  ]
  await axios.get('/api/brand/recipe/fin/' + name)
    .then(res => {
      let data = res.data
      let tableData = convert(data, labels)
      // let tableData = convert2(data)
      tableUpdateBrandFin = new Tabulator('#updateFinRecipeFinTable', {
        resizableColumns:false,
        height:'1000x',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Object', field:'object',hozAlign:'left', frozen:true},        
        {title:'Method', field:'method',hozAlign:'left'},
        ],
      })
    })
    .catch(err => console.log(err))
}



// view
let tableViewBrandChp
let tableViewBrandSch
let tableViewBrandFin

document.getElementById('update').onclick = viewView
function viewView() {
  document.getElementById('updateBoxes').style.display="none"
  document.getElementById('viewBoxes').style.display="block"

  document.getElementById('viewLineageBoxChp').style.display="none"
  document.getElementById('viewLineageBoxFin').style.display="none"

  let api = '/api/brand/fin/get/'
  let title = 'brndFin'
  let dropDown = document.getElementById('finBrandView')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Finished Brand</option>`
  createListBrwBrand(api, dropDown, title)

  dropDown = document.getElementById('brwBrandView')
  api = '/api/brand/brw/get/'
  title = 'brand'
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Schoene Brand</option>`
  createListBrwBrand(api, dropDown, title)
}

document.getElementById('brwBrandView').addEventListener('change', selectViewBrw)
function selectViewBrw() {
  document.getElementById('viewLineageBoxChp').style.display="block"
  document.getElementById('viewLineageBoxFin').style.display="none"

  let brand = document.getElementById('brwBrandView').value
  
  chpBrandView(brand)
  schBrandView(brand)

  document.getElementById('finBrandView').selectedIndex = 0
  
}
async function chpBrandView(name) {
  let labels = [
    'Brand',
    
  ]
  await axios.get('/api/brand/recipe/chp/' + name)
    .then(res => {
      let data = res.data
      // let tableData = convert(data, labels)
      let tableData = convert2(data)
      // let tableData = convert2(data)
      tableViewBrandChp = new Tabulator('#viewFinRecipeChpTable', {
        resizableColumns:false,
        height:'1000x',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Object', field:'object',hozAlign:'left', frozen:true},        
        {title:'Method', field:'method',hozAlign:'left'},
        ],
      })
    })
    .catch(err => console.log(err))
}
async function schBrandView(name) {
  let labels = [
    'Brand',
    
  ]
  await axios.get('/api/brand/recipe/sch/' + name)
    .then(res => {
      let data = res.data
      // let tableData = convert(data, labels)
      let tableData = convert2(data)
      // let tableData = convert2(data)
      tableViewBrandSch = new Tabulator('#viewFinRecipeSchTable', {
        resizableColumns:false,
        height:'1000x',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Object', field:'object',hozAlign:'left', frozen:true},        
        {title:'Method', field:'method',hozAlign:'left'},
        ],
      })
    })
    .catch(err => console.log(err))
}

document.getElementById('finBrandView').addEventListener('change', selectViewFin)
function selectViewFin() {
  document.getElementById('viewLineageBoxFin').style.display="block"
  document.getElementById('viewLineageBoxChp').style.display="none"

  let brand = document.getElementById('finBrandView').value

  finBrandView(brand)

  document.getElementById('brwBrandView').selectedIndex = 0
  
}
async function finBrandView(name) {
  let labels = [
    'Brand',
    'Ctrl Filter OG',
    'Ctrl Filter Alc',
    'Ctrl Filter Cal',
    'Ctrl Filter Carb',
    'Ctrl Filter RDF',
    'Ctrl Filter Co2',
    'Ctrl Filter CC',
    'Ctrl Release OG',
    'Ctrl Release Alc',
    'Ctrl Release Cal',
    'Ctrl Release Carb',
    'Ctrl Release RDF',
    'Ctrl Release Co2',
    'Ctrl Release CC',
    'Set Point OG',
    'LOSL OG',
    'LOSH OG',
    'Set Point Alc',
    'LOSL Alc',
    'LOSH ALc',
    'Set Point Cal',
    'LOSL Cal',
    'LOSH Cal',
    'Set Point Carb',
    'LOSL Carb',
    'LOSH Carb',
    'Set Point RDF',
    'LOSL RDF',
    'LOSH RDF',
    'Set Point Co2',
    'LOSL Co2',
    'LOSH Co2',
    'Set Point CC',
    'LOSL CC',
    'LOSH CC',
    'Note'
  ]
  await axios.get('/api/brand/recipe/fin/' + name)
    .then(res => {
      let data = res.data
      let tableData = convert(data, labels)
      // let tableData = convert2(data)
      tableViewBrandFin = new Tabulator('#viewFinRecipeFinTable', {
        resizableColumns:false,
        height:'1000x',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Object', field:'object',hozAlign:'left', frozen:true},        
        {title:'Method', field:'method',hozAlign:'left'},
        ],
      })
    })
    .catch(err => console.log(err))
}
