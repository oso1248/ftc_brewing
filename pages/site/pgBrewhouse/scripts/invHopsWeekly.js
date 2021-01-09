let DateTime = luxon.DateTime

function openQRCamera(node) {
  let reader = new FileReader();
  reader.onload = function() {
    node.value = "";
    qrcode.callback = function(res) {
      if(res instanceof Error) {
        alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.")
      } else {
        // alert(res)
        // document.getElementById('comm').value = res
        document.getElementById(res).selected = true
        selectCommodity()
        
      }
    }
    qrcode.decode(reader.result)
  }
  reader.readAsDataURL(node.files[0])
  
}

function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}
function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function createList(api, parent, title, data) {
  axios.post(api, data)
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

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + 
    txt.substr(1).toLowerCase()})
}
String.prototype.toNonAlpha = function (spaces) {
  if(spaces === '') {
    return this.replace(/[^\w\s]/gi, '').replace(/ +(?= )/g,'')
  } else {
    return this.replace(/[^0-9a-z]/gi, '')
  }
}
String.prototype.testNanFormat = function () {
    return (/^\d+(\.\d{1,2})?$/).test(this)
}

async function processArray(array) {
  for (const item of array) {
    await deleteRow(item.commodity)
    console.log(item.commodity)
  }
}
async function deleteOnLoad() {
  let data = {}
  data.startDate = DateTime.local().startOf('day').minus({minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  data.endDate = DateTime.local().endOf('day').minus({minutes: 29}).toFormat('yyyy-MM-dd HH:mm')
  axios.post('/api/inventory/hop/weekly/view', data)
    .then(res => {
      res.data.forEach(async (item) => {
        setTimeout(function(){
          deleteRow(item.commodity)
        }, 1);
    }) 
  })
    .catch(err => console.log(err))
}
function loadCommodities() {
  const commodities = document.getElementsByName('addCommodity')[0]
  commodities.innerHTML = `<option value="" disabled selected hidden>Select Commodity</option>`
  axios.post('/api/commodity/get/type/hop', {active:false})
  .then(data => {
    let commodity = data.data
    return commodity.map(listItem => {
      let commodity = createNode('option')
      commodity.innerHTML = listItem.commodity
      commodity.id = listItem.commodity
      
      append(commodities, commodity)
    })
  })
  .catch(err => console.log(err.detail))
}
let commodityTable
function commodityList() {
  axios.post('/api/commodity/get/type/hop', {active: false})
    .then(res => {
      let tableData = res.data

      commodityTable = new Tabulator("#list", {
        resizableColumns:false,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Commodity", field:"commodity",hozAlign:"left", frozen:true},
        {title:"Location", field:"location",hozAlign:"left"},
        {title:"Active", field:"active",hozAlign:"left"},
        ],
      })
    })
    .catch(err => console.log(err))
}
let inventoryTable
function inventoryList() {
  let data = {}
  data.startDate = DateTime.local().startOf('day').minus({minutes: 30}).toFormat('yyyy-MM-dd HH:mm')
  data.endDate = DateTime.local().endOf('day').minus({minutes: 29}).toFormat('yyyy-MM-dd HH:mm')
  axios.post('/api/inventory/hop/weekly/view', data)
    .then(res => {
    for(let i = 0; i < res.data.length; i++) {
      res.data[i].created_at = DateTime.fromISO(res.data[i].created_at).toFormat('yyyy-MM-dd')
    }
      let tableData = res.data
      inventoryTable = new Tabulator("#invList", {
        resizableColumns:false,
        selectable:true,
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Commodity", field:"commodity",hozAlign:"center", frozen:true},
        {title:"SAP", field:"sap", hozAlign:"center"},
        {title:"Pounds", field:"lbs",hozAlign:"center"},
        {title:"Lot", field:"lot",hozAlign:"center"},
        {title:"Username", field:"username",hozAlign:"center"},
        {title:"Date", field:"created_at",hozAlign:"center"},
        {title:"Note", field:"note",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err.detail))
}
document.getElementById('btnDeleteInv').addEventListener('click', deleteRowInv)
async function deleteRowInv(ev) {
  ev.preventDefault() 
  ev.stopPropagation()
  
  let selectedData = inventoryTable.getSelectedData()
  if (selectedData.length > 1) {
    alert('Can only delete 1 row at a time.')
    return
  }
  
  if (!confirm(`Are you sure you want to delete\n\n ${selectedData[0].commodity} \n\nfrom the inventory?`)) {
   return
  }
  await axios.delete('/api/inventory/hop/weekly/'+ selectedData[0].id)
    .then(data => {
      alert(data.data.msg)
    })
    .catch(err => alert(err))
  
  await commodityList()
  await inventoryList()
  await deleteOnLoad()
}


function resetAdd(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  document.getElementById('frmAdd').reset()
}
async function selectCommodity(){
  let commodity = document.getElementById('com_id').value
  loadForm(commodity)
  loadLots(commodity)
}
function loadForm(commodity) {
  axios.post('/api/commodity/name', {name:`${commodity}`})
    .then(data => {
      document.getElementById('per_pallet').value = data.data.per_pallet
      document.getElementById('per_unit').value = data.data.unit_total
      document.getElementById('note').value = data.data.note

      document.getElementById('pallet_count').value = ""
      document.getElementById('lbs').value = ""
      document.getElementById('lot').value = ""
      
      if(data.data.active === 'No') {
        let msg = `${data.data.commodity} is Active No.\nOnly Add to Inventory if Needed.`
        alert(msg)
      }
    })
}
async function loadLots(commodity) {
  let dropDown = document.getElementById('lots')
  let api = '/api/inventory/hop/daily/lots'
  let data = {commodity: `${commodity}`}
  let title = 'lot'
  await removeChildren(dropDown)
  createList(api, dropDown, title, data)
}

async function deleteRow(commodity) {
    commodityTable.getRows()
      .filter(row => row.getData().commodity == commodity)
      .forEach(row => row.delete())
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
    axios.post('/api/inventory/hop/weekly', data)
      .then(data => {
        let msg = `${data.data[0].commodity}\n ${data.data[0].lbs} ${data.data[0].uom}\n Added to Inventory`
        alert(msg)
        deleteRow([data.data[0].commodity])
        inventoryList()
        document.getElementById('frmAdd').reset()  
      })
      .catch(err => alert(err))
  } else {
    let msg = "Problems:\n"
    for(i = 0; i < fails.length; i++) {
      msg = msg + "\n" +fails[i].input + " " + fails[i].msg 
    }
    alert(msg)
  }
}
async function validateAdd (data){
  let failures = []
   
  if(data.com_id === ""){
      failures.push({input:'commodity', msg:'Required'})
      data.com_id = null
  }
  if(data.per_pallet != '' && !data.per_pallet.testNanFormat()) {
    failures.push({input:'per pallet', msg:'To 2 Decimals Only'})
  } else if(data.per_pallet == '') {
    data.per_pallet = 0
  }
  if(data.pallet_count != '' && !data.pallet_count.testNanFormat()) {
    failures.push({input:'pallet count', msg:'To 2 Decimals Only'})
  } else if(data.pallet_count == '') {
    data.pallet_count = 0
  }
  if(data.per_unit != '' && !data.per_unit.testNanFormat()) {
    failures.push({input:'per unit', msg:'To 2 Decimals Only'})
  } else if(data.per_unit == '') {
    data.per_unit = 0
  }
  if(data.unit_count != '' && !data.unit_count.testNanFormat()) {
    failures.push({input:'unit count', msg:'To 2 Decimals Only'})
  } else if(data.unit_count == '') {
    data.unit_count = 0
  }
  if(data.lbs != '' && !data.lbs.testNanFormat()) {
    failures.push({input:'loose pounds', msg:'To 2 Decimals Only'})
  } else if(data.lbs == '') {
    data.lbs = 0
  }
  if(data.lot === ''){
    failures.push({input:'lot', msg:'Required'})
    data.lot = null
  } else {
    data.lot = data.lot.toNonAlpha().toUpperCase()
  }
  if(data.note != '') {
    data.note = data.note.toNonAlpha('').toProperCase()
  }
  
  data.lbs = (((parseFloat(data.per_pallet)*parseFloat(data.pallet_count))+parseFloat(data.unit_count))*parseFloat(data.per_unit))+parseFloat(data.lbs)
  delete data.pallet_count
  delete data.per_pallet
  delete data.per_unit
  delete data.unit_count
  // if (Object.is(data.lbs, NaN)) {
  //   failures.push({input:'ALERT', msg:'No Pounds To Add'})
  // }
  if (data.lbs === 0) {
    failures.push({input:'ALERT', msg:'No Pounds To Add'})
  }

  return failures
}


document.getElementById('btnAddClear').addEventListener('click', resetAdd)
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)
document.getElementById('com_id').addEventListener('change', selectCommodity)

window.addEventListener('DOMContentLoaded',async (ev) => {
  await loadCommodities()
  await commodityList()
  await inventoryList()
  await deleteOnLoad()
})
