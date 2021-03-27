let DateTime = luxon.DateTime;

let weeks = [];
function setHeaders() {
  for (let weekCount = 0; weekCount < 8; weekCount++) {
    let week = DateTime.local().startOf('week').plus({ week: weekCount }).toFormat('yyyy-MM-dd');
    weeks.push(week);
  }
}

let projectionTable;
function projectionView() {
  if (projectionTable) {
    viewBrandBrwTable.clearData();
  }
  viewProjection();
}
function viewProjection() {
  axios
    .post('/api/project')
    .then((res) => {
      let tableData = res.data;

      projectionTable = new Tabulator('#projectionTbl', {
        printHeader: '<h1>Commodity Projection<h1>',
        resizableColumns: false,
        height: '100%',
        layoutColumnsOnNewData: true,
        layout: 'fitDataFill',
        data: tableData,
        columns: [
          { title: 'Commodity', field: 'commodity', hozAlign: 'center', frozen: true },
          { title: weeks[0], field: 'week0', hozAlign: 'center', sorter: 'number', formatter: negativeCell },
          { title: weeks[1], field: 'week1', hozAlign: 'center', sorter: 'number', formatter: negativeCell },
          { title: weeks[2], field: 'week2', hozAlign: 'center', sorter: 'number', formatter: negativeCell },
          { title: weeks[3], field: 'week3', hozAlign: 'center', sorter: 'number', formatter: negativeCell },
          { title: weeks[4], field: 'week4', hozAlign: 'center', sorter: 'number', formatter: negativeCell },
          { title: weeks[5], field: 'week5', hozAlign: 'center', sorter: 'number', formatter: negativeCell },
          { title: weeks[6], field: 'week6', hozAlign: 'center', sorter: 'number', formatter: negativeCell },
          { title: weeks[7], field: 'week7', hozAlign: 'center', sorter: 'number', formatter: negativeCell },
        ],
      });
    })
    .catch((err) => console.log(err));
}
function negativeCell(cell) {
  var value = cell.getValue();
  if (value < 0) {
    return `<span style='color:red; font-weight:bold;'>` + value + `</span>`;
  } else {
    return value;
  }
}
document.getElementById('xlsxProjection').addEventListener('click', () => {
  projectionTable.download('xlsx', 'commodity_projection.xlsx', {
    sheetName: 'Projection',
  });
});
document.getElementById('printProjection').addEventListener('click', () => {
  projectionTable.print(false, true);
});

window.addEventListener('DOMContentLoaded', async (ev) => {
  await setHeaders();
  projectionView();
});
