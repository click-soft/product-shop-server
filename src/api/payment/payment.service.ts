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
import { ProductService } from '../product/product.service';
import { getTossPaymentsSecretKey } from 'src/config/is-test.config';
import { PaymentItemService } from '../payment-item/payment-item.service';


@Injectable()
export class PaymentService {
  private readonly TOSS_PAYMENTS_URL = 'https://api.tosspayments.com/v1/payments/confirm';

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(PaymentItem)
    private paymentItemRepository: Repository<PaymentItem>,
    private paymentItemService: PaymentItemService,
    private productService: ProductService,
  ) { }

  private getCancelUrl(paymentKey: string) {
    return `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`;
  }

  private async savePayment({ ykiho, data, quantity }: { ykiho: string, data: any, quantity: number }): Promise<Payment> {
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
      sendType: data.status === 'WAITING_FOR_DEPOSIT' ? '결제대기' : '주문확인',
    });
    await this.paymentRepository.save(payment);

    return payment;
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

  private async savePaymentItems(paymentId: number, items: CheckoutCartItemInput[]): Promise<PaymentItem[]> {
    const paymentItems = items.map(item => {
      return PaymentItem.create({
        paymentId,
        ...item
      })
    })

    return await this.paymentItemRepository.save(paymentItems);
  }

  private getHeaders(isTest: boolean) {
    const tossSecretKey = getTossPaymentsSecretKey(isTest);
    const tossToken = Buffer.from(tossSecretKey + ":").toString('base64');
    const headers = {
      'Authorization': `Basic ${tossToken}`,
      'Content-Type': 'application/json'
    }
    return headers;
  }

  async checkout(dto: CheckoutInput, ykiho: string, isTest: boolean): Promise<CheckoutResult> {
    const headers = this.getHeaders(isTest);
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
      let savedPayment: Payment;
      try {
        savedPayment = await this.savePayment({ ykiho, data, quantity: dto.quantity });
      } catch (err) {
        await this.cancelToApi(dto.paymentKey, "결제오류 발생으로 인한 취소", isTest);
        return {
          success: false,
          errorCode: "checkout error",
          errorMessage: err.message,
        }
      }
      if (savedPayment) {
        const paymentItems = await this.savePaymentItems(savedPayment.id, dto.items);
        if (data.virtualAccount) {
          await this.savePaymentVirtual(savedPayment.id, data.virtualAccount);
        }
        this.productService.saveProductByPayment(savedPayment, paymentItems);
      }
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


  private async cancelToApi(paymentKey: string, cancelReason: string, isTest: boolean)
    : Promise<{ data?: any, errorMessage?: string }> {
    try {
      const url = this.getCancelUrl(paymentKey);
      const headers = this.getHeaders(isTest);
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

  private async refundToApi(payment: Payment, dto: RefundOrderArgs, isTest: boolean): Promise<{ data?: any, errorMessage?: string }> {
    try {
      const url = this.getCancelUrl(payment.paymentKey);
      const headers = this.getHeaders(isTest);
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

  private async updateToCancel(paymentId: number) {
    const result = await this.paymentRepository.update(paymentId, { cancel: true });
    if (result.affected) {
      const paymentItemIds = await this.paymentItemService.getPaymentItemIdsByPaymentId(paymentId);
      await this.productService.deleteByPaymentItemId(...paymentItemIds);
    }
  }

  async refundOrder(dto: RefundOrderArgs, isTest: boolean): Promise<CheckoutResult> {
    const payment = await this.paymentRepository.findOne({ where: { id: dto.paymentId } });
    const result = await this.refundToApi(payment, dto, isTest);

    if (result.errorMessage) {
      return {
        success: false,
        errorCode: result.errorMessage,
        errorMessage: result.errorMessage,
      }
    } else {
      await this.updateToCancel(dto.paymentId);
      return { success: true }
    }
  }

  async cancelOrder(paymentId: number, paymentKey: string, cancelReason: string, isTest: boolean): Promise<CheckoutResult> {
    const result = await this.cancelToApi(paymentKey, cancelReason, isTest)

    if (result.data) {
      if (result.data.status === 'CANCELED') {
        await this.updateToCancel(paymentId);
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
        payment.sendType = "주문확인";
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
