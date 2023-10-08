import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'cs' })
export class Cs extends BaseEntity {
  @PrimaryColumn({ name: 'cs_gubun' })
  gubun: string;
  @PrimaryColumn({ name: 'cs_code' })
  code: string;
  @Column({ name: 'cs_myung' })
  myung: string;  
  @Column({ name: 'cs_daepyo' })
  daepyo: string;
  @Column({ name: 'cs_tel' })
  tel: string;
  @Column({ name: 'cs_fax' })
  fax: string;
  @Column({ name: 'cs_post' })
  post: string;
  @Column({ name: 'cs_dup' })
  dup: number;
  @Column({ name: 'cs_juso' })
  juso: string;
  @Column({ name: 'cs_bunji' })
  bunji: string;
  @Column({ name: 'cs_jisa' })
  jisa: string;
  @Column({ name: 'cs_emcode' })
  emcode: string;
  @Column({ name: 'cs_damdang' })
  damdang: string;
  @Column({ name: 'cs_damdanghp' })
  damdanghp: string;
  @Column({ name: 'cs_jongbl' })
  jongbl: string;
  @Column({ name: 'cs_upte' })
  upte: string;
  @Column({ name: 'cs_saupnum' })
  saupnum: string;
  @Column({ name: 'cs_sauppost' })
  sauppost: string;
  @Column({ name: 'cs_saupdup' })
  saupdup: number;
  @Column({ name: 'cs_saupjuso' })
  saupjuso: string;
  @Column({ name: 'cs_saupbunji' })
  saupbunji: string;
  @Column({ name: 'cs_email' })
  email: string;
  @Column({ name: 'cs_ediid' })
  ediid: string;
  @Column({ name: 'cs_edipassword' })
  edipassword: string;
  @Column({ name: 'cs_local' })
  local: string;
  @Column({ name: 'cs_nonchart' })
  nonchart: string;
  @Column({ name: 'cs_fymd' })
  fymd: string;
  @Column({ name: 'cs_lymd' })
  lymd: string;
  @Column({ name: 'cs_bigo' })
  bigo: string;
  @Column({ name: 'cs_user' })
  user: string;
  @Column({ name: 'cs_etc1' })
  etc1: string;
  @Column({ name: 'cs_etc2' })
  etc2: string;
  @Column({ name: 'cs_etc3' })
  etc3: string;
  @Column({ name: 'cs_Chonguser' })
  Chonguser: string;
  @Column({ name: 'cs_pro' })
  pro: string;
  @Column({ name: 'cs_yanghan' })
  yanghan: string;
  @Column({ name: 'cs_chunggu' })
  chunggu: string;
  @Column({ name: 'cs_cherbang' })
  cherbang: string;
  @Column({ name: 'cs_youngsu' })
  youngsu: string;
  @Column({ name: 'cs_pacs' })
  pacs: string;
  @Column({ name: 'cs_barcode' })
  barcode: string;
  @Column({ name: 'cs_yakguk' })
  yakguk: string;
  @Column({ name: 'cs_update' })
  update: string;
  @Column({ name: 'cs_askumak' })
  askumak: number;
  @Column({ name: 'cs_etc4' })
  etc4: string;
  @Column({ name: 'cs_etc5' })
  etc5: string;
  @Column({ name: 'cs_etc6' })
  etc6: string;
  @Column({ name: 'cs_etc7' })
  etc7: string;
  @Column({ name: 'cs_cms' })
  cms: string;
  @Column({ name: 'cs_daegidisp' })
  daegidisp: string;
  @Column({ name: 'cs_gumjinlink' })
  gumjinlink: string;
  @Column({ name: 'cs_capture' })
  capture: string;
  @Column({ name: 'cs_sutak' })
  sutak: string;
  @Column({ name: 'cs_sutaklink' })
  sutaklink: string;
  @Column({ name: 'cs_gumsalinkyn' })
  gumsalinkyn: string;
  @Column({ name: 'cs_gumsalink' })
  gumsalink: string;
  @Column({ name: 'cs_scaner' })
  scaner: string;
  @Column({ name: 'cs_card' })
  card: string;
  @Column({ name: 'cs_cardlink' })
  cardlink: string;
  @Column({ name: 'cs_eleccherbang' })
  eleccherban: string;
  @Column({ name: 'cs_yakgukprint' })
  yakgukprint: string;
  @Column({ name: 'cs_gumsabarcode' })
  gumsabarcod: string;
  @Column({ name: 'cs_bdbarcode' })
  bdbarcode: string;
  @Column({ name: 'cs_updatepath' })
  updatepath: string;
  @Column({ name: 'cs_server' })
  server: string;
  @Column({ name: 'cs_sanjae' })
  sanjae: string;
  @Column({ name: 'cs_paljji' })
  paljji: string;
  @Column({ name: 'cs_jungji' })
  jungji: string;
  @Column({ name: 'cs_servermodel' })
  servermodel: string;
  @Column({ name: 'cs_servername' })
  servername: string;
  @Column({ name: 'cs_serverSN' })
  serverSN: string;
  @Column({ name: 'cs_serverMT' })
  serverMT: string;
  @Column({ name: 'cs_serverHDD' })
  serverHDD: string;
  @Column({ name: 'cs_serverMemory' })
  serverMemor: string;
  @Column({ name: 'cs_serverLocation' })
  serverLocat: string;
  @Column({ name: 'cs_serversetup' })
  serversetup: string;
  @Column({ name: 'cs_window' })
  window: string;
  @Column({ name: 'cs_windowmemo' })
  windowmemo: string;
  @Column({ name: 'cs_virusname' })
  virusname: string;
  @Column({ name: 'cs_virussetup' })
  virussetup: string;
  @Column({ name: 'cs_virusend' })
  virusend: string;
  @Column({ name: 'cs_upsname' })
  upsname: string;
  @Column({ name: 'cs_upssetup' })
  upssetup: string;
  @Column({ name: 'cs_upsend' })
  upsend: string;
  @Column({ name: 'cs_rollprint' })
  rollprint: string;
  @Column({ name: 'cs_inuser' })
  inuser: string;
  @Column({ name: 'cs_upuser' })
  upuser: string;
  @Column({ name: 'cs_indate' })
  indate: string;
  @Column({ name: 'cs_update2' })
  update2: string;
  @Column({ name: 'cs_etc8' })
  etc8: string;
  @Column({ name: 'cs_etc9' })
  etc9: string;
  @Column({ name: 'cs_etc10' })
  etc10: string;
  @Column({ name: 'cs_etc11' })
  etc11: string;
  @Column({ name: 'cs_etc12' })
  etc12: string;
  @Column({ name: 'cs_etc13' })
  etc13: string;
  @Column({ name: 'cs_etc14' })
  etc14: string;
  @Column({ name: 'cs_etc15' })
  etc15: string;
  @Column({ name: 'cs_bogubun' })
  bogubun: string;
  @Column({ name: 'cs_aschk' })
  aschk: string;
  @Column({ name: 'cs_etc16' })
  etc16: string;
  @Column({ name: 'cs_etc17' })
  etc17: string;
  @Column({ name: 'cs_etc18' })
  etc18: string;
  @Column({ name: 'cs_etc19' })
  etc19: string;
  @Column({ name: 'cs_etc20' })
  etc20: string;
  @Column({ name: 'cs_etc21' })
  etc21: string;
  @Column({ name: 'cs_etc22' })
  etc22: string;
  @Column({ name: 'cs_etc23' })
  etc23: string;
  @Column({ name: 'cs_etc24' })
  etc24: string;
  @Column({ name: 'cs_etc25' })
  etc25: string;
  @Column({ name: 'cs_etc26' })
  etc26: string;
  @Column({ name: 'cs_etc27' })
  etc27: string;
  @Column({ name: 'cs_etc28' })
  etc28: string;
  @Column({ name: 'cs_etc29' })
  etc29: string;
  @Column({ name: 'cs_etc30' })
  etc30: string;
  @Column({ name: 'cs_etc31' })
  etc31: string;
  @Column({ name: 'cs_etc32' })
  etc32: string;
  @Column({ name: 'cs_etc33' })
  etc33: string;
  @Column({ name: 'cs_etc34' })
  etc34: string;
  @Column({ name: 'cs_etc35' })
  etc35: string;
  @Column({ name: 'cs_server_customer' })
  server_cust: string;
  @Column({ name: 'cs_server_ordernum' })
  server_orde: string;
  @Column({ name: 'cs_server_micid' })
  server_mici: string;
  @Column({ name: 'cs_server_adminid' })
  server_admi: string;
  @Column({ name: 'cs_server_svrpass' })
  server_svrp: string;
  @Column({ name: 'cs_server_svrbigo' })
  server_svrb: string;
  @Column({ name: 'cs_oauthpwd' })
  oauthpwd: string;
  @Column({ name: 'cs_medi_use' })
  medi_use: string;
  @Column({ name: 'cs_medi_pc' })
  medi_pc: string;
  @Column({ name: 'cs_medi_autojupsu' })
  medi_autoju: string;
  @Column({ name: 'cs_medi_grname' })
  medi_grname: string;


























































  g

  e











  y
  ion












































  omer
  rnum
  d
  nid
  ass
  igo



  psu

};