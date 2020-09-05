const mtl_uom = [
  {id: 1,uom: 'gal' ,note: ''},
  {id: 2,uom: 'ltr' ,note: ''},
  {id: 3,uom: 'lb' ,note: ''},
  {id: 4,uom: 'kg' ,note: ''},
  {id: 5,uom: 'pcs' ,note: ''},
  {id: 6,uom: 'plts' ,note: ''}
]

const mtl_type = [
  {id: 1,type: 'hop' ,note: ''},
  {id: 2,type: 'grain' ,note: ''},
  {id: 3,type: 'adjunct' ,note: ''},
  {id: 4,type: 'filter' ,note: ''},
  {id: 5,type: 'Chemical' ,note: ''},
  {id: 6,type: 'Malt' ,note: ''}
]

const mtl_location = [
  {id: 1,location: 'Grains' ,note: ''},
  {id: 2,location: 'Brewhouse I' ,note: ''},
  {id: 3,location: 'Hops' ,note: ''},
  {id: 4,location: 'Chips' ,note: ''},
  {id: 5,location: 'Chip Annex' ,note: ''},
  {id: 6,location: 'Fermenting' ,note: ''},
  {id: 7,location: 'Finishing' ,note: ''},
  {id: 8,location: 'CIP' ,note: ''},
  {id: 9,location: 'Brewing Center' ,note: ''},
  {id: 10,location: 'Brewhouse II' ,note: ''}
]

const mtl_enviro = [
  {id: 1,enviro: 'Reuse' ,note: ''},
  {id: 2,enviro: 'Recycle' ,note: ''},
  {id: 3,enviro: 'Return' ,note: ''},
  {id: 4,enviro: 'Waste' ,note: ''},
]

const mtl_container = [
  {id: 1,container: 'Box' ,note: ''},
  {id: 2,container: 'Bag' ,note: ''},
  {id: 3,container: 'Tote' ,note: ''},
  {id: 4,container: 'Drum' ,note: ''},
  {id: 5,container: 'Jug' ,note: ''},
  {id: 6,container: 'Silo' ,note: ''},
  {id: 7,container: 'Super Sack' ,note: ''},
  {id: 8,container: 'Proprietary' ,note: ''}

]

const mtl_supplier = [
  {id: 1,company: 'Anheuser Busch' ,contact: 'Rachel Hinkel' ,email: 'rachel.hinkel@anheuser-busch.com' ,phone: '970-490-4500' ,address: '' ,note: ''},
  {id: 2,company: 'Budweiser' ,contact: 'Madi Teeuws' ,email: 'madi.teeuws@anheuser-busch.com' ,phone: '970-490-4660' ,address: '' ,note: ''},
  {id: 3,company: 'Owens Illinois' ,contact: 'Emily Feld' ,email: 'emily.feld@oi.com' ,phone: '970-490-5899' ,address: '' ,note: ''},
  {id: 4,company: 'Metal Container' ,contact: 'Megan Khor' ,email: 'megan.kohr@metal-container.com' ,phone: '970-490-5738' ,address: '' ,note: ''},
  {id: 5,company: 'Alpha Laval' ,contact: 'Meika Woollard' ,email: 'meika.woollard@alpha-laval.com' ,phone: '970-490-5703' ,address: '' ,note: ''}
]

const mtl_commodidity = [
  {id: 1,commodity: 'AB 50/10' ,active: 'Yes' ,sap: '1493222' ,inventory: 'Fin' ,threshold: 4 ,per_pallet: 4,unit_total: 605 ,note: '' ,uom_id: 3 ,type_id: 5 ,location_id: 4 ,enviro_id: 4,container_id: 4 ,supplier_id: 2},

  {id: 2,commodity: 'Briess C20 50' ,active: 'Yes' ,sap: '1397607' ,inventory: 'Brw' ,threshold: 200 ,per_pallet: 40,unit_total: 50 ,note: '' ,uom_id: 3 ,type_id: 6 ,location_id: 4 ,enviro_id: 3,container_id: 2 ,supplier_id: 5},

  {id: 3,commodity: 'Caramel Rye 1090' ,active: 'Yes' ,sap: '1815958' ,inventory: 'Brw' ,threshold: 5 ,per_pallet: 1,unit_total: 1090 ,note: '' ,uom_id: 3 ,type_id: 6 ,location_id: 4 ,enviro_id: 3,container_id: 7 ,supplier_id: 5},

  {id: 4,commodity: 'Cascade' ,active: 'Yes' ,sap: '1752767' ,inventory: 'Brw' ,threshold: 25 ,per_pallet: 25,unit_total: 44 ,note: '' ,uom_id: 3 ,type_id: 1 ,location_id: 2 ,enviro_id: 2,container_id: 1 ,supplier_id: 4},

  {id: 5,commodity: 'Centennial' ,active: 'Yes' ,sap: '1753301' ,inventory: 'Brw' ,threshold: 25 ,per_pallet: 25,unit_total: 44 ,note: '' ,uom_id: 3 ,type_id: 1 ,location_id: 2 ,enviro_id: 2,container_id: 1 ,supplier_id: 4},

  {id: 6,commodity: 'Eclipse' ,active: 'Yes' ,sap: '1602671' ,inventory: 'Fin' ,threshold: 20 ,per_pallet: 20,unit_total: 2.59987987987 ,note: '' ,uom_id: 1 ,type_id: 5 ,location_id: 4 ,enviro_id: 4,container_id: 5 ,supplier_id: 3},

  {id: 7,commodity: 'Cane Sugar Liquid' ,active: 'Yes' ,sap: '1786708' ,inventory: 'Fin' ,threshold: 10 ,per_pallet: 1,unit_total: 3000 ,note: '' ,uom_id: 3 ,type_id: 3 ,location_id: 5 ,enviro_id: 3,container_id: 3 ,supplier_id: 3},

  {id: 8,commodity: 'Nugget' ,active: 'Yes' ,sap: '1753037' ,inventory: 'Brw' ,threshold: 25 ,per_pallet: 25,unit_total: 44 ,note: '' ,uom_id: 3 ,type_id: 1 ,location_id: 2 ,enviro_id: 2,container_id: 1 ,supplier_id: 4},

  {id: 9,commodity: 'Strawberry Sky Juice' ,active: 'Yes' ,sap: '1847147' ,inventory: 'Fin' ,threshold: 1 ,per_pallet: 1,unit_total: 275 ,note: '' ,uom_id: 1 ,type_id: 5 ,location_id: 4 ,enviro_id: 3,container_id: 3 ,supplier_id: 2},

  {id: 10,commodity: 'Tahoma Stab' ,active: 'Yes' ,sap: '1752766' ,inventory: 'Brw' ,threshold: 25 ,per_pallet: 25,unit_total: 44 ,note: '' ,uom_id: 3 ,type_id: 1 ,location_id: 2 ,enviro_id: 2,container_id: 1 ,supplier_id: 1},

  {id: 11,commodity: 'Cane Sugar 2000' ,active: 'Yes' ,sap: '1767161' ,inventory: 'Fin' ,threshold: 5 ,per_pallet: 1,unit_total: 2000 ,note: '' ,uom_id: 3 ,type_id: 3 ,location_id: 4 ,enviro_id: 3,container_id: 7 ,supplier_id: 1},
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