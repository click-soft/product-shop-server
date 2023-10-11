import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import PaymentItem from "./payment-item.entity";
import PaymentVirtual from "./payment-virtual.entity";

@Entity("payment")
export default class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ykiho' })
  ykiho: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @Column({ name: 'payment_key' })
  paymentKey: string;

  @Column()
  method: string;

  @Column()
  amount: number;

  @Column()
  quantity: number;

  @Column({ name: 'requested_at' })
  requestedAt: Date;

  @Column({ name: 'approved_at' })
  approvedAt?: Date;

  @Column({ name: 'send_type' })
  sendType: '결제대기' | '배송준비' | '배송중' | '배송완료';

  @Column()
  cancel: boolean;

  @OneToMany(() => PaymentItem, item => item.payment)
  paymentItems: PaymentItem[]

  @OneToOne(() => PaymentVirtual, virt => virt.payment)
  virtual: PaymentVirtual;
}