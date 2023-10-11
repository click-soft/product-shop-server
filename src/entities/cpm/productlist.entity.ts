import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { ProductListSub } from "./productlistsub.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({ name: "productlist" })
export class ProductList extends BaseEntity {

  @Field()
  @PrimaryColumn({ name: "pl_jisa" })
  jisa: string;

  @Field()
  @PrimaryColumn({ name: "pl_smcode" })
  smCode: string;

  @Field()
  @Column({ name: 'pl_smymd' })
  smYmd: string;

  @Field()
  @Column({ name: 'pl_adduser' })
  addUser: string;

  @Field()
  @Column({ name: 'pl_createdt' })
  createDt: Date;

  @Field()
  @Column({ name: 'pl_bigo' })
  bigo: string;

  @Field()
  @Column({ name: 'pl_web' })
  web: boolean;

  @Field()
  @Column({ name: 'pl_bunryu' })
  bunryu: string;

  @Field(() => ProductListSub)
  productListSub: ProductListSub;
}