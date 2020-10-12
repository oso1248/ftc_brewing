let generateBtn = select("select")

generateBtn.addEventListener("change", generateQR);

function generateQR() {
  let qrLabel = select("label")
  let qrcode = select("img")
  let data = select("select").value
  let size = "130x130"
  let baseURL = "https://api.qrserver.com/v1/create-qr-code/"
  let url = `${baseURL}?data=${data}&size=${size}`
  
  console.log(data)
  qrLabel.innerHTML = data
  qrcode.src = url
  
}

function select(el) {
  return document.querySelector(el)
}

function printDiv(divName) {
    let printContents = document.getElementById(divName).innerHTML
    
    document.body.innerHTML = `<div class="qrbox" id="printableArea">${printContents}</div>`

    window.print()
    
    window.location.reload(true);
}
