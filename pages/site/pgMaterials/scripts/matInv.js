// // function openQRCamera(node) {
// async function openQRCamera() {
//   console.log('hello')
//   let reader = new FileReader()
//   let commodity = document.getElementById('commodity') 
//   reader.onload = function() {
//     commodity.value = ""
//     qrcode.callback = function(res) {
//       if(res instanceof Error) {
//         alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.")
//       } else {
//         alert(res) 
//         // node.parentNode.previousElementSibling.value = res
//         commodity.value = res
//       }
//     }
//     qrcode.decode(reader.result)
//   }
//   reader.readAsDataURL(commodity.files[0])
//   // reader.readAsDataURL(node.files[0])
// }



function openQRCamera(node) {
  var reader = new FileReader();
  reader.onload = function() {
    node.value = "";
    qrcode.callback = function(res) {
      if(res instanceof Error) {
        alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.")
      } else {
        alert(res)
        node.parentNode.previousElementSibling.value = res
      }
    }
    qrcode.decode(reader.result)
  }
  reader.readAsDataURL(node.files[0])
}


document.getElementById('scanner2').addEventListener('click', scan)

function scan() {
  document.getElementById('scanner').click()
}


