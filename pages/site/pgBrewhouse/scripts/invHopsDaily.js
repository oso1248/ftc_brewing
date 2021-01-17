let DateTime = luxon.DateTime

let mids = DateTime.local().startOf('day').minus({hours: .5}).toFormat('yyyy-MM-dd HH:mm')
let days = DateTime.local().startOf('day').plus({hours: 7.5}).toFormat('yyyy-MM-dd HH:mm')  
let afts = DateTime.local().startOf('day').plus({hours: 15.5}).toFormat('yyyy-MM-dd HH:mm')
let ends = DateTime.local().startOf('day').plus({hours: 23.5}).toFormat('yyyy-MM-dd HH:mm')
let week = DateTime.local().startOf('week').toFormat('yyyy-MM-dd HH:mm')


String.prototype.toNonAlpha = function (spaces) {
  if(spaces === '') {
    return this.replace(/[^\w\s]/gi, '').replace(/ +(?= )/g,'')
  } else {
    return this.replace(/[^0-9a-z]/gi, '')
  }
}


let hopsTable
document.getElementById('btnAddClear').onclick = setsTable
function setsTable() {
  axios.post('/api/brand/brw/get', {active: true})
    .then(res => {
      let tableData = res.data
      hopsTable = new Tabulator('#invHopDaily', {
        height:'330px',
        layout:'fitDataFill',
        data:tableData,
        columns:[
        {title:'Brand', field:'brand',hozAlign:'center', frozen:true},
        {title:'Sets Made', field:'sets',hozAlign:'left', editor:true, validator:['integer']},
        ],
      })
    })
    .catch(err => console.log(err))
}
document.getElementById('btnAddSubmit').addEventListener('click', sendUpdate)
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
    alert('Last Brews Required')
    return
  } else {
    data.unshift(houses)
  }

  await getShift(shift)
  if(shift === 'undefined' || Object.keys(shift).length < 2) {
    alert('please wait until after Midnight')
    return
  } else {
    data.unshift(shift)
  }
  
  axios.post('/api/inventory/hop/daily', data)
    .then(data => {
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
  if (bh1 == null || bh1 == '') {
     alert('Last Brew Required')
     return
  } else {
    houses.bh1 = bh1.toNonAlpha().toUpperCase()
  }

  let bh2 = prompt('Last Brew BH-2')
  if (bh2 == null || bh2 == '') {
    alert('Last Brew Required')
    return
  } else {
    houses.bh2 = bh2.toNonAlpha().toUpperCase()
  }
}
function getShift(shift) {
  let now = DateTime.local().toFormat('yyyy-MM-dd HH:mm')
  
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


window.addEventListener('DOMContentLoaded',async (ev) => {
  setsTable()
})
