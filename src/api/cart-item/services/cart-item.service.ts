import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/entities/cpm/cart-item.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async getCartItems(): Promise<CartItem[]> {
    return await this.cartItemRepository.find();
  }

  async deleteCartItems(...ids: number[]): Promise<DeleteResult> {
    return this.cartItemRepository.delete(ids);
  }

  async updateCartItem(
    id: number,
    updatedData: Partial<CartItem>,
  ): Promise<UpdateResult> {
    const result = await this.cartItemRepository.update(id, updatedData);
    return result;
  }

  async saveCartItems(
    cartId: number,
    cartItems: CartItem[],
  ): Promise<{ message: string }> {
    cartItems.forEach((cartItem) => (cartItem.cartId = cartId));
    const result = await this.cartItemRepository.save(cartItems);

    if (result) {
      return { message: 'success' };
    }
    throw new HttpException('Add to cart failed', HttpStatus.BAD_REQUEST);
  }
}
