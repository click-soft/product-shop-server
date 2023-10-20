import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'cs' })
export class Cs extends BaseEntity {
  @Field({ nullable: true })
  @PrimaryColumn({ name: 'cs_gubun' })
  gubun: string;
  @Field({ nullable: true })
  @PrimaryColumn({ name: 'cs_code' })
  code: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_myung' })
  myung: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_daepyo' })
  daepyo: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_tel' })
  tel: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_fax' })
  fax: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_post' })
  post: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_dup' })
  dup: number;
  @Field({ nullable: true })
  @Column({ name: 'cs_juso' })
  juso: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_bunji' })
  bunji: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_jisa' })
  jisa: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_emcode' })
  emCode: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_damdang' })
  damdang: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_damdanghp' })
  damdanghp: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_jongbl' })
  jongbl: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_upte' })
  upte: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_saupnum' })
  saupnum: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_sauppost' })
  sauppost: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_saupdup' })
  saupdup: number;
  @Field({ nullable: true })
  @Column({ name: 'cs_saupjuso' })
  saupjuso: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_saupbunji' })
  saupbunji: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_email' })
  email: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_ediid' })
  ediid: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_edipassword' })
  edipassword: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_local' })
  local: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_nonchart' })
  nonchart: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_fymd' })
  fymd: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_lymd' })
  lymd: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_bigo' })
  bigo: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_user' })
  user: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc1' })
  etc1: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc2' })
  etc2: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc3' })
  etc3: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_Chonguser' })
  Chonguser: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_pro' })
  pro: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_yanghan' })
  yanghan: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_chunggu' })
  chunggu: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_cherbang' })
  cherbang: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_youngsu' })
  youngsu: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_pacs' })
  pacs: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_barcode' })
  barcode: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_yakguk' })
  yakguk: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_update' })
  update: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_askumak' })
  askumak: number;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc4' })
  etc4: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc5' })
  etc5: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc6' })
  etc6: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc7' })
  etc7: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_cms' })
  cms: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_daegidisp' })
  daegidisp: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_gumjinlink' })
  gumjinlink: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_capture' })
  capture: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_sutak' })
  sutak: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_sutaklink' })
  sutaklink: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_gumsalinkyn' })
  gumsalinkyn: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_gumsalink' })
  gumsalink: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_scaner' })
  scaner: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_card' })
  card: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_cardlink' })
  cardlink: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_eleccherbang' })
  eleccherban: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_yakgukprint' })
  yakgukprint: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_gumsabarcode' })
  gumsabarcod: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_bdbarcode' })
  bdbarcode: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_updatepath' })
  updatepath: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_server' })
  server: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_sanjae' })
  sanjae: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_paljji' })
  paljji: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_jungji' })
  jungji: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_servermodel' })
  servermodel: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_servername' })
  servername: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_serverSN' })
  serverSN: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_serverMT' })
  serverMT: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_serverHDD' })
  serverHDD: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_serverMemory' })
  serverMemor: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_serverLocation' })
  serverLocat: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_serversetup' })
  serversetup: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_window' })
  window: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_windowmemo' })
  windowmemo: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_virusname' })
  virusname: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_virussetup' })
  virussetup: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_virusend' })
  virusend: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_upsname' })
  upsname: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_upssetup' })
  upssetup: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_upsend' })
  upsend: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_rollprint' })
  rollprint: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_inuser' })
  inuser: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_upuser' })
  upuser: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_indate' })
  indate: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_update2' })
  update2: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc8' })
  etc8: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc9' })
  etc9: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc10' })
  etc10: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc11' })
  etc11: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc12' })
  etc12: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc13' })
  etc13: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc14' })
  etc14: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc15' })
  etc15: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_bogubun' })
  bogubun: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_aschk' })
  aschk: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc16' })
  etc16: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc17' })
  etc17: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc18' })
  etc18: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc19' })
  etc19: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc20' })
  etc20: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc21' })
  etc21: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc22' })
  etc22: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc23' })
  etc23: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc24' })
  etc24: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc25' })
  etc25: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc26' })
  etc26: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc27' })
  etc27: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc28' })
  etc28: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc29' })
  etc29: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc30' })
  etc30: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc31' })
  etc31: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc32' })
  etc32: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc33' })
  etc33: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc34' })
  etc34: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_etc35' })
  etc35: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_server_customer' })
  server_cust: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_server_ordernum' })
  server_orde: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_server_micid' })
  server_mici: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_server_adminid' })
  server_admi: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_server_svrpass' })
  server_svrp: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_server_svrbigo' })
  server_svrb: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_oauthpwd' })
  oauthpwd: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_medi_use' })
  medi_use: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_medi_pc' })
  medi_pc: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_medi_autojupsu' })
  medi_autoju: string;
  @Field({ nullable: true })
  @Column({ name: 'cs_medi_grname' })
  medi_grname: string;
};