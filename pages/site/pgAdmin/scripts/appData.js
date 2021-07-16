document.getElementById('sendSuppliers').style.display = 'none';
document.getElementById('sendCommodities').style.display = 'none';
document.getElementById('sendBrwBrands').style.display = 'none';
document.getElementById('sendFinBrands').style.display = 'none';
document.getElementById('sendPackBrands').style.display = 'none';
document.getElementById('sendStandardHops').style.display = 'none';
document.getElementById('sendDryHops').style.display = 'none';
document.getElementById('sendSuperSacks').style.display = 'none';
document.getElementById('goHome').style.display = 'none';
document.getElementById('endMessage').style.display = 'none';

document.getElementById('upload').addEventListener('change', handleFileSelect, false);
async function handleFileSelect(ev) {
  let files = ev.target.files;
  let sheetNames = [`Supplier`, `Commodity`, `BrewBrand`, `FinBrand`, `PackBrand`, `StandardHop`, `DryHop`, `SuperSack`];
  parseExcel(files[0], sheetNames);
}
let sendData = [];
function parseExcel(file, sheetNamesArray) {
  let reader = new FileReader();
  reader.onload = function (ev) {
    let data = ev.target.result;
    let workbook = XLSX.read(data, { type: 'binary' });
    for (let i = 0; i < sheetNamesArray.length; i++) {
      let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetNamesArray[i]]);
      sendData.push(XL_row_object);
    }
    document.getElementById('upload').value = '';
    document.getElementById('chooseFile').style.display = 'none';
    document.getElementById('sendSuppliers').style.display = 'block';
  };
  reader.onerror = (ex) => console.log(ex);
  reader.readAsBinaryString(file);
}

document.getElementById('sendSuppliers').addEventListener('click', sendSuppliers);
function sendSuppliers(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  console.log(`Suppliers`);
  console.table(sendData[0]);
  document.getElementById('sendSuppliers').style.display = 'none';
  document.getElementById('sendCommodities').style.display = 'block';
  axios
    .post('/api/startup/suppliers', sendData[0])
    .then((data) => {
      alert(`${data.data[0].count} Suppliers Added.`);
      document.getElementById('sendSuppliers').style.display = 'none';
      document.getElementById('sendCommodities').style.display = 'block';
    })
    .catch((err) => alert(err));
}
document.getElementById('sendCommodities').addEventListener('click', sendCommodities);
function sendCommodities(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  console.log(`Commodities`);
  console.table(sendData[1]);

  axios
    .post('/api/startup/commodities', sendData[1])
    .then((data) => {
      alert(`${data.data[0].count} Commodities Added.`);
      document.getElementById('sendCommodities').style.display = 'none';
      document.getElementById('sendBrwBrands').style.display = 'block';
    })
    .catch((err) => alert(err));
}
document.getElementById('sendBrwBrands').addEventListener('click', sendBrew);
function sendBrew(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  console.log(`Brewing`);
  console.table(sendData[2]);

  axios
    .post('/api/startup/brew', sendData[2])
    .then((data) => {
      alert(`${data.data[0].count} Brew Brands Added.`);
      document.getElementById('sendBrwBrands').style.display = 'none';
      document.getElementById('sendFinBrands').style.display = 'block';
    })
    .catch((err) => alert(err));
}
document.getElementById('sendFinBrands').addEventListener('click', sendFin);
function sendFin(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  console.log(`Finishing`);
  console.table(sendData[3]);

  axios
    .post('/api/startup/fin', sendData[3])
    .then((data) => {
      alert(`${data.data[0].count} Finishing Brands Added.`);
      document.getElementById('sendFinBrands').style.display = 'none';
      document.getElementById('sendPackBrands').style.display = 'block';
    })
    .catch((err) => alert(err));
}
document.getElementById('sendPackBrands').addEventListener('click', sendPack);
function sendPack(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  console.log(`Packaging`);
  console.table(sendData[4]);

  axios
    .post('/api/startup/pack', sendData[4])
    .then((data) => {
      alert(`${data.data[0].count} Packaging Brands Added.`);
      document.getElementById('sendPackBrands').style.display = 'none';
      document.getElementById('sendStandardHops').style.display = 'block';
    })
    .catch((err) => alert(err));
}
document.getElementById('sendStandardHops').addEventListener('click', sendStandardHops);
function sendStandardHops(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  console.log(`Standard Hops`);
  console.table(sendData[5]);

  axios
    .post('/api/startup/standardHops', sendData[5])
    .then((data) => {
      console.log(data.data[0].count);
      alert(`${data.data[0].count} Rows Updated.`);
      document.getElementById('sendStandardHops').style.display = 'none';
      document.getElementById('sendDryHops').style.display = 'block';
    })
    .catch((err) => alert(err));
}
document.getElementById('sendDryHops').addEventListener('click', sendDryHops);
function sendDryHops(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  console.log(`Dry Hops`);
  console.table(sendData[6]);

  axios
    .post('/api/startup/dryHops', sendData[6])
    .then((data) => {
      alert(`${data.data[0].count} Rows Updated.`);
      document.getElementById('sendDryHops').style.display = 'none';
      document.getElementById('sendSuperSacks').style.display = 'block';
    })
    .catch((err) => alert(err));
}
document.getElementById('sendSuperSacks').addEventListener('click', sendSuperSacks);
function sendSuperSacks(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  console.log(`Super Sacks`);
  console.table(sendData[7]);

  axios
    .post('/api/startup/superSacks', sendData[7])
    .then((data) => {
      alert(`${data.data[0].count} Rows Updated.`);
      document.getElementById('sendSuperSacks').style.display = 'none';
      document.getElementById('goHome').style.display = 'block';
      document.getElementById('endMessage').style.display = 'block';
    })
    .catch((err) => alert(err));
}
document.getElementById('goHome').addEventListener('click', goHome);
function goHome(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  parent.location = '../../index.html';
}
