import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/entities/cpm/cart-item.entity';
import { ProductListSubService } from 'src/api/product-list-sub/services/product-list-sub.service';
import CartItemArgs from '../dto/cart-item.args';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import { Cart } from 'src/entities/cpm/cart.entity';
import { CartItemService } from 'src/api/cart-item/services/cart-item.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private cartItemService: CartItemService,
    private productListSubService: ProductListSubService,
  ) {}

  async getCart(ykiho: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { ykiho } });

    return cart;
  }

  async getCartWithProduct(jisa: string, ykiho: string) {
    const cart = await this.getCart(ykiho);
    const products: ProductListSub[] =
      await this.productListSubService.getLatestProducts();

    cart?.cartItems?.forEach((ci) => {
      const product = products.find(
        (p) => p.jisa === jisa && p.smCode === ci.code,
      );
      ci.product = product;
    });

    return cart;
  }

  async createCart(ykiho: string): Promise<Cart> {
    let cart: Cart;
    const baseCart: Cart = await this.getCart(ykiho);

    if (baseCart) {
      cart = Object.assign(new Cart(), baseCart);
    } else {
      cart = Cart.create({ ykiho });
      cart = await this.cartRepository.save(cart);
    }
    return cart;
  }

  async saveCart(
    ykiho: string,
    args: CartItemArgs,
  ): Promise<{ message: string }> {
    const cart: Cart = await this.createCart(ykiho);
    const newCartItem = CartItem.create({
      id: args.id,
      cartId: args.cartId,
      code: args.code,
      quantity: args.quantity,
      fit: args.fit,
      createdDate: args.createdDate,
      updatedDate: args.updatedDate,
    });

    if (cart.cartItems) {
      const baseCartItems: CartItem[] = cart.cartItems;
      const baseCartItem = baseCartItems.find(
        (baseCartItem) =>
          baseCartItem.code === newCartItem.code &&
          baseCartItem.fit === newCartItem.fit,
      );
      if (baseCartItem) {
        baseCartItem.quantity += newCartItem.quantity;
      } else {
        cart.cartItems.push(newCartItem);
      }
    } else {
      cart.cartItems = [newCartItem];
    }

    return await this.cartItemService.saveCartItems(cart.id, cart.cartItems);
  }

  async getItemsCount(ykiho: string): Promise<number> {
    const baseCart = await this.getCart(ykiho);
    const itemsCount: number = baseCart?.cartItems?.reduce(
      (acc: number, ci: CartItem) => {
        return acc + ci.quantity;
      },
      0,
    );

    return itemsCount;
  }
}
