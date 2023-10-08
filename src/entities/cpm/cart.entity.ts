import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartItem } from "./cart-item.entity";

@Entity({ name: 'cart' })
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ykiho: string;

  @OneToMany(() => CartItem, cartItem => cartItem.cart, { eager: true })
  @JoinColumn({ name: 'id' })
  cartItems: CartItem[];
}