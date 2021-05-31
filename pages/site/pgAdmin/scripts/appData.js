document.getElementById('upload').addEventListener('change', handleFileSelect, false);
function handleFileSelect(ev) {
  let files = ev.target.files;
  let xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
}
let sheetNames = [`Supplier`, `Commodity`, `BrewBrand`, `FinBrand`, `PackBrand`];
let sendData = [];
let ExcelToJSON = function () {
  this.parseExcel = function (file) {
    let reader = new FileReader();
    reader.onload = function (ev) {
      let data = ev.target.result;
      let workbook = XLSX.read(data, { type: 'binary' });
      for (let i = 0; i < sheetNames.length; i++) {
        let XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetNames[i]]);
        sendData.push(XL_row_object);
      }

      console.log(sendData);
      document.getElementById('upload').value = '';
    };
    reader.onerror = (ex) => console.log(ex);
    reader.readAsBinaryString(file);
  };
};
