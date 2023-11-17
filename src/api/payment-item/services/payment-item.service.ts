import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckoutCartItemInput } from 'src/api/payment/dto/checkout-cart-item.input';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentItemService {
  constructor(
    @InjectRepository(PaymentItem)
    private paymentItemRepository: Repository<PaymentItem>,
  ) {}
  async getPaymentItemIdsByPaymentId(paymentId: number): Promise<number[]> {
    const result = await this.paymentItemRepository.find({
      select: { id: true },
      where: { paymentId },
    });

    return result?.map((p) => p.id);
  }

  async getById(id: number): Promise<PaymentItem> {
    return await this.paymentItemRepository.findOne({ where: { id } });
  }

  async getPaymentItemIds(paymentId: number): Promise<number[]> {
    const result = await this.paymentItemRepository.find({
      select: { id: true },
      where: { paymentId },
    });

    return result?.map((pi) => pi.id);
  }

  async savePaymentItems(
    paymentId: number,
    items: CheckoutCartItemInput[],
  ): Promise<PaymentItem[]> {
    const paymentItems = items.map((item) => {
      return PaymentItem.create({
        paymentId,
        ...item,
      });
    });

    return await this.paymentItemRepository.save(paymentItems);
  }
}
