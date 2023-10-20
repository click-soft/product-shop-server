import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Cs } from './cs.entity';

@ObjectType()
@Entity("product")
export default class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn({ type: 'int', name: 'pd_auto' })
  auto: number;

  @Field()
  @Column({ type: 'varchar', length: 20, name: 'pd_clcode' })
  clCode: string;

  @Field()
  @Column({ type: 'varchar', length: 3, name: 'pd_jisa' })
  jisa: string;

  @Field()
  @Column({ type: 'varchar', length: 20, name: 'pd_cscode' })
  csCode: string;

  @Field()
  @Column({ type: 'varchar', length: 20, name: 'pd_cttel' })
  ctTel: string;

  @Field()
  @Column({ type: 'int', name: 'pd_count' })
  count: number;

  @Field()
  @Column({ type: 'char', length: 3, name: 'pd_receive' })
  receive: string;

  @Field()
  @Column({ type: 'varchar', length: 8, name: 'pd_receiveymd' })
  receiveYmd: string;

  @Field()
  @Column({ type: 'char', length: 1, name: 'pd_sell' })
  sell: string;

  @Field()
  @Column({ type: 'varchar', length: 8, name: 'pd_sellymd' })
  sellYmd: string;

  @Field()
  @Column({ type: 'char', length: 1, name: 'pd_ordercheck' })
  orderCheck: string;

  @Field()
  @Column({ type: 'char', length: 3, name: 'pd_seller' })
  seller: string;

  @Field()
  @Column({ type: 'char', length: 1, name: 'pd_check' })
  check: string;

  @Field()
  @Column({ type: 'char', length: 1, name: 'pd_check2' })
  check2: string;

  @Field()
  @Column({ type: 'varchar', length: 50, name: 'pd_rgb' })
  rgb: string;

  @Field()
  @Column({ type: 'varchar', length: 255, name: 'pd_bigo' })
  bigo: string;

  @Field()
  @Column({ type: 'timestamp', name: 'pd_createdt' })
  createDt: Date;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, name: 'pd_bigo2', nullable: true })
  bigo2?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, name: 'pd_etc1', nullable: true })
  etc1?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, name: 'pd_etc2', nullable: true })
  etc2?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, name: 'pd_etc3', nullable: true })
  etc3?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, name: 'pd_etc4', nullable: true })
  etc4?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, name: 'pd_etc5', nullable: true })
  etc5?: string;

  @Field()
  @Column({ type: 'boolean', name: 'pd_web' })
  web: boolean;

  @Field()
  @Column({ type: 'int', name: 'pd_web_payment_item_id' })
  webPaymentItemId: number;
}