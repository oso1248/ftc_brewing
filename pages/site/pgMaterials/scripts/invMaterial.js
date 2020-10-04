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

function loadCommodities() {
  const commodities = document.getElementsByName('addCommodity')[0]
  commodities.innerHTML = `<option value="" disabled selected hidden>Select Commodity</option>`
  axios.get('/api/commodity')
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
  axios.get('/api/commodity')
    .then(res => {
      let tableData = res.data

      commodityTable = new Tabulator("#list", {
        height:"330px",
        layout:"fitDataStretch",
        data:tableData,
        columns:[
        {title:"Commodity", field:"commodity",hozAlign:"left", frozen:true},
        {title:"Location", field:"location",hozAlign:"left"},
        ],
      })
    })
    .catch(err => console.log(err))
}
function resetAdd(ev){
  ev.preventDefault() 
  ev.stopPropagation()
  document.getElementById('frmAdd').reset()
}
async function selectCommodity(){
  let commodity = document.getElementById('com_id').value
  axios.get('/api/commodity/' + commodity)
    .then(data => {
      document.getElementById('per_pallet').value = data.data.per_pallet
      document.getElementById('total_per_unit').value = data.data.unit_total
      document.getElementById('note').value = data.data.note

      document.getElementById('pallets').value = ""
      document.getElementById('total_count').value = ""
      // document.getElementById('total_end').value = ""
    })
}
function deleteRow(commodity) {
  commodityTable.getRows()
    .filter(row => row.getData().commodity == commodity)
    .forEach(row => row.delete());
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
  // console.log(data)
  let fails = await validateAdd(data)
  
  if(fails.length === 0) {
    let total = ((parseFloat(data.per_pallet) * parseFloat(data.pallets)) + parseFloat(data.total_count)) * parseFloat(data.total_per_unit)
    // data.push({total_end: total}) 
    data.total_end = total

    // axios.post('/api/supplier', data)
    //   .then(data => {
    //     alert(data.data.company + ' has been added')
    //   })
    //   .catch(err => alert(err))
    alert(JSON.stringify(data))
    deleteRow(data.com_id)
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
   
  if(data.com_id === ""){
      failures.push({input:'commodity', msg:'Required'})
      data.com_id = null
  }
  // if(data.per_pallet === "" && data.pallets !== ""){
  //   failures.push({input:'Per Pallet', msg:'Required'})
  //   data.per_pallet = null
  // }
  if(data.per_pallet === ""){
    failures.push({input:'per pallet', msg:'Required'})
    data.per_pallet = null
  } else if (!data.per_pallet.testNanFormat()) {
      failures.push({input:'per pallet', msg:'To 2 Decimals Only'})
  }
  if(data.pallets === ""){
    failures.push({input:'pallets', msg:'Required'})
    data.pallets = null
  } else if (!data.pallets.testNanFormat()) {
      failures.push({input:'pallets', msg:'To 2 Decimals Only'})
  }
  if(data.total_per_unit === ""){
    failures.push({input:'unit total', msg:'Required'})
    data.total_per_unit = null
  } else if (!data.total_per_unit.testNanFormat()) {
      failures.push({input:'unit total', msg:'To 2 Decimals Only'})
  }
  if(data.total_count === ""){
    failures.push({input:'count', msg:'Required'})
    data.total_count = null
  } else if (!data.total_count.testNanFormat()) {
    failures.push({input:'count', msg:'To 2 Decimals Only'})
  } 
  return failures
}


document.getElementById('btnAddClear').addEventListener('click', resetAdd)
document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)
document.getElementById('com_id').addEventListener('change', selectCommodity)

window.addEventListener('DOMContentLoaded', (ev) => {
  loadCommodities()
  commodityList()
})
