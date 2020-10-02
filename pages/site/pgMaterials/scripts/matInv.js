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

  function resetAdd(ev){
    ev.preventDefault();
    console.log('reset')
    document.getElementById('frmAdd').reset();
  }

  document.getElementById('btnAddClear').addEventListener('click', resetAdd)
// document.getElementById('btnAddSubmit').addEventListener('click', sendAdd)