let hopsTable
function setsTable() {
  
  axios.post('/api/brand/brw/get', {active: true})
    .then(res => {
      let tableData = res.data
      console.log(tableData)
      hopsTable = new Tabulator("#invHopDaily", {
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Brand", field:"brand",hozAlign:"center", frozen:true},
        {title:"Sets Made", field:"",hozAlign:"center", editor:true, validator:["numeric"]},
        ],
      })
    })
    .catch(err => console.log(err))
}

window.addEventListener('DOMContentLoaded',async (ev) => {
  setsTable()
})
