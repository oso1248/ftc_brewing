let DateTime = luxon.DateTime

let mids = DateTime.local().startOf('day').minus({hours: .5}).toFormat('yyyy-MM-dd TTT')
let days = DateTime.local().startOf('day').plus({hours: 7.5}).toFormat('yyyy-MM-dd TTT')  
let afts = DateTime.local().startOf('day').plus({hours: 15.5}).toFormat('yyyy-MM-dd TTT')
let ends = DateTime.local().startOf('day').plus({hours: 23.5}).toFormat('yyyy-MM-dd TTT')

String.prototype.toNonAlpha = function (spaces) {
  if(spaces === '') {
    return this.replace(/[^\w\s]/gi, '').replace(/ +(?= )/g,'')
  } else {
    return this.replace(/[^0-9a-z]/gi, '')
  }
}

function getShift(shift) {
  let now = DateTime.local().toFormat('yyyy-MM-dd TTT')
  if(now > mids && now < days) {
    shift.start = mids
    shift.end = days
  } else if(now > days && now < afts) {
    shift.start = days
    shift.end = afts
  } else if(now > afts && now < ends)  {
    shift.start = afts
    shift.end = ends
  }
}

let hopsTable
function setsTable() {
  axios.post('/api/brand/brw/get', {active: true})
    .then(res => {
      let tableData = res.data
      hopsTable = new Tabulator("#invHopDaily", {
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Brand", field:"brand",hozAlign:"center", frozen:true},
        {title:"Sets Made", field:"sets",hozAlign:"center", editor:true, validator:["integer"]},
        ],
      })
    })
    .catch(err => console.log(err))
}

async function sendUpdate() {
  tableData = hopsTable.getData()
  let data = []
  let houses = {}
  let shift = {}
  
  await getSets(data)

  if (data === 'undefined' || data.length == 0) {
    alert('No Sets To Upload')
    return
  }

  await getBrews(houses)
  if(houses === 'undefined' || Object.keys(houses).length < 2) {
    return
  } else {
    data.unshift(houses)
  }

  await getShift(shift)
  data.unshift(shift)
  
  await axios.post('/api/inventory/hop/daily', data)
    .then(data => {
    console.log(data)
    alert('Added')
    setsTable()
    })
    .catch(err => alert(err))
}

function getSets(data) {
  for (let i = 0; i < tableData.length; i++) {
    if(typeof tableData[i].sets != 'undefined' && tableData[i].sets != ''){
      let json = {}
      json.brand = tableData[i].brand
      json.sets = tableData[i].sets
      data.push(json)
    }
  }
}
function getBrews(houses) {
  let bh1 = prompt('Last Brew BH-1')
  if (bh1 == null || bh1 == "") {
     alert('Last Brew Required')
     return
  } else {
    houses.bh1 = bh1.toNonAlpha().toUpperCase()
  }

  let bh2 = prompt('Last Brew BH-2')
  if (bh2 == null || bh2 == "") {
    alert('Last Brew Required')
    return
  } else {
    houses.bh2 = bh2.toNonAlpha().toUpperCase()
  }
}



document.getElementById('btnAddSubmit').addEventListener('click', sendUpdate)
document.getElementById('btnAddClear').addEventListener('click', setsTable)

window.addEventListener('DOMContentLoaded',async (ev) => {
  setsTable()
})
