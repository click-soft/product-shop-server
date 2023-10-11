import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartItem } from "./cart-item.entity";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({ name: 'cart' })
export class Cart extends BaseEntity {
  @Field(()=> Int!)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(()=> String)
  @Column()
  ykiho: string;

  @Field(()=> [CartItem])
  @OneToMany(() => CartItem, cartItem => cartItem.cart, { eager: true })
  @JoinColumn({ name: 'id' })
  cartItems: CartItem[];
}