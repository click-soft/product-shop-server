import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('paymentRefund')
export default class PaymentRefund extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  paymentId: number;

  @Field()
  @Column()
  bank: string;

  @Field()
  @Column()
  accountNumber: string;

  @Field()
  @Column()
  holderName: string;

  @Field()
  @Column()
  amount: number;

  @Field()
  @Column()
  reason: string;
}
