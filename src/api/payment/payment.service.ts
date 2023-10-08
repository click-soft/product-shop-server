import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import Payment from 'src/entities/cpm/payment.entity';
import { CheckoutCartItemInput, CheckoutInput, CheckoutResult, PaymentType } from 'src/graphql';
import { Repository } from 'typeorm';


@Injectable()
export class PaymentService {
  private readonly TOSS_PAYMENTS_URL = 'https://api.tosspayments.com/v1/payments/confirm';

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(PaymentItem)
    private paymentItemRepository: Repository<PaymentItem>,
    private configService: ConfigService,
  ) { }

  private getCancelUrl(paymentKey: string) {
    return `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`;
  }

  private async savePayment({ ykiho, data, quantity }: { ykiho: string, data: any, quantity: number }): Promise<{ success: boolean, id?: number, errorMessage?: string }> {
    let paymentId: number;
    try {
      const payment = Payment.create({
        id: 0,
        ykiho,
        orderId: data.orderId,
        paymentKey: data.paymentKey,
        method: data.method,
        amount: data.totalAmount,
        quantity,
        approvedAt: data.approvedAt
      });
      await this.paymentRepository.save(payment);
      paymentId = payment.id;
    } catch (error) {
      return { success: false, errorMessage: `결제 저장 중 오류가 발생했습니다.\n ----- \n ${error.message}` }
    }
    return { success: true, id: paymentId };
  }

  private async savePaymentItems(paymentId: number, items: CheckoutCartItemInput[]) {
    const paymentItems = items.map(item => {
      return PaymentItem.create({
        paymentId,
        ...item
      })
    })

    await this.paymentItemRepository.save(paymentItems);
  }

  private getHeaders() {
    const tossSecretKey = this.configService.get<string>("TOSS_PAYMENTS_SECRET_KEY")
    const tossToken = Buffer.from(tossSecretKey + ":").toString('base64');
    const headers = {
      'Authorization': `Basic ${tossToken}`,
      'Content-Type': 'application/json'
    }
    return headers;
  }

  async checkout(dto: CheckoutInput, ykiho: string): Promise<CheckoutResult> {
    const headers = this.getHeaders();
    const body = {
      paymentKey: dto.paymentKey,
      amount: dto.amount,
      orderId: dto.orderId,
    }

    const response = await fetch(this.TOSS_PAYMENTS_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const result: CheckoutResult = {
      success: !!data.method,
      errorCode: data.code,
      errorMessage: data.message,
      method: data.method,
      approvedAt: data.approvedAt,
    };

    console.log('result', result);

    if (result.success) {
      const paymentResult = await this.savePayment({ ykiho, data, quantity: dto.quantity });
      if (paymentResult.success) {
        await this.savePaymentItems(paymentResult.id, dto.items);
      }
    }

    return result;
  }

  async getPaymentsWithItems(ykiho: string): Promise<PaymentType[]> {
    const payments: PaymentType[] = await this.paymentRepository.find({
      where: {
        ykiho
      },
      relations: ['paymentItems'],
      order: {
        approvedAt: 'DESC'
      }
    });

    return payments;
  }

  async cancelOrder(paymentId: number, paymentKey: string, cancelReason: string): Promise<CheckoutResult> {
    const url = this.getCancelUrl(paymentKey);
    const headers = this.getHeaders();
    headers['Idempotency-Key'] = 'SAAABPQbcqjEXiDL2';
    const body = { cancelReason }
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await response.json()
    console.log(JSON.stringify(data));

    if (data.status === 'CANCELED') {
      this.paymentRepository.update(paymentId, { cancel: true })
      return { success: true }
    } else {
      return {
        success: false,
        errorCode: data.code,
        errorMessage: data.message
      }
    }
  }
}
