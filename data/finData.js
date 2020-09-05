const brnd_brw = [
  {id: 1, brand: 'BH40' ,hop_std: 'Yes' ,hop_crft: 'No' ,hop_dry: 'No', supr_sac: 'No' ,note: ''},
  {id: 2, brand: 'BH50' ,hop_std: 'Yes' ,hop_crft: 'No' ,hop_dry: 'No', supr_sac: 'No' ,note: ''},
  {id: 3, brand: 'NL50' ,hop_std: 'Yes' ,hop_crft: 'No' ,hop_dry: 'No', supr_sac: 'No' ,note: ''},
  {id: 4, brand: 'PT90' ,hop_std: 'Yes' ,hop_crft: 'No' ,hop_dry: 'No', supr_sac: 'No' ,note: ''},
  {id: 5, brand: 'EL20' ,hop_std: 'Yes' ,hop_crft: 'Yes' ,hop_dry: 'No', supr_sac: 'Yes' ,note: ''},
  {id: 6, brand: 'GI19' ,hop_std: 'Yes' ,hop_crft: 'Yes' ,hop_dry: 'Yes', supr_sac: 'Yes' ,note: ''}
 ]
 
 const brnd_fin = [
   {id:1 ,brand: 'HBBL' ,brw_id: 1 ,note: ''},
   {id:2 ,brand: 'HBUD' ,brw_id: 2 ,note: ''},
   {id:3 ,brand: 'HBNL' ,brw_id: 3 ,note: ''},
   {id:4 ,brand: 'HBNS' ,brw_id: 3 ,note: ''},
   {id:5 ,brand: 'EBIN' ,brw_id: 3 ,note: ''},
   {id:6 ,brand: 'PTHD' ,brw_id: 4 ,note: ''},
   {id:7 ,brand: 'ELSP' ,brw_id: 5 ,note: ''},
   {id:8 ,brand: '9GNC' ,brw_id: 6 ,note: ''},
 ]
 
 const brnd_pck = [
   {id:1 ,brand: 'BDL5' ,fin_id: 1 ,note: ''},
   {id:2 ,brand: 'BUD5' ,fin_id: 2 ,note: ''},
   {id:3 ,brand: 'ABN5' ,fin_id: 3 ,note: ''},
   {id:4 ,brand: 'NLS5' ,fin_id: 4 ,note: ''},
   {id:5 ,brand: 'NTI6' ,fin_id: 5 ,note: ''},
   {id:6 ,brand: 'BLP6' ,brw_id: 6 ,note: ''},
   {id:7 ,brand: 'ES18' ,brw_id: 7 ,note: ''},
   {id:8 ,brand: 'GNX7' ,brw_id: 8 ,note: ''},
 ]
 
 const smpl_fin = [
   {id: 1,fin_id: 1,alc: 'No' ,iron: 'No' ,co2o2: 'No' ,cc: 'No' ,taste: 'Yes' , note: ''},
   {id: 2,fin_id: 2,alc: 'No' ,iron: 'No' ,co2o2: 'No' ,cc: 'No' ,taste: 'Yes' , note: ''},
   {id: 3,fin_id: 3,alc: 'Yes' ,iron: 'No' ,co2o2: 'No' ,cc: 'No' ,taste: 'Yes' , note: ''},
   {id: 4,fin_id: 4,alc: 'Yes' ,iron: 'No' ,co2o2: 'No' ,cc: 'No' ,taste: 'Yes' , note: ''},
   {id: 5,fin_id: 5,alc: 'Yes' ,iron: 'No' ,co2o2: 'No' ,cc: 'No' ,taste: 'Yes' , note: ''},
   {id: 6,fin_id: 6,alc: 'Yes' ,iron: 'No' ,co2o2: 'No' ,cc: 'No' ,taste: 'Yes' , note: ''},
   {id: 7,fin_id: 7,alc: 'Yes' ,iron: 'No' ,co2o2: 'No' ,cc: 'No' ,taste: 'Yes' , note: ''},
   {id: 8,fin_id: 8,alc: 'Yes' ,iron: 'No' ,co2o2: 'Yes' ,cc: 'No' ,taste: 'Yes' , note: ''},
 ]
 
 const params_fin = [
   {
     id: 1,fin_id: 1,
     og_relctrl: '',og_ftrcrtl: '',og_sp: '',og_losl: '8.15',og_losh: '9.39', 
     alc_relctrl: 'Yes',alc_ftrcrtl: 'Yes',alc_sp: '3.30',alc_losl: '3.20',alc_losh: '3.45',
     cal_relctrl: 'Yes',cal_ftrcrtl: '',cal_sp: '',cal_losl: '100',cal_losh: '115',
     crb_relctrl: 'Yes',crb_ftrcrtl: '',crb_sp: '',crb_losl: '5.08',crb_losh: '7.90',
     rdf_relctrl: '',rdf_ftrcrtl: '',rdf_sp: '',rdf_losl: '72',rdf_losh: '82',
     co2_relctrl: 'Yes',co2_ftrcrtl: 'Yes',co2_sp: '2.70',co2_losl: '2.55',co2_losh: '2.90',
     cc_relctrl: '',cc_ftrcrtl: '',cc_sp: '',cc_losl: '',cc_losh: ''
   },
   {
     id: 2,fin_id: 2,
     og_relctrl: 'Yes',og_ftrcrtl: 'Yes',og_sp: '11',og_losl: '10.8',og_losh: '11.2', 
     alc_relctrl: 'Yes',alc_ftrcrtl: '',alc_sp: '',alc_losl: '3.7',alc_losh: '4',
     cal_relctrl: 'Yes',cal_ftrcrtl: '',cal_sp: '',cal_losl: '135',cal_losh: '150',
     crb_relctrl: 'Yes',crb_ftrcrtl: '',crb_sp: '',crb_losl: '9.1',crb_losh: '12.7',
     rdf_relctrl: '',rdf_ftrcrtl: '',rdf_sp: '',rdf_losl: '66.5',rdf_losh: '71.9',
     co2_relctrl: 'Yes',co2_ftrcrtl: 'Yes',co2_sp: '2.7',co2_losl: '2.55',co2_losh: '2.9',
     cc_relctrl: '',cc_ftrcrtl: '',cc_sp: '',cc_losl: '',cc_losh: ''
   },
   {
     id: 3,fin_id: 3,
     og_relctrl: '',og_ftrcrtl: '',og_sp: '',og_losl: '7.12',og_losh: '8.36', 
     alc_relctrl: 'Yes',alc_ftrcrtl: 'Yes',alc_sp: '3.23',alc_losl: '3.2',alc_losh: '3.45',
     cal_relctrl: 'Yes',cal_ftrcrtl: '',cal_sp: '',cal_losl: '85',cal_losh: '100',
     crb_relctrl: 'Yes',crb_ftrcrtl: '',crb_sp: '',crb_losl: '1.6',crb_losh: '3.8',
     rdf_relctrl: '',rdf_ftrcrtl: '',rdf_sp: '',rdf_losl: '83.1',rdf_losh: '86',
     co2_relctrl: 'Yes',co2_ftrcrtl: '',co2_sp: '',co2_losl: '2.55',co2_losh: '2.90',
     cc_relctrl: '',cc_ftrcrtl: '',cc_sp: '',cc_losl: '',cc_losh: ''
   },
   {
     id: 4,fin_id: 4,
     og_relctrl: '',og_ftrcrtl: '',og_sp: '',og_losl: '9.84',og_losh: '10.84', 
     alc_relctrl: 'Yes',alc_ftrcrtl: 'Yes',alc_sp: '3.23',alc_losl: '3.2',alc_losh: '3.45',
     cal_relctrl: 'Yes',cal_ftrcrtl: '',cal_sp: '',cal_losl: '1.6',cal_losh: '14.4',
     crb_relctrl: 'Yes',crb_ftrcrtl: '',crb_sp: '',crb_losl: '',crb_losh: '',
     rdf_relctrl: '',rdf_ftrcrtl: '',rdf_sp: '',rdf_losl: '',rdf_losh: '',
     co2_relctrl: 'Yes',co2_ftrcrtl: 'Yes',co2_sp: '',co2_losl: '',co2_losh: '',
     cc_relctrl: '',cc_ftrcrtl: '',cc_sp: '',cc_losl: '',cc_losh: ''
   },
   {
     id: 5,fin_id: 5,
     og_relctrl: '',og_ftrcrtl: '',og_sp: '',og_losl: '10.4',og_losh: '11', 
     alc_relctrl: 'Yes',alc_ftrcrtl: 'Yes',alc_sp: '4.68',alc_losl: '4.52',alc_losh: '',
     cal_relctrl: '',cal_ftrcrtl: '',cal_sp: '',cal_losl: '125',cal_losh: '140',
     crb_relctrl: '',crb_ftrcrtl: '',crb_sp: '',crb_losl: '2.5',crb_losh: '5',
     rdf_relctrl: '',rdf_ftrcrtl: '',rdf_sp: '',rdf_losl: '84',rdf_losh: '88',
     co2_relctrl: 'Yes',co2_ftrcrtl: 'Yes',co2_sp: '',co2_losl: '2.55',co2_losh: '2.90',
     cc_relctrl: '',cc_ftrcrtl: '',cc_sp: '',cc_losl: '',cc_losh: ''
   },
   {
     id: 6,fin_id: 6,
     og_relctrl: '',og_ftrcrtl: '',og_sp: '',og_losl: '10.5',og_losh: '11.5', 
     alc_relctrl: 'Yes',alc_ftrcrtl: 'Yes',alc_sp: '4.75',alc_losl: '4.60',alc_losh: '4.90',
     cal_relctrl: 'Yes',cal_ftrcrtl: '',cal_sp: '',cal_losl: '127',cal_losh: '144',
     crb_relctrl: 'Yes',crb_ftrcrtl: '',crb_sp: '',crb_losl: '3.5',crb_losh: '6.1',
     rdf_relctrl: '',rdf_ftrcrtl: '',rdf_sp: '',rdf_losl: '93.6',rdf_losh: '91',
     co2_relctrl: 'Yes',co2_ftrcrtl: 'Yes',co2_sp: '',co2_losl: '2.55',co2_losh: '2.90',
     cc_relctrl: '',cc_ftrcrtl: '',cc_sp: '',cc_losl: '',cc_losh: ''
   },
   {
     id: 7,fin_id: 7,
     og_relctrl: '',og_ftrcrtl: '',og_sp: '',og_losl: '15.26',og_losh: '20', 
     alc_relctrl: 'Yes',alc_ftrcrtl: '',alc_sp: '6.4',alc_losl: '6.25',alc_losh: '6.55',
     cal_relctrl: '',cal_ftrcrtl: '',cal_sp: '',cal_losl: '218',cal_losh: '268',
     crb_relctrl: '',crb_ftrcrtl: '',crb_sp: '',crb_losl: '9.6',crb_losh: '19.6',
     rdf_relctrl: '',rdf_ftrcrtl: '',rdf_sp: '',rdf_losl: '66.5',rdf_losh: '70.5',
     co2_relctrl: 'Yes',co2_ftrcrtl: '',co2_sp: '2.4',co2_losl: '2.2',co2_losh: '2.6',
     cc_relctrl: '',cc_ftrcrtl: '',cc_sp: '',cc_losl: '',cc_losh: ''
   },
   {
     id: 8,fin_id: 8,
     og_relctrl: '',og_ftrcrtl: '',og_sp: '',og_losl: '',og_losh: '', 
     alc_relctrl: 'Yes',alc_ftrcrtl: '',alc_sp: '5.45',alc_losl: '5.35',alc_losh: '5.6',
     cal_relctrl: '',cal_ftrcrtl: '',cal_sp: '',cal_losl: '203',cal_losh: '213',
     crb_relctrl: '',crb_ftrcrtl: '',crb_sp: '',crb_losl: '19',crb_losh: '23.3',
     rdf_relctrl: '',rdf_ftrcrtl: '',rdf_sp: '',rdf_losl: '66',rdf_losh: '68',
     co2_relctrl: 'Yes',co2_ftrcrtl: 'Yes',co2_sp: '2.70',co2_losl: '2.55',co2_losh: '2.9',
     cc_relctrl: '',cc_ftrcrtl: '',cc_sp: '',cc_losl: '',cc_losh: ''
   }
 ]
 
 const smpl_sch = [
   {id: 1,brw_id: 1,alc: '' ,cc: '' ,taste: '' ,note:''},
   {id: 2,brw_id: 2,alc: '' ,cc: '' ,taste: '' ,note:''},
   {id: 3,brw_id: 3,alc: '' ,cc: '' ,taste: '' ,note:''},
   {id: 4,brw_id: 4,alc: '' ,cc: '' ,taste: '' ,note:''},
   {id: 5,brw_id: 5,alc: 'Yes' ,cc: '' ,taste: '' ,note:''},
   {id: 6,brw_id: 6,alc: 'Yes' ,cc: '' ,taste: '' ,note:''}
 ]
 
 const params_sch = [
   {id: ,brw_id: 1,cc: '' , acp: '' ,note: ''},
   {id: ,brw_id: 2,cc: '' , acp: '' ,note: ''},
   {id: ,brw_id: 3,cc: '' , acp: '' ,note: ''},
   {id: ,brw_id: 4,cc: '' , acp: '' ,note: ''},
   {id: ,brw_id: 5,cc: '' , acp: '' ,note: ''},
   {id: ,brw_id: 6,cc: '' , acp: '' ,note: ''}
 ]
 
 const smpl_chp = [
   {id: ,brw_id: 1,alc: '' , gc: '' ,taste: '' ,note: ''},
   {id: ,brw_id: 2,alc: '' , gc: '' ,taste: '' ,note: ''},
   {id: ,brw_id: 3,alc: '' , gc: '' ,taste: '' ,note: ''},
   {id: ,brw_id: 4,alc: '' , gc: '' ,taste: '' ,note: ''},
   {id: ,brw_id: 5,alc: '' , gc: '' ,taste: '' ,note: ''},
   {id: ,brw_id: 6,alc: '' , gc: '' ,taste: '' ,note: ''}
 ]
 
 const params_chp = [
   {id: ,brw_id: 1,param_d: '' , param_p: '' ,param_aa: '' ,param_abw: '' ,param_rdf: '' ,note: ''},
   {id: ,brw_id: 1,param_d: '' , param_p: '' ,param_aa: '' ,param_abw: '' ,param_rdf: '' ,note: ''},
   {id: ,brw_id: 1,param_d: '' , param_p: '' ,param_aa: '' ,param_abw: '' ,param_rdf: '' ,note: ''},
   {id: ,brw_id: 1,param_d: '' , param_p: '' ,param_aa: '' ,param_abw: '' ,param_rdf: '' ,note: ''},
   {id: ,brw_id: 1,param_d: '' , param_p: '' ,param_aa: '' ,param_abw: '' ,param_rdf: '' ,note: ''},
   {id: ,brw_id: 1,param_d: '' , param_p: '' ,param_aa: '' ,param_abw: '' ,param_rdf: '' ,note: ''}
 ] 
 
 const post_rel = [
   {id: ,fin_id: ,ln_pkg: '' , ln_drft: '' ,fbrb: '' ,fbt: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , ln_drft: '' ,fbrb: '' ,fbt: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , ln_drft: '' ,fbrb: '' ,fbt: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , ln_drft: '' ,fbrb: '' ,fbt: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , ln_drft: '' ,fbrb: '' ,fbt: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , ln_drft: '' ,fbrb: '' ,fbt: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , ln_drft: '' ,fbrb: '' ,fbt: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , ln_drft: '' ,fbrb: '' ,fbt: '' ,note: ''}
 ]
 
 const pre_rel = [
   {id: ,fin_id: ,ln_pkg: '' , rb_pck: '' ,on_sys: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , rb_pck: '' ,on_sys: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , rb_pck: '' ,on_sys: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , rb_pck: '' ,on_sys: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , rb_pck: '' ,on_sys: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , rb_pck: '' ,on_sys: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , rb_pck: '' ,on_sys: '' ,note: ''},
   {id: ,fin_id: ,ln_pkg: '' , rb_pck: '' ,on_sys: '' ,note: ''}
 ]
 
 const post_fltr = [
   {id: ,fin_id: 1,recover: '' , filter: '' ,sbbt: '' ,fbbt: '' ,sbrb: '' ,fbsb: '' ,note: ''},
   {id: ,fin_id: 1,recover: '' , filter: '' ,sbbt: '' ,fbbt: '' ,sbrb: '' ,fbsb: '' ,note: ''},
   {id: ,fin_id: 1,recover: '' , filter: '' ,sbbt: '' ,fbbt: '' ,sbrb: '' ,fbsb: '' ,note: ''},
   {id: ,fin_id: 1,recover: '' , filter: '' ,sbbt: '' ,fbbt: '' ,sbrb: '' ,fbsb: '' ,note: ''},
   {id: ,fin_id: 1,recover: '' , filter: '' ,sbbt: '' ,fbbt: '' ,sbrb: '' ,fbsb: '' ,note: ''},
   {id: ,fin_id: 1,recover: '' , filter: '' ,sbbt: '' ,fbbt: '' ,sbrb: '' ,fbsb: '' ,note: ''},
   {id: ,fin_id: 1,recover: '' , filter: '' ,sbbt: '' ,fbbt: '' ,sbrb: '' ,fbsb: '' ,note: ''},
   {id: ,fin_id: 1,recover: '' , filter: '' ,sbbt: '' ,fbbt: '' ,sbrb: '' ,fbsb: '' ,note: ''}
 ]
 
 const pre_fltr = [
   {id: ,fin_id: 1,pre_inj: '' , post_inj: '' ,st_dcnt: '' ,brnd_chng: '' ,fltr: '' ,sbbt: '',fbbt: '' , trp_byps: '' ,fbt: '',sbrb: '' ,fbsb: '' ,fbt_reg: '' ,gbeer: '',ctrl: '' ,note: ''},
   {id: ,fin_id: 1,pre_inj: '' , post_inj: '' ,st_dcnt: '' ,brnd_chng: '' ,fltr: '' ,sbbt: '',fbbt: '' , trp_byps: '' ,fbt: '',sbrb: '' ,fbsb: '' ,fbt_reg: '' ,gbeer: '',ctrl: '' ,note: ''},
   {id: ,fin_id: 1,pre_inj: '' , post_inj: '' ,st_dcnt: '' ,brnd_chng: '' ,fltr: '' ,sbbt: '',fbbt: '' , trp_byps: '' ,fbt: '',sbrb: '' ,fbsb: '' ,fbt_reg: '' ,gbeer: '',ctrl: '' ,note: ''},
   {id: ,fin_id: 1,pre_inj: '' , post_inj: '' ,st_dcnt: '' ,brnd_chng: '' ,fltr: '' ,sbbt: '',fbbt: '' , trp_byps: '' ,fbt: '',sbrb: '' ,fbsb: '' ,fbt_reg: '' ,gbeer: '',ctrl: '' ,note: ''},
   {id: ,fin_id: 1,pre_inj: '' , post_inj: '' ,st_dcnt: '' ,brnd_chng: '' ,fltr: '' ,sbbt: '',fbbt: '' , trp_byps: '' ,fbt: '',sbrb: '' ,fbsb: '' ,fbt_reg: '' ,gbeer: '',ctrl: '' ,note: ''},
   {id: ,fin_id: 1,pre_inj: '' , post_inj: '' ,st_dcnt: '' ,brnd_chng: '' ,fltr: '' ,sbbt: '',fbbt: '' , trp_byps: '' ,fbt: '',sbrb: '' ,fbsb: '' ,fbt_reg: '' ,gbeer: '',ctrl: '' ,note: ''},
   {id: ,fin_id: 1,pre_inj: '' , post_inj: '' ,st_dcnt: '' ,brnd_chng: '' ,fltr: '' ,sbbt: '',fbbt: '' , trp_byps: '' ,fbt: '',sbrb: '' ,fbsb: '' ,fbt_reg: '' ,gbeer: '',ctrl: '' ,note: ''},
   {id: ,fin_id: 1,pre_inj: '' , post_inj: '' ,st_dcnt: '' ,brnd_chng: '' ,fltr: '' ,sbbt: '',fbbt: '' , trp_byps: '' ,fbt: '',sbrb: '' ,fbsb: '' ,fbt_reg: '' ,gbeer: '',ctrl: '' ,note: ''}
 ]
 
 const post_csx = [
   {id: ,brw_id: 1,seps: '' , train: '' ,sbsb: '' ,rest: '' ,empty: '' ,note: ''},
   {id: ,brw_id: 1,seps: '' , train: '' ,sbsb: '' ,rest: '' ,empty: '' ,note: ''},
   {id: ,brw_id: 1,seps: '' , train: '' ,sbsb: '' ,rest: '' ,empty: '' ,note: ''},
   {id: ,brw_id: 1,seps: '' , train: '' ,sbsb: '' ,rest: '' ,empty: '' ,note: ''},
   {id: ,brw_id: 1,seps: '' , train: '' ,sbsb: '' ,rest: '' ,empty: '' ,note: ''},
   {id: ,brw_id: 1,seps: '' , train: '' ,sbsb: '' ,rest: '' ,empty: '' ,note: ''}
 ]
 
 const pre_csx = [
   {id: ,brw_id: 1,dcnt: '' , lght_stbl: '' ,acp: '' ,cooler_byps: '' ,half_trans: '',st: '' ,st_reg: '' ,note: ''},
   {id: ,brw_id: 1,dcnt: '' , lght_stbl: '' ,acp: '' ,cooler_byps: '' ,half_trans: '',st: '' ,st_reg: '' ,note: ''},
   {id: ,brw_id: 1,dcnt: '' , lght_stbl: '' ,acp: '' ,cooler_byps: '' ,half_trans: '',st: '' ,st_reg: '' ,note: ''},
   {id: ,brw_id: 1,dcnt: '' , lght_stbl: '' ,acp: '' ,cooler_byps: '' ,half_trans: '',st: '' ,st_reg: '' ,note: ''},
   {id: ,brw_id: 1,dcnt: '' , lght_stbl: '' ,acp: '' ,cooler_byps: '' ,half_trans: '',st: '' ,st_reg: '' ,note: ''},
   {id: ,brw_id: 1,dcnt: '' , lght_stbl: '' ,acp: '' ,cooler_byps: '' ,half_trans: '',st: '' ,st_reg: '' ,note: ''}
 ]
 
 const post_acx = [
   {id: ,brw_id: 1,vessel: '' , lines: '',note: ''},
   {id: ,brw_id: 1,vessel: '' , lines: '',note: ''},
   {id: ,brw_id: 1,vessel: '' , lines: '',note: ''},
   {id: ,brw_id: 1,vessel: '' , lines: '',note: ''},
   {id: ,brw_id: 1,vessel: '' , lines: '',note: ''},
   {id: ,brw_id: 1,vessel: '' , lines: '',note: ''},
 ]
 
 const pre_acx = [
   {id: ,brw_id: 1,chp_tk: '' , uni_tk: '' ,lines: '' ,note: ''},
   {id: ,brw_id: 1,chp_tk: '' , uni_tk: '' ,lines: '' ,note: ''},
   {id: ,brw_id: 1,chp_tk: '' , uni_tk: '' ,lines: '' ,note: ''},
   {id: ,brw_id: 1,chp_tk: '' , uni_tk: '' ,lines: '' ,note: ''},
   {id: ,brw_id: 1,chp_tk: '' , uni_tk: '' ,lines: '' ,note: ''},
   {id: ,brw_id: 1,chp_tk: '' , uni_tk: '' ,lines: '' ,note: ''}
 ]
 
 module.exports = {
   brnd_brw,
   brnd_fin,
   brnd_pck,
   smpl_fin,
   params_fin,
   smpl_sch,
   params_sch,
   smpl_chp,
   params_chp,
   post_rel,
   pre_rel,
   post_fltr,
   pre_fltr,
   post_csx,
   pre_csx,
   post_acx,
   pre_acx
 }