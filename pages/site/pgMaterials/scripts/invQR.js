function createNode(element) {
  return document.createElement(element)
}
function append(parent, e1) {
  return parent.appendChild(e1)
}
function createListCommodity(api, parent, title) {
  axios.post(api, {active: false})
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
function select(el) {
  return document.querySelector(el)
}


// On Window Load
function commodityList() {
  let dropDown = document.getElementById('selection')
  dropDown.innerHTML = `<option value="" disabled selected hidden>Select Commodity</option>`
  const api = '/api/commodity/get'
  let title = 'commodity'
  createListCommodity(api, dropDown, title)
}


// On select
document.getElementById('selection').addEventListener('change', generateQR)
function generateQR() {
  let qrLabel = select('label')
  let qrcode = select('img')
  let data = select('select').value
  let size = '130x130'
  let baseURL = 'https://api.qrserver.com/v1/create-qr-code/'
  let url = `${baseURL}?data=${data}&size=${size}`
  
  qrLabel.innerHTML = data
  qrcode.src = url
}


// On Print
function printDiv(divName) {
    let printContents = document.getElementById(divName).innerHTML 
    document.body.innerHTML = `<div class="qrbox" id="printableArea">${printContents}</div>`
    window.print()
    window.location.reload(true);
}


window.addEventListener('DOMContentLoaded',async (ev) => {
  commodityList()
})