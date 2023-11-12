import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentVirtual from 'src/entities/cpm/payment-virtual.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentVirtualService {
  constructor(
    @InjectRepository(PaymentVirtual)
    private paymentVirtualRepository: Repository<PaymentVirtual>,
  ) {}

  async save(paymentId: number, data: PaymentVirtual): Promise<PaymentVirtual> {
    if (!data) return;

    data.paymentId = paymentId;
    return await this.paymentVirtualRepository.save(data);
  }
}
