import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import TossRefundBody from 'src/api/_common/toss-payments/toss-refund-body';
import PaymentRefund from 'src/entities/cpm/payment-refund.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentRefundService {
  constructor(
    @InjectRepository(PaymentRefund)
    private paymentRefundRepository: Repository<PaymentRefund>,
    private configService: ConfigService,
  ) {}

  async save(paymentId: number, refundBody: TossRefundBody) {
    const accNum = refundBody.refundReceiveAccount.accountNumber;
    const encKey = this.configService.get<string>('CLICK_ENC_KEY');
    const result = await this.paymentRefundRepository
      .createQueryBuilder()
      .insert()
      .into(PaymentRefund)
      .values({
        paymentId,
        bank: refundBody.refundReceiveAccount.bank,
        accountNumber: () => `HEX(AES_ENCRYPT('${accNum}', '${encKey}'))`,
        holderName: refundBody.refundReceiveAccount.holderName,
        amount: refundBody.cancelAmount,
        reason: refundBody.cancelReason,
      })
      .execute();

    return result;
  }
}
