import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Payment from './payment.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('payment_virtual')
export default class PaymentVirtual extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'payment_id' })
  paymentId: number;

  @Field()
  @Column({ name: 'bank_code' })
  bankCode: string;

  @Field()
  @Column({ name: 'customer_name' })
  customerName: string;

  @Field()
  @Column({ name: 'due_date' })
  dueDate: Date;

  @Field()
  @Column({ name: 'account_number' })
  accountNumber: string;

  @Field(() => Payment)
  @OneToOne(() => Payment, (payment) => payment.virtual)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;
}
