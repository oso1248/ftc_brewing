// function openQRCamera(node) {
function openQRCamera() {
  let reader = new FileReader()
  let commodity = document.getElementById('commodity') 
  reader.onload = function() {
    commodity.value = ""
    qrcode.callback = function(res) {
      if(res instanceof Error) {
        alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.")
      } else {
        // alert(res) 
        // node.parentNode.previousElementSibling.value = res
        commodity.value = res
      }
    }
    qrcode.decode(reader.result)
  }
  // reader.readAsDataURL(node.files[0])
}

// document.getElementById('scanner').addEventListener('click', openQRCamera)
