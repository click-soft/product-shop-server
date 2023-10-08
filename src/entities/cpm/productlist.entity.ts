import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { ProductListSub } from "./productlistsub.entity";

@Entity({ name: "productlist" })
export class ProductList extends BaseEntity {
  @PrimaryColumn({ name: "pl_jisa" })
  jisa: string;

  @PrimaryColumn({ name: "pl_smcode" })
  smCode: string;

  @Column({ name: 'pl_smymd' })
  smYmd: string;

  @Column({ name: 'pl_adduser' })
  addUser: string;

  @Column({ name: 'pl_createdt' })
  createDt: Date;

  @Column({ name: 'pl_bigo' })
  bigo: string;

  @Column({ name: 'pl_web' })
  web: boolean;

  @Column({ name: 'pl_bunryu' })
  bunryu: string;
  
  productListSub: ProductListSub;
}