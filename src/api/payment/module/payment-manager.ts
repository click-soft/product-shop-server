import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getTossPaymentsSecretKey } from 'src/config/is-test.config';
import { CheckoutInput } from '../dto/checkout.input';
import { CheckoutResult } from '../types/checkout-result';
import Payment from 'src/entities/cpm/payment.entity';
import { RefundOrderArgs } from '../dto/refund-order.args';
import TossRefundBody from 'src/api/_common/toss-payments/toss-refund-body';

@Injectable()
export default class PaymentManager {
  private readonly TOSS_PAYMENTS_URL =
    'https://api.tosspayments.com/v1/payments/confirm';
  private isTest: boolean;

  private getCancelUrl(paymentKey: string) {
    return `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`;
  }

  constructor() {}

  setTest(isTest: boolean) {
    this.isTest = isTest;
  }

  get headers() {
    return this.getHeaders(this.isTest);
  }

  getHeaders(isTest: boolean) {
    const tossSecretKey = getTossPaymentsSecretKey(isTest);
    const tossToken = Buffer.from(tossSecretKey + ':').toString('base64');
    const headers = {
      Authorization: `Basic ${tossToken}`,
      'Content-Type': 'application/json',
    };
    return headers;
  }

  getCheckoutBody(dto: CheckoutInput) {
    return {
      paymentKey: dto.paymentKey,
      amount: dto.amount,
      orderId: dto.orderId,
    };
  }

  async fetchCheckoutTosspayments(dto: CheckoutInput) {
    const body = this.getCheckoutBody(dto);

    try {
      const response = await fetch(this.TOSS_PAYMENTS_URL, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async fetchCancel(paymentKey: string, cancelReason: string) {
    try {
      const url = this.getCancelUrl(paymentKey);
      const headers = this.headers;
      headers['Idempotency-Key'] = 'SAAABPQbcqjEXiDL2';
      const body = { cancelReason };
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async fetchRefund(
    payment: Payment,
    dto: RefundOrderArgs,
  ): Promise<RefundResult> {
    try {
      const url = this.getCancelUrl(payment.paymentKey);
      const refundBody: TossRefundBody = {
        cancelReason: dto.cancelReason,
        cancelAmount: payment.amount,
        refundReceiveAccount: {
          bank: dto.bank,
          accountNumber: dto.accountNumber,
          holderName: dto.holderName,
        },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(refundBody),
      });

      const data = await response.json();

      return {
        data,
        refundBody,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  getCheckoutResultByData(data: any): CheckoutResult {
    return {
      success: !!data.method,
      errorCode: data.code,
      errorMessage: data.message,
      method: data.method,
      requestedAt: data.requestedAt ? new Date(data.requestedAt) : undefined,
      approvedAt: data.requestedAt ? new Date(data.approvedAt) : undefined,
      orderId: data.orderId,
      paymentKey: data.paymentKey,
      totalAmount: data.totalAmount,
      status: data.status,
      paymentVirtual: { ...data.virtualAccount },
    };
  }

  getCheckoutResultForBNPL(dto: CheckoutInput): CheckoutResult {
    return {
      success: true,
      method: '후불결제',
      requestedAt: new Date(),
      approvedAt: undefined,
      orderId: dto.orderId,
      paymentKey: dto.paymentKey,
      totalAmount: dto.amount,
      status: 'WAITING_FOR_DEPOSIT',
    };
  }
}

type RefundResult = {
  data: any;
  refundBody: TossRefundBody;
};
