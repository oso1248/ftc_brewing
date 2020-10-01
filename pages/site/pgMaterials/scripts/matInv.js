function openQRCamera(node) {
  let reader = new FileReader()
  reader.onload = function() {
    node.value = ""
    qrcode.callback = function(res) {
      if(res instanceof Error) {
        alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.")
      } else {
        // alert(res)
        node.parentNode.previousElementSibling.value = res
      }
    }
    qrcode.decode(reader.result)
  }
  // reader.readAsDataURL(node.files[0])
}

document.getElementById('scanner').addEventListener('click', openQRCamera)
