import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import PaymentItem from "./payment-item.entity";
import PaymentVirtual from "./payment-virtual.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity("payment")
export default class Payment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'ykiho' })
  ykiho: string;

  @Field()
  @Column({ name: 'order_id' })
  orderId: string;

  @Field()
  @Column({ name: 'payment_key' })
  paymentKey: string;

  @Field()
  @Column()
  method: string;

  @Field()
  @Column()
  amount: number;

  @Field()
  @Column()
  quantity: number;

  @Field(() => Date, { nullable: true })
  @Column({ name: 'requested_at' })
  requestedAt?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ name: 'approved_at' })
  approvedAt?: Date;

  @Field()
  @Column({ name: 'send_type' })
  sendType: '결제대기' | '주문확인' | '상품준비중' | '배송중' | '배송완료';
  @Field()
  @Column()
  cancel: boolean;

  @Field(() => [PaymentItem], { nullable: true })
  @OneToMany(() => PaymentItem, item => item.payment)
  paymentItems: PaymentItem[]

  @Field(() => PaymentVirtual, { nullable: true })
  @OneToOne(() => PaymentVirtual, virt => virt.payment)
  virtual: PaymentVirtual;
}