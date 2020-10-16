function onAfterCaptureScan(ev) {
  let text = ev.value
  document.getElementById('scans').innerHTML = text
}

