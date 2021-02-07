function createNode(element) {
  return document.createElement(element);
}
function append(parent, e1) {
  return parent.appendChild(e1);
}

// On window load
function loadTrailers() {
  const trailers = document.getElementsByName('selectTrailer')[0];
  trailers.innerHTML = `<option value="" disabled selected hidden>Select Trailer</option>`;
  axios
    .post('/api/craft/trailer/get')
    .then((data) => {
      let trailer = data.data.rows;
      return trailer.map((listItem) => {
        let trailer = createNode('option');
        trailer.innerHTML = listItem.id;
        trailer.trailer_id = listItem.id;

        append(trailers, trailer);
      });
    })
    .catch((err) => console.log(err.detail));
}

// Add form
document.getElementById('trailer_id').addEventListener('change', trailerGet);
async function trailerGet() {
  let trailer = document.getElementById('trailer_id').value;

  inventoryList(trailer);
}

// trailer inv table
let inventoryTable;
function inventoryList(id) {
  axios
    .post('/api/craft/trailer/inv/view/' + id)
    .then((res) => {
      let tableData = res.data.rows;
      inventoryTable = new Tabulator('#invList', {
        resizableColumns: false,
        selectable: true,
        height: '330px',
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Commodity', field: 'commodity', hozAlign: 'left', frozen: true },
          { title: 'Count', field: 'count', hozAlign: 'left' },
        ],
      });
    })
    .catch((err) => console.log(err));
}

// receive
document.getElementById('btnTrailerReceive').addEventListener('click', receive);
function receive(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  let trailer = document.getElementById('trailer_id').value;
  let data = {};
  data.trailer_id = trailer;
  axios
    .post('/api/craft/trailer/receive/', data)
    .then((data) => {
      let msg = `Trailer Received`;
      alert(msg);
      inventoryList(trailer);
      document.getElementById('frmAdd').reset();
    })
    .catch((err) => alert(err));
}

document.getElementById('btnBack').addEventListener('click', () => {
  window.history.back();
});
window.addEventListener('DOMContentLoaded', async (ev) => {
  loadTrailers();
});
