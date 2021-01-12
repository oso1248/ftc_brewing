const mtl_uom = [
  {uom: 'gal' ,note: ''},
  {uom: 'ltr' ,note: ''},
  {uom: 'lb' ,note: ''},
  {uom: 'kg' ,note: ''},
  {uom: 'pcs' ,note: ''},
  {uom: 'plts' ,note: ''}
]

const mtl_type = [
  {type: 'hop' ,note: ''},
  {type: 'grain' ,note: ''},
  {type: 'adjunct' ,note: ''},
  {type: 'filter' ,note: ''},
  {type: 'chemical' ,note: ''},
  {type: 'malt' ,note: ''},
  {type: 'injection' ,note: ''}
]

const mtl_location = [
  {location: 'Grains' ,note: ''},
  {location: 'Brewhouse I' ,note: ''},
  {location: 'Hops' ,note: ''},
  {location: 'Chips' ,note: ''},
  {location: 'Chip Annex' ,note: ''},
  {location: 'Fermenting' ,note: ''},
  {location: 'Finishing' ,note: ''},
  {location: 'CIP' ,note: ''},
  {location: 'Brewing Center' ,note: ''},
  {location: 'Brewhouse II' ,note: ''}
]

const mtl_enviro = [
  {enviro: 'Reuse' ,note: ''},
  {enviro: 'Recycle' ,note: ''},
  {enviro: 'Return' ,note: ''},
  {enviro: 'Waste' ,note: ''},
]

const mtl_container = [
  {container: 'Box' ,note: ''},
  {container: 'Bag' ,note: ''},
  {container: 'Tote' ,note: ''},
  {container: 'Drum' ,note: ''},
  {container: 'Jug' ,note: ''},
  {container: 'Silo' ,note: ''},
  {container: 'Super Sack' ,note: ''},
  {container: 'Proprietary' ,note: ''}

]

const mtl_supplier = [
  {company: 'Anheuser Busch' ,contact: 'Bud Brewer' ,email: 'bb@anheuser-busch.com' ,phone: '970-490-4500' ,address: '123 Bud' ,note: ''},
  {company: 'Budweiser' ,contact: 'Mich Brewer' ,email: 'mb@anheuser-busch.com' ,phone: '970-490-4660' ,address: '123 Mich' ,note: ''},
  {company: 'Owens Illinois' ,contact: 'Lime Brewer' ,email: 'lv@oi.com' ,phone: '970-490-5899' ,address: '123 Lime' ,note: ''},
  {company: 'Metal Container' ,contact: 'Ultra Brewer' ,email: 'ub@metal-container.com' ,phone: '970-490-5738' ,address: '123 Ultra' ,note: ''},
  {company: 'Alpha Laval' ,contact: 'Space Brewer' ,email: 'sb@alpha-laval.com' ,phone: '970-490-5703' ,address: '123 Space' ,note: ''}
]

const mtl_commodidity = [
  {commodity: 'Herkules Pre Iso' ,active: 'Yes' ,sap: '1493222' ,inventory: 'Fin' ,threshold: 4 ,per_pallet: 40,unit_total: 44 ,note: '' ,uom_id: 3 ,type_id: 1 ,location_id: 4 ,enviro_id: 4,container_id: 4 ,supplier_id: 2},

  {commodity: 'Briess C20 50' ,active: 'Yes' ,sap: '1397607' ,inventory: 'Brw' ,threshold: 200 ,per_pallet: 40,unit_total: 50 ,note: '' ,uom_id: 3 ,type_id: 6 ,location_id: 4 ,enviro_id: 3,container_id: 2 ,supplier_id: 5},

  {commodity: 'Carahell 800' ,active: 'Yes' ,sap: '1815958' ,inventory: 'Brw' ,threshold: 5 ,per_pallet: 1,unit_total: 1090 ,note: '' ,uom_id: 3 ,type_id: 6 ,location_id: 4 ,enviro_id: 3,container_id: 7 ,supplier_id: 5},

  {commodity: 'Cascade' ,active: 'Yes' ,sap: '1752767' ,inventory: 'Brw' ,threshold: 25 ,per_pallet: 25,unit_total: 44 ,note: '' ,uom_id: 3 ,type_id: 1 ,location_id: 2 ,enviro_id: 2,container_id: 1 ,supplier_id: 4},

  {commodity: 'Palisade' ,active: 'Yes' ,sap: '1753301' ,inventory: 'Brw' ,threshold: 25 ,per_pallet: 25,unit_total: 44 ,note: '' ,uom_id: 3 ,type_id: 1 ,location_id: 2 ,enviro_id: 2,container_id: 1 ,supplier_id: 4},

  {commodity: 'Eclipse' ,active: 'Yes' ,sap: '1602671' ,inventory: 'Fin' ,threshold: 20 ,per_pallet: 20,unit_total: 2.59987987987 ,note: '' ,uom_id: 1 ,type_id: 5 ,location_id: 4 ,enviro_id: 4,container_id: 5 ,supplier_id: 3},

  {commodity: 'Cane Sugar Liquid' ,active: 'Yes' ,sap: '1786708' ,inventory: 'Fin' ,threshold: 10 ,per_pallet: 1,unit_total: 3000 ,note: '' ,uom_id: 3 ,type_id: 5 ,location_id: 5 ,enviro_id: 3,container_id: 3 ,supplier_id: 3},

  {commodity: 'Citra' ,active: 'Yes' ,sap: '1753037' ,inventory: 'Brw' ,threshold: 25 ,per_pallet: 25,unit_total: 44 ,note: '' ,uom_id: 3 ,type_id: 1 ,location_id: 2 ,enviro_id: 2,container_id: 1 ,supplier_id: 4},

  {commodity: 'Strawberry Sky Juice' ,active: 'Yes' ,sap: '1847147' ,inventory: 'Fin' ,threshold: 1 ,per_pallet: 1,unit_total: 275 ,note: '' ,uom_id: 1 ,type_id: 5 ,location_id: 4 ,enviro_id: 3,container_id: 3 ,supplier_id: 2},

  {commodity: 'Tahoma Stab' ,active: 'Yes' ,sap: '1752766' ,inventory: 'Brw' ,threshold: 25 ,per_pallet: 25,unit_total: 44 ,note: '' ,uom_id: 3 ,type_id: 1 ,location_id: 2 ,enviro_id: 2,container_id: 1 ,supplier_id: 1},

  {commodity: 'Cane Sugar 2000' ,active: 'Yes' ,sap: '1767161' ,inventory: 'Fin' ,threshold: 5 ,per_pallet: 1,unit_total: 2000 ,note: '' ,uom_id: 3 ,type_id: 3 ,location_id: 4 ,enviro_id: 3,container_id: 7 ,supplier_id: 1},
  
  {commodity: 'Citric Acid' ,active: 'Yes' ,sap: '1361423' ,inventory: 'Fin' ,threshold: 5 ,per_pallet: 1,unit_total: 275 ,note: '' ,uom_id: 1 ,type_id: 7 ,location_id: 7 ,enviro_id: 3,container_id: 3 ,supplier_id: 1},
  
  {commodity: 'Strawberry Lemonade' ,active: 'Yes' ,sap: '1823183' ,inventory: 'Fin' ,threshold: 5 ,per_pallet: 1,unit_total: 275 ,note: '' ,uom_id: 1 ,type_id: 7 ,location_id: 7 ,enviro_id: 3,container_id: 3 ,supplier_id: 1},
]

module.exports = {
  mtl_uom,
  mtl_type,
  mtl_location,
  mtl_enviro,
  mtl_container,
  mtl_supplier,
  mtl_commodidity
}
