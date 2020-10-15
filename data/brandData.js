const brnd_brw = [
  {brand:"BH40",hop_std:"Yes",hop_crft:"No",hop_dry:"No",supr_sac:"No",active:"Yes",note:""},
  {brand:"BH50",hop_std:"Yes",hop_crft:"No",hop_dry:"No",supr_sac:"No",active:"Yes",note:""},
  {brand:"NL50",hop_std:"Yes",hop_crft:"No",hop_dry:"No",supr_sac:"No",active:"Yes",note:""},
  {brand:"PT90",hop_std:"Yes",hop_crft:"No",hop_dry:"No",supr_sac:"No",active:"Yes",note:""},
  {brand:"EL20",hop_std:"Yes",hop_crft:"Yes",hop_dry:"No",supr_sac:"Yes",active:"Yes",note:""},
  {brand:"GI19",hop_std:"Yes",hop_crft:"Yes",hop_dry:"Yes",supr_sac:"Yes",active:"Yes",note:""}
  ]
   
  const brnd_fin = [
  {brand:"HBBL",brw_id:1,active:"Yes",note:""},
  {brand:"HBUD",brw_id:2,active:"Yes",note:""},
  {brand:"HBNL",brw_id:3,active:"Yes",note:""},
  {brand:"HBNS",brw_id:3,active:"Yes",note:""},
  {brand:"EBIN",brw_id:3,active:"Yes",note:""},
  {brand:"PTHD",brw_id:4,active:"Yes",note:""},
  {brand:"ELSP",brw_id:5,active:"Yes",note:""},
  {brand:"9GNC",brw_id:6,active:"Yes",note:""},
  ]
   
  const brnd_pck = [
  {brand:"BDL5",fin_id:1,active:"Yes",note:""},
  {brand:"BUD5",fin_id:2,active:"Yes",note:""},
  {brand:"ABN5",fin_id:3,active:"Yes",note:""},
  {brand:"NLS5",fin_id:4,active:"Yes",note:""},
  {brand:"NTI6",fin_id:5,active:"Yes",note:""},
  {brand:"BLP6",fin_id:6,active:"Yes",note:""},
  {brand:"ES18",fin_id:7,active:"Yes",note:""},
  {brand:"GNX7",fin_id:8,active:"Yes",note:""},
  ]
   
  const fin_smpl = [
  {fin_id:1,alc:"No",iron:"No",co2o2:"No",cc:"No",taste:"Yes",note:""},
  {fin_id:2,alc:"No",iron:"No",co2o2:"No",cc:"No",taste:"Yes",note:""},
  {fin_id:3,alc:"Yes",iron:"No",co2o2:"No",cc:"No",taste:"Yes",note:""},
  {fin_id:4,alc:"Yes",iron:"No",co2o2:"No",cc:"No",taste:"Yes",note:""},
  {fin_id:5,alc:"Yes",iron:"No",co2o2:"No",cc:"No",taste:"Yes",note:""},
  {fin_id:6,alc:"Yes",iron:"No",co2o2:"No",cc:"No",taste:"Yes",note:""},
  {fin_id:7,alc:"Yes",iron:"No",co2o2:"No",cc:"No",taste:"Yes",note:""},
  {fin_id:8,alc:"Yes",iron:"No",co2o2:"Yes",cc:"No",taste:"Yes",note:""},
  ]
   
  const fin_params = [
  {
  fin_id: 1,
  og_relctrl:"",og_ftrcrtl:"",og_sp:"",og_losl:"8.15",og_losh: "9.39",
  alc_relctrl:"Yes",alc_ftrcrtl:"Yes",alc_sp:"3.30",alc_losl:"3.20",alc_losh:"3.45",
  cal_relctrl:"Yes",cal_ftrcrtl:"",cal_sp:"",cal_losl:"100",cal_losh:"115",
  crb_relctrl: "Yes",crb_ftrcrtl: "",crb_sp:"",crb_losl:"5.08",crb_losh:"7.90",
  rdf_relctrl:"",rdf_ftrcrtl:"",rdf_sp:"",rdf_losl:"72",rdf_losh:"82",
  co2_relctrl:"Yes",co2_ftrcrtl:"Yes",co2_sp:"2.70",co2_losl:"2.55",co2_losh:"2.90",
  cc_relctrl:"",cc_ftrcrtl:"",cc_sp:"",cc_losl:"",cc_losh: ""
  },
  {
  fin_id:2,
  og_relctrl:"Yes",og_ftrcrtl:"Yes",og_sp:"11",og_losl:"10.8",og_losh:"11.2",
  alc_relctrl:"Yes",alc_ftrcrtl:"",alc_sp:"",alc_losl:"3.7",alc_losh:"4",
  cal_relctrl:"Yes",cal_ftrcrtl:"",cal_sp:"",cal_losl:"135",cal_losh:"150",
  crb_relctrl:"Yes",crb_ftrcrtl:"",crb_sp:"",crb_losl:"9.1",crb_losh:"12.7",
  rdf_relctrl:"",rdf_ftrcrtl:"",rdf_sp:"",rdf_losl:"66.5",rdf_losh:"71.9",
  co2_relctrl:"Yes",co2_ftrcrtl:"Yes",co2_sp:"2.7",co2_losl:"2.55",co2_losh:"2.9",
  cc_relctrl:"",cc_ftrcrtl:"",cc_sp:"",cc_losl:"",cc_losh:""
  },
  {
  fin_id:3,
  og_relctrl:"",og_ftrcrtl:"",og_sp:"",og_losl:"7.12",og_losh:"8.36",
  alc_relctrl:"Yes",alc_ftrcrtl:"Yes",alc_sp:"3.23",alc_losl:"3.2",alc_losh:"3.45",
  cal_relctrl:"Yes",cal_ftrcrtl:"",cal_sp:"",cal_losl:"85",cal_losh:"100",
  crb_relctrl:"Yes",crb_ftrcrtl:"",crb_sp:"",crb_losl:"1.6",crb_losh:"3.8",
  rdf_relctrl:"",rdf_ftrcrtl:"",rdf_sp:"",rdf_losl:"83.1",rdf_losh:"86",
  co2_relctrl:"Yes",co2_ftrcrtl:"",co2_sp:"",co2_losl:"2.55",co2_losh:"2.90",
  cc_relctrl:"",cc_ftrcrtl:"",cc_sp:"",cc_losl:"",cc_losh:""
  },
  {
  fin_id:4,
  og_relctrl:"",og_ftrcrtl:"",og_sp:"",og_losl:"9.84",og_losh:"10.84",
  alc_relctrl:"Yes",alc_ftrcrtl:"Yes",alc_sp:"3.23",alc_losl:"3.2",alc_losh:"3.45",
  cal_relctrl:"Yes",cal_ftrcrtl:"",cal_sp:"",cal_losl:"1.6",cal_losh:"14.4",
  crb_relctrl:"Yes",crb_ftrcrtl:"",crb_sp:"",crb_losl:"",crb_losh:"",
  rdf_relctrl:"",rdf_ftrcrtl:"",rdf_sp:"",rdf_losl:"",rdf_losh:"",
  co2_relctrl:"Yes",co2_ftrcrtl:"Yes",co2_sp:"",co2_losl:"",co2_losh:"",
  cc_relctrl:"",cc_ftrcrtl:"",cc_sp:"",cc_losl:"",cc_losh:""
  },
  {
  fin_id:5,
  og_relctrl:"",og_ftrcrtl: "",og_sp: "",og_losl: "10.4",og_losh: "11",
  alc_relctrl:"Yes",alc_ftrcrtl:"Yes",alc_sp:"4.68",alc_losl:"4.52",alc_losh:"",
  cal_relctrl:"",cal_ftrcrtl:"",cal_sp:"",cal_losl:"125",cal_losh:"140",
  crb_relctrl:"",crb_ftrcrtl:"",crb_sp:"",crb_losl:"2.5",crb_losh:"5",
  rdf_relctrl:"",rdf_ftrcrtl:"",rdf_sp:"",rdf_losl:"84",rdf_losh:"88",
  co2_relctrl:"Yes",co2_ftrcrtl:"Yes",co2_sp:"",co2_losl:"2.55",co2_losh:"2.90",
  cc_relctrl:"",cc_ftrcrtl:"",cc_sp:"",cc_losl:"",cc_losh:""
  },
  {
  fin_id: 6,
  og_relctrl:"",og_ftrcrtl:"",og_sp:"",og_losl:"10.5",og_losh:"11.5",
  alc_relctrl:"Yes",alc_ftrcrtl:"Yes",alc_sp:"4.75",alc_losl:"4.60",alc_losh:"4.90",
  cal_relctrl:"Yes",cal_ftrcrtl:"",cal_sp:"",cal_losl:"127",cal_losh:"144",
  crb_relctrl:"Yes",crb_ftrcrtl:"",crb_sp:"",crb_losl:"3.5",crb_losh:"6.1",
  rdf_relctrl:"",rdf_ftrcrtl:"",rdf_sp:"",rdf_losl:"93.6",rdf_losh:"91",
  co2_relctrl:"Yes",co2_ftrcrtl:"Yes",co2_sp:"",co2_losl:"2.55",co2_losh:"2.90",
  cc_relctrl:"",cc_ftrcrtl:"",cc_sp:"",cc_losl:"",cc_losh:""
  },
  {
  fin_id: 7,
  og_relctrl:"",og_ftrcrtl:"",og_sp:"",og_losl:"15.26",og_losh:"20",
  alc_relctrl:"Yes",alc_ftrcrtl:"",alc_sp:"6.4",alc_losl:"6.25",alc_losh:"6.55",
  cal_relctrl:"",cal_ftrcrtl:"",cal_sp:"",cal_losl:"218",cal_losh:"268",
  crb_relctrl:"",crb_ftrcrtl:"",crb_sp:"",crb_losl:"9.6",crb_losh:"19.6",
  rdf_relctrl:"",rdf_ftrcrtl:"",rdf_sp:"",rdf_losl:"66.5",rdf_losh:"70.5",
  co2_relctrl:"Yes",co2_ftrcrtl:"",co2_sp:"2.4",co2_losl:"2.2",co2_losh:"2.6",
  cc_relctrl:"",cc_ftrcrtl:"",cc_sp:"",cc_losl:"",cc_losh:""
  },
  {
  fin_id: 8,
  og_relctrl:"",og_ftrcrtl:"",og_sp:"",og_losl:"",og_losh:"",
  alc_relctrl:"Yes",alc_ftrcrtl:"",alc_sp:"5.45",alc_losl:"5.35",alc_losh:"5.6",
  cal_relctrl:"",cal_ftrcrtl:"",cal_sp:"",cal_losl:"203",cal_losh:"213",
  crb_relctrl:"",crb_ftrcrtl:"",crb_sp:"",crb_losl:"19",crb_losh:"23.3",
  rdf_relctrl:"",rdf_ftrcrtl:"",rdf_sp:"",rdf_losl:"66",rdf_losh:"68",
  co2_relctrl:"Yes",co2_ftrcrtl:"Yes",co2_sp:"2.70",co2_losl:"2.55",co2_losh:"2.9",
  cc_relctrl:"",cc_ftrcrtl:"",cc_sp:"",cc_losl:"",cc_losh:""
  }
  ]
   
  const sch_smpl = [
  {brw_id: 1,alc:"No",cc:"No",taste:"No",note:""},
  {brw_id: 2,alc:"No",cc:"No",taste:"No",note:""},
  {brw_id: 3,alc:"No",cc:"No",taste:"No",note:""},
  {brw_id: 4,alc:"No",cc:"No",taste:"No",note:""},
  {brw_id: 5,alc:"Yes",cc:"No",taste:"No",note:""},
  {brw_id: 6,alc:"Yes",cc:"No",taste:"No",note:""}
  ]
   
  const sch_params = [
  {brw_id: 1,cc:"0",acp:"6",note:""},
  {brw_id: 2,cc:"0",acp:"11",note:""},
  {brw_id: 3,cc:"0",acp:"6",note:""},
  {brw_id: 4,cc:"0",acp:"6",note:""},
  {brw_id: 5,cc:"0",acp:"NA",note:""},
  {brw_id: 6,cc:"0",acp:"17",note:""}
  ]
   
  const chp_smpl = [
  {brw_id: 1,alc:"Yes",gc:"Yes",taste:"Yes",note:""},
  {brw_id: 2,alc:"Yes",gc:"Yes",taste:"Yes",note:""},
  {brw_id: 3,alc:"Yes",gc:"Yes",taste:"Yes",note:""},
  {brw_id: 4,alc:"Yes",gc:"Yes",taste:"Yes",note:""},
  {brw_id: 5,alc:"Yes",gc:"Yes",taste:"Yes",note:""},
  {brw_id: 6,alc:"Yes",gc:"Yes",taste:"Yes",note:""}
  ]
   
  const chp_params = [
  {brw_id: 1,param_d:"< 10",param_p:"",param_aa:"< 6",param_abw:"3.45",param_rdf:"75.94",note:""},
  {brw_id: 2,param_d:"< 10",param_p:"",param_aa:"< 6",param_abw:"3.95",param_rdf:"68.75",note:""},
  {brw_id: 3,param_d:"< 10",param_p:"",param_aa:"< 10",param_abw:"4.70",param_rdf:"87",note:""},
  {brw_id: 4,param_d:"< 15",param_p:"< CT4-UT10",param_aa:"< 10",param_abw:"4.85",param_rdf:"89",note:""},
  {brw_id: 5,param_d:"< 30",param_p:"",param_aa:"< 3.5",param_abw:"6.50",param_rdf:"68.5",note:""},
  {brw_id: 6,param_d:"< 30",param_p:"",param_aa:"< 10",param_abw:"5.60",param_rdf:"68.50",note:""}
  ]
   
  const rel_post = [
  {fin_id:1,pck_id:1,tk_fbt:"Ok To Fill",lines:"In WIC",tk_lin:"Matrix Blend",tk_dft:"Matrix Blend",recover:"",note:""},
  {fin_id:1,pck_id:1,tk_fbt:"Ok To Fill",lines:"In WIC",tk_lin:"Matrix Blend",tk_dft:"Matrix Blend",recover:"",note:""},
  {fin_id:1,pck_id:1,tk_fbt:"Ok To Fill",lines:"In WIC",tk_lin:"Matrix Blend",tk_dft:"Matrix Blend",recover:"",note:""},
  {fin_id:1,pck_id:1,tk_fbt:"CIP",lines:"CIP",tk_lin:"CIP",tk_dft:"CIP",recover:"Condensate",note:""},
  {fin_id:1,pck_id:1,tk_fbt:"Ok To Fill",lines:"In WIC",tk_lin:"Matrix Blend",tk_dft:"Matrix Blend",recover:"GBeer",note:""},
  {fin_id:1,pck_id:1,tk_fbt:"Ok To Fill",lines:"In WIC",tk_lin:"Matrix Blend",tk_dft:"Matrix Blend",recover:"GBeer",note:""},
  {fin_id:1,pck_id:1,tk_fbt:"Rinse",lines:"Rinse",tk_lin:"Rinse",tk_dft:"Rinse",recover:"Condensate",note:""},
  {fin_id:1,pck_id:1,tk_fbt:"Rinse",lines:"Rinse",tk_lin:"Rinse",tk_dft:"Rinse",recover:"Condensate",note:""}
  ]
   
  const rel_pre = [
  {fin_id:1,pck_id:1,tk_fbt:"Releasable",lines:"In WIC",tk_lin:"Matrix Blend",tk_dft:"Matrix Blend",recover:"GBeer",ctrl:"Analyzer",note:""},
  {fin_id:2,pck_id:2,tk_fbt:"Releasable",lines:"In WIC",tk_lin:"Matrix Blend",tk_dft:"Matrix Blend",recover:"GBeer",ctrl:"Analyzer",note:""},
  {fin_id:3,pck_id:3,tk_fbt:"Releasable",lines:"In WIC",tk_lin:"Matrix Blend",tk_dft:"Matrix Blend",recover:"GBeer",ctrl:"Analyzer",note:""},
  {fin_id:4,pck_id:4,tk_fbt:"Releasable",lines:"In WIC",tk_lin:"In WIC",tk_dft:"In WIC",recover:"Condensate",ctrl:"Analyzer",note:""},
  {fin_id:5,pck_id:5,tk_fbt:"Releasable",lines:"In WIC",tk_lin:"Matrix Blend",tk_dft:"Matrix Blend",recover:"GBeer",ctrl:"Analyzer",note:""},
  {fin_id:6,pck_id:6,tk_fbt:"Releasable",lines:"In WIC",tk_lin:"In WIC",tk_dft:"In WIC",recover:"Condensate",ctrl:"Analyzer",note:""},
  {fin_id:7,pck_id:7,tk_fbt:"Releasable",lines:"In WIC",tk_lin:"In WIC",tk_dft:"In WIC",recover:"Condensate",ctrl:"Alcolyzer",note:""},
  {fin_id:8,pck_id:8,tk_fbt:"Releasable",lines:"In WIC",tk_lin:"In WIC",tk_dft:"In WIC",recover:"Condensate",ctrl:"Alcolyzer",note:""}
  ]
   
  const fltr_post = [
  {fin_id: 1,brw_id:1,tk_sch:"Ok To Fill",lines:"Matrix Blend",tk_trp:"NA",tk_fbt:"Lab Data",recover:"GBeer",note:""},
  {fin_id: 2,brw_id:2,tk_sch:"Ok To Fill",lines:"Matrix Blend",tk_trp:"NA",tk_fbt:"Lab Data",recover:"GBeer",note:""},
  {fin_id: 3,brw_id:3,tk_sch:"Ok To Fill",lines:"Matrix Blend",tk_trp:"NA",tk_fbt:"Lab Data",recover:"GBeer",note:""},
  {fin_id: 4,brw_id:3,tk_sch:"Ok To Fill",lines:"Matrix Blend",tk_trp:"NA",tk_fbt:"Lab Data",recover:"GBeer",note:""},
  {fin_id: 5,brw_id:3,tk_sch:"Ok To Fill",lines:"CIP",tk_trp:"NA",tk_fbt:"Lab Data",recover:"GBeer",note:""},
  {fin_id: 6,brw_id:4,tk_sch:"Ok To Fill",lines:"Matrix Blend",tk_trp:"NA",tk_fbt:"Lab Data",recover:"Condensate",note:""},
  {fin_id: 7,brw_id:5,tk_sch:"Rinse",lines:"Rinse",tk_trp:"NA",tk_fbt:"Lab Data",recover:"Condensate",note:""},
  {fin_id: 8,brw_id:6,tk_sch:"Rinse",lines:"Rinse",tk_trp:"NA",tk_fbt:"Lab Data",recover:"Condensate",note:""},
  ]
   
  const fltr_pre = [
  {fin_id:1,brw_id:1,tk_sch:"Releasable",lines:"Matrix Blend",tk_trp:"Use",tk_fbt:"Matrix Blend",tk_fill:"On COE",inj:"NA",ctrl:"Analyzer",note:""},
  {fin_id:2,brw_id:2,tk_sch:"Releasable",lines:"Matrix Blend",tk_trp:"Use",tk_fbt:"Matrix Blend",tk_fill:"On COE",inj:"NA",ctrl:"Analyzer",note:""},
  {fin_id:3,brw_id:3,tk_sch:"Releasable",lines:"Matrix Blend",tk_trp:"Use",tk_fbt:"Matrix Blend",tk_fill:"On COE",inj:"NA",ctrl:"Analyzer",note:""},
  {fin_id:4,brw_id:3,tk_sch:"Releasable",lines:"Matrix Blend",tk_trp:"Use",tk_fbt:"Matrix Blend",tk_fill:"On COE",inj:"NA",ctrl:"Analyzer",note:""},
  {fin_id:5,brw_id:3,tk_sch:"Releasable",lines:"Matrix Blend",tk_trp:"Use",tk_fbt:"Matrix Blend",tk_fill:"On COx",inj:"Skid 1",ctrl:"Analyzer",note:""},
  {fin_id:6,brw_id:4,tk_sch:"Releasable",lines:"Blow Out",tk_trp:"Use",tk_fbt:"Rinsed",tk_fill:"On COE",inj:"Pre",ctrl:"Analyzer",note:""},
  {fin_id:7,brw_id:5,tk_sch:"Releasable",lines:"Rinsed",tk_trp:"NA",tk_fbt:"Rinsed",tk_fill:"On COE",inj:"NA",ctrl:"Ratio",note:""},
  {fin_id:8,brw_id:6,tk_sch:"Releasable",lines:"Rinsed",tk_trp:"Bypass",tk_fbt:"Rinsed",tk_fill:"On COE",inj:"NA",ctrl:"Ratio",note:""}
  ]
   
  const csx_post = [
  {brw_id:1,tk_chp:"SCIP",tk_uni:"NA",lines:"Matrix Blend",seps:"NA",tk_sch:"Releasable",note:""},
  {brw_id:2,tk_chp:"SCIP",tk_uni:"NA",lines:"Matrix Blend",seps:"NA",tk_sch:"Releasable",note:""},
  {brw_id:3,tk_chp:"CIP",tk_uni:"NA",lines:"Matrix Blend",seps:"v",tk_sch:"Releasable",note:""},
  {brw_id:4,tk_chp:"CIP",tk_uni:"NA",lines:"WIC Out",seps:"NA",tk_sch:"Releasable",note:""},
  {brw_id:5,tk_chp:"NA",tk_uni:"CIP",lines:"Rinse X2",seps:"CIP",tk_sch:"Lab Data",note:""},
  {brw_id:6,tk_chp:"NA",tk_uni:"CIP",lines:"Rinse X2",seps:"CIP",tk_sch:"Lab Data",note:""},
  ]
   
  const csx_pre = [
  {brw_id:1,tk_chp:"Releasable",tk_uni:"NA",lines:"Matrix Blend",cooler:"Use",seps:"Use",acp:"Yes",tk_sch:"Empty",tk_fill:"On COE",note:""},
  {brw_id:2,tk_chp:"Releasable",tk_uni:"NA",lines:"Matrix Blend",cooler:"Use",seps:"Use",acp:"Yes",tk_sch:"Empty",tk_fill:"On COE",note:""},
  {brw_id:3,tk_chp:"Releasable",tk_uni:"NA",lines:"Matrix Blend",cooler:"Use",seps:"Use",acp:"Yes",tk_sch:"Empty",tk_fill:"On COE",note:""},
  {brw_id:4,tk_chp:"Releasable",tk_uni:"NA",lines:"Rinse",cooler:"Use",seps:"Use",acp:"Yes",tk_sch:"Rinsed",tk_fill:"On COE",note:""},
  {brw_id:5,tk_chp:"NA",tk_uni:"Releasable",lines:"In WIC",cooler:"NA",seps:"CIP At Half",acp:"No",tk_sch:"Rinsed",tk_fill:"On COE",note:""},
  {brw_id:6,tk_chp:"NA",tk_uni:"Releasable",lines:"In WIC",cooler:"NA",seps:"CIP At Half",acp:"Yes",tk_sch:"Rinsed",tk_fill:"On COE",note:""}
  ]
   
  const acx_post = [
  {brw_id:1,tk_vf:"CIP",lines:"Rinse",tk_chp:"Aging",tk_uni:"NA",note:""},
  {brw_id:2,tk_vf:"CIP",lines:"Rinse",tk_chp:"Aging",tk_uni:"NA",note:""},
  {brw_id:3,tk_vf:"CIP",lines:"Rinse",tk_chp:"Aging",tk_uni:"NA",note:""},
  {brw_id:4,tk_vf:"CIP",lines:"Rinse",tk_chp:"Aging",tk_uni:"NA",note:""},
  {brw_id:5,tk_vf:"CIP",lines:"Sterilize",tk_chp:"NA",tk_uni:"Fermenting",note:""},
  {brw_id:6,tk_vf:"CIP",lines:"Sterilize",tk_chp:"NA",tk_uni:"Fermenting",note:""}
  ]
   
  const acx_pre = [
  {brw_id: 1,tk_vf:"Releasable",lines:"Rinse",tk_chp:"Stuffed",tk_fill:"To Cellar",note: ""},
  {brw_id: 2,tk_vf:"Releasable",lines:"Rinse",tk_chp:"Stuffed",tk_fill:"To Cellar",note: ""},
  {brw_id: 3,tk_vf:"Releasable",lines:"Rinse",tk_chp:"Gassed 1 HR",tk_fill:"To Cellar",note: ""},
  {brw_id: 4,tk_vf:"Releasable",lines:"Rinse",tk_chp:"Gassed 6 HR",tk_fill:"On Reg",note: ""},
  {brw_id: 5,tk_vf:"NA",lines:"Rinse",tk_chp:"NA",tk_fill:"To Cellar",note: ""},
  {brw_id: 6,tk_vf:"NA",lines:"Rinse",tk_chp:"NA",tk_fill:"To Cellar",note: ""}
  ]
  
  
  methods_cold =[
  {method: "Yes",object: "yn"},
  {method: "No",object: "yn"},
  {method: "NA",object: "yn"},
  {method: "See Note",object: "yn"},
    
    
  {method: "Releasable",object: "tk_from"},
  {method: "See Note",object: "tk_from"},
    
  {method: "Matrix Blend",object: "tk_to"},
  {method: "Empty",object: "tk_to"},
  {method: "Rinsed",object: "tk_to"},  
  {method: "Blow Out",object: "tk_to"},
  {method: "CIP'd",object: "tk_to"},
  {method: "Stuffed",object: "tk_to"},
  {method: "Closed",object: "tk_to"},
  {method: "Gassed Pure",object: "tk_to"},
  {method: "Gassed 1 HR",object: "tk_to"},
  {method: "Gassed 6 HR",object: "tk_to"},
    
  {method: "On COE",object:"tk_fill" },
  {method: "On Reg",object: "tk_fill"},
  {method: "To Cellar",object: "tk_fill"},
  {method: "On COX",object: "tk_fill"},
    
  {method: "CIP",object: "tk_empty"},
  {method: "Rinse",object: "tk_empty"},
  {method: "Ok To Fill",object: "tk_empty"},
  {method: "Blow Out",object: "tk_empty"},
  {method: "SCIP",object: "tk_empty"},
  {method: "OCIP",object: "tk_empty"},
  
  {method: "Aging",object: "tk_full"},
  {method: "Lab Data",object: "tk_full"},
  {method: "Releasable",object: "tk_full"},
  {method: "Fermenting",object: "tk_full"},
    
      
  {method: "See Note",object: "ln_pre"},
  {method: "Matrix Blend",object: "ln_pre"},
  {method: "Blow Out",object: "ln_pre"},
  {method: "Rinse",object: "ln_pre"},
  {method: "Rinse X2",object: "ln_pre"},
  {method: "Lime Rinse",object: "ln_pre"},
  {method: "Wheat Rinse",object: "ln_pre"},
  {method: "CIP",object: "ln_pre"}, 
  {method: "Sterilize",object: "ln_pre"},
  {method: "In WIC",object: "ln_pre"},
      
  {method: "See Note",object: "ln_post"},
  {method: "Matrix Blend",object: "ln_post"},
  {method: "Blow Out",object: "ln_post"},
  {method: "Rinse",object: "ln_post"},
  {method: "Rinse X2",object: "ln_post"},
  {method: "Lime Rinse",object: "ln_post"},
  {method: "Wheat Rinse",object: "ln_post"},
  {method: "CIP",object: "ln_post"}, 
  {method: "Sterilize",object: "ln_post"},
  {method: "WIC Out",object: "ln_pre"},
    
  
  {method: "Drain",object: "recover"},
  {method: "Condensate",object: "recover"},
  {method: "GBeer",object: "recover"},
    
  {method: "Analyzer",object: "ctrl"},
  {method: "Ratio",object: "ctrl"},
  {method: "Alcolyzer",object: "ctrl"},
  
  {method: "Skid 1",object: "injection"},
  {method: "Skid 2",object: "injection"},
  {method: "Pre",object: "injection"},
    
  {method: "Releasable",object: "state"},
  {method: "Ok To Fill",object: "state"},
    
  {method: "CIP",object: "seps"},
  {method: "Flush",object: "seps"},
  {method: "CIP At Half",object: "seps"},
  {method: "Use",object: "seps"},
  {method: "NA",object: "seps"},
    
  {method: "Use",object: "cooler"},
  {method: "Bypass",object: "cooler"},
    
  {method: "Use",object: "trap"},
  {method: "Sterilize",object: "trap"},
  {method: "Bypass",object: "trap"},
  {method: "NA",object: "trap"},
  ]
   
  module.exports = {
  brnd_brw,
  brnd_fin,
  brnd_pck,
  fin_smpl,
  fin_params,
  sch_smpl,
  sch_params,
  chp_smpl,
  chp_params,
  rel_post,
  rel_pre,
  fltr_post,
  fltr_pre,
  csx_post,
  csx_pre,
  acx_post,
  acx_pre,
  methods_cold
  }