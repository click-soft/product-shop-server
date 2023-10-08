import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ProductList } from "./productlist.entity";

@Entity({ name: "productlistsub" })
export class ProductListSub extends BaseEntity {
  @PrimaryColumn({ name: "pls_auto" })
  auto: number;

  @Column({ name: 'pls_jisa' })
  jisa: string;

  @Column({ name: 'pls_smcode' })
  smCode: string;

  @Column({ name: 'pls_smmyung' })
  smMyung: string;

  @Column({ name: 'pls_smymd' })
  smYmd: string;

  @Column({ name: 'pls_danga' })
  danga: number;

  @Column({ name: 'pls_danwi' })
  danwi: string;

  @Column({ name: 'pls_etc1' })
  etc1: string;

  @Column({ name: 'pls_etc2' })
  etc2: string;

  @Column({ name: 'pls_etc3' })
  etc3: string;

  @Column({ name: 'pls_etc4' })
  etc4: string;

  @Column({ name: 'pls_etc5' })
  etc5: string;

  productList: ProductList[];
}