let hopsTable
function view() {
  
  axios.get('/api/commodity')
    .then(res => {
      let tableData = res.data

      hopsTable = new Tabulator("#list", {
        height:"330px",
        layout:"fitDataFill",
        data:tableData,
        columns:[
        {title:"Commodity", field:"commodity",hozAlign:"center", frozen:true},
        {title:"SAP", field:"sap",hozAlign:"center"},
        {title:"Active", field:"active",hozAlign:"center"},
        {title:"Inventory", field:"inventory",hozAlign:"center"},
        {title:"Location", field:"location",hozAlign:"center"},
        {title:"Company", field:"company",hozAlign:"center"},
        {title:"Type", field:"type",hozAlign:"center"},
        {title:"Container", field:"container",hozAlign:"center"},
        {title:"Environmental", field:"enviro",hozAlign:"center"},
        {title:"Threshold", field:"threshold",hozAlign:"center"},
        {title:"Per Pallet", field:"per_pallet",hozAlign:"center"},
        {title:"Unit Total", field:"unit_total",hozAlign:"center"},
        {title:"UOM", field:"uom",hozAlign:"center"},
        {title:"Note", field:"note",hozAlign:"center"},
        ],
      })
    })
    .catch(err => console.log(err))
  // document.getElementById('list').style.display="block"
}

window.addEventListener('DOMContentLoaded',async (ev) => {
  view()
})