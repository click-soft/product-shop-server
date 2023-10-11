import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Payment from "./payment.entity";

@Entity("payment_virtual")
export default class PaymentVirtual extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'payment_id' })
  paymentId: number;

  @Column({ name: 'bank_code' })
  bankCode: string;

  @Column({ name: 'customer_name' })
  customerName: string;

  @Column({ name: 'due_date' })
  dueDate: Date;

  @Column({ name: 'account_number' })
  accountNumber: string;

  @OneToOne(() => Payment, payment => payment.virtual)
  @JoinColumn({ name: "payment_id" })
  payment: Payment;
}