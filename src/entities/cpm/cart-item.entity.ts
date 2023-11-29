import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { ProductListSub } from './productlistsub.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'cart_item' })
export class CartItem extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'cart_id' })
  cartId: number;

  @Field(() => String)
  @Column()
  code: string;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Boolean)
  @Column()
  fit: boolean;

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @Field(() => Cart)
  @ManyToOne(() => Cart, { eager: false })
  @JoinColumn({ name: 'cart_id' })
  cart: Promise<Cart>;

  @Field(() => ProductListSub)
  product: ProductListSub;
}
