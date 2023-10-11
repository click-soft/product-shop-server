import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Payment from "./payment.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('payment_item')
export default class PaymentItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'bigint' })
  paymentId: number;

  @Field()
  @Column({ type: 'varchar', length: 20 })
  code: string;

  @Field()
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Field()
  @Column({ type: 'boolean' })
  fit: boolean;

  @Field()
  @Column({ type: 'int' })
  quantity: number;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Field(() => Payment)
  @ManyToOne(() => Payment)
  payment: Payment;
}