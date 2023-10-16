import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cart } from '../../entities/cpm/cart.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem, CartItem as CartItemEntity } from 'src/entities/cpm/cart-item.entity';
import { ProductService } from '../product/product.service';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import CartItemArgs from './dto/cart-item.args';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private productService: ProductService
  ) { }

  async getCart(ykiho: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { ykiho } });

    return cart;
  }

  async getCartWithProduct(jisa: string, ykiho: string) {
    const cart = await this.getCart(ykiho);
    const products: ProductListSub[] = await this.productService.getLatestProducts();

    cart?.cartItems?.forEach(ci => {
      const product = products.find(p => p.jisa === jisa && p.smCode === ci.code)
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

  async saveCart(ykiho: string, args: CartItemArgs): Promise<{ message: string }> {
    const cart: Cart = await this.createCart(ykiho);
    const newCartItem = CartItemEntity.create({
      id: args.id,
      cartId: args.cartId,
      code: args.code,
      quantity: args.quantity,
      fit: args.fit,
      createdDate: args.createdDate,
      updatedDate: args.updatedDate
    });

    if (cart.cartItems) {
      const baseCartItems: CartItem[] = cart.cartItems;
      const baseCartItem = baseCartItems.find(baseCartItem => baseCartItem.code === newCartItem.code && baseCartItem.fit === newCartItem.fit);
      if (baseCartItem) {
        baseCartItem.quantity += newCartItem.quantity;
      } else {
        cart.cartItems.push(newCartItem);
      }
    } else {
      cart.cartItems = [newCartItem];
    }

    return await this.saveCartItems(cart.id, cart.cartItems)
  }

  async saveCartItems(cartId: number, cartItems: CartItem[]): Promise<{ message: string }> {
    cartItems.forEach(cartItem => cartItem.cartId = cartId);
    const result = await this.cartItemRepository.save(cartItems)

    if (result) {
      return { message: 'success' }
    }
    throw new HttpException('Add to cart failed', HttpStatus.BAD_REQUEST);
  }

  async getItemsCount(ykiho: string): Promise<number> {
    const baseCart = await this.getCart(ykiho);
    const itemsCount: number = baseCart?.cartItems?.reduce((acc: number, ci: CartItem) => {
      return acc + ci.quantity;
    }, 0)

    return itemsCount;
  }

  async getCartItems(): Promise<CartItem[]> {
    return await this.cartItemRepository.find();
  }

  async updateCartItem(id: number, updatedData: Partial<CartItem>): Promise<UpdateResult> {
    const result = await this.cartItemRepository.update(id, updatedData)
    return result;
  }

  async deleteCartItems(...ids: number[]): Promise<DeleteResult> {
    return this.cartItemRepository.delete(ids);
  }
}