import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentItemService {
  constructor(
    @InjectRepository(PaymentItem)
    private paymentItemRepository: Repository<PaymentItem>
  ) {

  }
  async getPaymentItemIdsByPaymentId(paymentId: number): Promise<number[]> {
    const result = await this.paymentItemRepository.find({
      select: { id: true },
      where: { paymentId }
    })

    return result?.map(p => p.id);
  }

  async getById(id: number): Promise<PaymentItem> {
    return await this.paymentItemRepository.findOne({ where: { id } })
  }
}
