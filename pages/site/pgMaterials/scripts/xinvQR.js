// function docReady(fn) {
//   // see if DOM is already available
//   if (document.readyState === "complete" || document.readyState === "interactive") {
//       // call on next available tick
//       setTimeout(fn, 1);
//   } else {
//       document.addEventListener("DOMContentLoaded", fn);
//   }
// } 

// docReady(function() {
//   var resultContainer = document.getElementById('qr-reader-results');
//   var lastResult, countResults = 0;
  
//   var html5QrcodeScanner = new Html5QrcodeScanner(
//       "qr-reader", { fps: 10, qrbox: 250 });
  
//   function onScanSuccess(qrCodeMessage) {
//       if (qrCodeMessage !== lastResult) {
//           ++countResults;
//           lastResult = qrCodeMessage;
//           resultContainer.innerHTML += `<div>[${countResults}] - ${qrCodeMessage}</div>`;
          
//           // Optional: To close the QR code scannign after the result is found
//           // html5QrcodeScanner.clear()
//       }
//   }
  
//   // Optional callback for error, can be ignored.
//   function onScanError(qrCodeError) {
//       // This callback would be called in case of qr code scan error or setup error.
//       // You can avoid this callback completely, as it can be very verbose in nature.
//   }
  
//   html5QrcodeScanner.render(onScanSuccess, onScanError);
// });

const html5QrCode = new Html5Qrcode(/* element id */ "reader");

// File based scanning
const fileinput = document.getElementById('qr-input-file');
fileinput.addEventListener('change', e => {
  if (e.target.files.length == 0) {
    // No file selected, ignore 
    return;
  }

  // Use the first item in the list
  const imageFile = e.target.files[0];
  html5QrCode.scanFile(imageFile, /* showImage= */true)
  .then(qrCodeMessage => {
    // success, use qrCodeMessage
    console.log(qrCodeMessage);
  })
  .catch(err => {
    // failure, handle it.
    console.log(`Error scanning file. Reason: ${err}`)
  });
});

