import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ProductList } from './productlist.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'productlistsub' })
export class ProductListSub extends BaseEntity {
  @Field({ nullable: true })
  @PrimaryColumn({ name: 'pls_auto' })
  auto: number;

  @Field({ nullable: true })
  @Column({ name: 'pls_jisa' })
  jisa: string;

  @Field({ nullable: true })
  @Column({ name: 'pls_smcode' })
  smCode: string;

  @Field({ nullable: true })
  @Column({ name: 'pls_smmyung' })
  smMyung: string;

  @Field({ nullable: true })
  @Column({ name: 'pls_smymd' })
  smYmd: string;

  @Field({ nullable: true })
  @Column({ name: 'pls_danga' })
  danga: number;

  @Field({ nullable: true })
  @Column({ name: 'pls_danwi' })
  danwi: string;

  @Field({ nullable: true })
  @Column({ name: 'pls_etc1' })
  etc1: string;

  @Field({ nullable: true })
  @Column({ name: 'pls_etc2' })
  etc2: string;

  @Field({ nullable: true })
  @Column({ name: 'pls_etc3' })
  etc3: string;

  @Field({ nullable: true })
  @Column({ name: 'pls_etc4' })
  etc4: string;

  @Field({ nullable: true })
  @Column({ name: 'pls_etc5' })
  etc5: string;

  @Field(() => ProductList, { nullable: true })
  productList: ProductList;
}
