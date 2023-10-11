import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import PaymentVirtual from 'src/entities/cpm/payment-virtual.entity';
import Payment from 'src/entities/cpm/payment.entity';
import WebHookResult from 'src/interfaces/WebHookResult';
import VirtualAccount from 'src/interfaces/virtual-account';
import { Repository } from 'typeorm';
import { CheckoutCartItemInput } from './dto/checkout-cart-item.input';
import { CheckoutInput } from './dto/checkout.input';
import { CheckoutResult } from './types/checkout-result';
import { RefundOrderArgs } from './dto/refund-order.args';


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
    try {
      const payment = Payment.create({
        id: 0,
        ykiho,
        orderId: data.orderId,
        paymentKey: data.paymentKey,
        method: data.method,
        amount: data.totalAmount,
        quantity,
        requestedAt: data.requestedAt,
        approvedAt: data.approvedAt,
        sendType: data.status === 'WAITING_FOR_DEPOSIT' ? '결제대기' : '배송준비',
      });
      await this.paymentRepository.save(payment);
      const paymentId = payment.id;
      if (data.virtualAccount) {
        await this.savePaymentVirtual(paymentId, data.virtualAccount);
      }
      return { success: true, id: paymentId };
    } catch (error) {
      return { success: false, errorMessage: `결제 저장 중 오류가 발생했습니다.\n ----- \n ${error.message}` }
    }
  }

  private async savePaymentVirtual(paymentId: number, virt: VirtualAccount) {
    const pmVirt = PaymentVirtual.create({
      paymentId,
      bankCode: virt.bankCode,
      customerName: virt.customerName,
      dueDate: virt.dueDate,
      accountNumber: virt.accountNumber,
    });

    await pmVirt.save();
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
      requestedAt: new Date(data.requestedAt),
      approvedAt: new Date(data.approvedAt),
    };

    if (result.success) {
      const paymentResult = await this.savePayment({ ykiho, data, quantity: dto.quantity });
      if (!paymentResult.success) {
        await this.cancelToApi(dto.paymentKey, "결제오류 발생으로 인한 취소");
        return paymentResult;
      }

      await this.savePaymentItems(paymentResult.id, dto.items);
    }

    return result;
  }

  async getPaymentsWithItems(ykiho: string): Promise<Payment[]> {
    const payments: Payment[] = await this.paymentRepository.find({
      where: {
        ykiho
      },
      relations: ['paymentItems', 'virtual'],
      order: {
        id: 'DESC'
      }
    });

    return payments;
  }


  private async cancelToApi(paymentKey: string, cancelReason: string)
    : Promise<{ data?: any, errorMessage?: string }> {
    try {
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
      return {
        data: data,
      }
    } catch (err) {
      return {
        errorMessage: err.message,
      }
    }
  }

  private async refundToApi(payment: Payment, dto: RefundOrderArgs): Promise<{ data?: any, errorMessage?: string }> {
    try {
      const url = this.getCancelUrl(payment.paymentKey);
      const headers = this.getHeaders();
      // headers['Idempotency-Key'] = 'SAAABPQbcqjEXiDL2';
      const body = {
        cancelReason: dto.cancelReason,
        cancelAccount: payment.amount,
        refundReceiveAccount: {
          bank: dto.bank,
          accountNumber: dto.accountNumber,
          holderName: dto.holderName,
        }
      }
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await response.json()
      return {
        data: data,
        errorMessage: data.message,
      }
    } catch (err) {
      return {
        errorMessage: err.message,
      }
    }
  }

  async refundOrder(dto: RefundOrderArgs): Promise<CheckoutResult> {
    const payment = await this.paymentRepository.findOne({ where: { id: dto.paymentId } });
    const result = await this.refundToApi(payment, dto);

    if (result.errorMessage) {
      return {
        success: false,
        errorCode: result.errorMessage,
        errorMessage: result.errorMessage,
      }
    } else {
      this.paymentRepository.update(dto.paymentId, { cancel: true })
      return { success: true }
    }
  }

  async cancelOrder(paymentId: number, paymentKey: string, cancelReason: string): Promise<CheckoutResult> {
    const result = await this.cancelToApi(paymentKey, cancelReason)

    if (result.data) {
      if (result.data.status === 'CANCELED') {
        this.paymentRepository.update(paymentId, { cancel: true })
        return { success: true }
      } else {
        return {
          success: false,
          errorCode: result.data.code,
          errorMessage: result.data.message
        }
      }
    } else {
      return {
        success: false,
        errorCode: 'unknwon error',
        errorMessage: result.errorMessage,
      }
    }
  }

  async getOrderCompleted(orderId: string): Promise<Payment> {
    const response = await this.paymentRepository.findOne({ where: { orderId }, relations: ['virtual'] })

    return await response;
  }

  async doneVirtualAccount(result: WebHookResult): Promise<Payment | { message: { message: string } }> {
    try {
      const payment = await this.paymentRepository.findOne({ where: { orderId: result.orderId } })
      if (payment?.sendType === "결제대기") {
        payment.sendType = "배송준비";
        payment.approvedAt = result.createdAt;
        return await payment.save();
      }
    } catch (err) {
      return {
        message: err.message
      }
    }
  }
}
