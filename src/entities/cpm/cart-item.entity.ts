import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { ProductListSub } from "./productlistsub.entity";

@Entity({ name: 'cart_item' })
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cart_id' })
  cartId: number;

  @Column()
  code: string;

  @Column()
  quantity: number;

  @Column()
  fit: boolean;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @ManyToOne(() => Cart, { eager: false })
  @JoinColumn({ name: 'cart_id' })
  cart: Promise<Cart>;

  product: ProductListSub;
}