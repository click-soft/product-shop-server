import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import Payment from 'src/entities/cpm/payment.entity';
import WebHookArgs from 'src/api/web-hook/dto/web-hook.args';
import { In, Repository } from 'typeorm';
import { getTestCode } from 'src/config/is-test.config';
import { format } from 'date-fns';
import { OrdersGateway } from 'src/socket.io/orders.gateway';
import { PaymentItemService } from 'src/api/payment-item/services/payment-item.service';
import { ProductService } from 'src/api/product/services/product.service';
import { CsService } from 'src/api/cs/services/cs.service';
import { CheckoutResult } from '../types/checkout-result';
import { CheckoutInput } from '../dto/checkout.input';
import GetPaymentWithItemsArgs from '../dto/get-payment-with-items.args';
import PaymentsWithPage from '../types/payments-with-page';
import { RefundOrderArgs } from '../dto/refund-order.args';
import GetAdminPaymentsArgs from '../dto/get-admin-payments.args';
import { PaymentVirtualService } from 'src/api/payment-virtual/services/payment-virtual.service';
import { User } from 'src/api/auth/types/user';
import { PaymentRefundService } from 'src/api/payment-refund/services/payment-refund.service';
import TossRefundBody from 'src/api/_common/toss-payments/toss-refund-body';
import PaymentManager from '../module/payment-manager';

@Injectable()
export class PaymentService {
  private readonly TOSS_PAYMENTS_URL =
    'https://api.tosspayments.com/v1/payments/confirm';

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private paymentItemService: PaymentItemService,
    private paymentVirtualService: PaymentVirtualService,
    private productService: ProductService,
    private paymentRefundService: PaymentRefundService,
    private csService: CsService,
    private ordersGateway: OrdersGateway,
    private paymentManager: PaymentManager,
  ) {}

  private async savePayment({
    ykiho,
    result,
    quantity,
    isTest,
  }: {
    ykiho: string;
    result: CheckoutResult;
    quantity: number;
    isTest: boolean;
  }): Promise<Payment> {
    try {
      const payment = Payment.create({
        id: 0,
        ykiho,
        orderId: result.orderId,
        paymentKey: result.paymentKey,
        method: result.method,
        amount: result.totalAmount,
        quantity,
        requestedAt: result.requestedAt,
        approvedAt: result.approvedAt,
        sendType:
          result.status === 'WAITING_FOR_DEPOSIT' ? '결제대기' : '주문확인',
        test: getTestCode(isTest),
      });

      await this.paymentRepository.save(payment);

      return payment;
    } catch (error) {
      await this.paymentManager.fetchCancel(
        result.paymentKey,
        '결제오류 발생으로 인한 취소',
      );

      throw new HttpException('결제 데이터 저장 오류', HttpStatus.BAD_REQUEST);
    }
  }

  async checkout(
    dto: CheckoutInput,
    ykiho: string,
    isTest: boolean,
  ): Promise<CheckoutResult> {
    this.paymentManager.setTest(isTest);
    let result: CheckoutResult;

    if (dto.paymentType === 'BNPL') {
      // 후불결제(Buy now pay later)
      result = this.paymentManager.getCheckoutResultForBNPL(dto);
    } else {
      const data = await this.paymentManager.fetchCheckoutTosspayments(dto);
      result = this.paymentManager.getCheckoutResultByData(data);
    }

    if (result.success) {
      let savedPayment: Payment = await this.savePayment({
        ykiho,
        result,
        quantity: dto.quantity,
        isTest,
      });

      if (savedPayment) {
        const paymentItems = await this.paymentItemService.savePaymentItems(
          savedPayment.id,
          dto.items,
        );

        await this.paymentVirtualService.save(
          savedPayment.id,
          result.paymentVirtual,
        );

        await this.productService.saveProductByPayment(
          savedPayment,
          paymentItems,
        );
        this.ordersGateway.sendToClients({ state: 'checkout' });
      }
    }

    return result;
  }

  async getPaymentsWithItems(
    user: User,
    args: GetPaymentWithItemsArgs,
  ): Promise<PaymentsWithPage> {
    const dispItemCount = 6;
    const { ykiho, isTest } = user;

    const payments: Payment[] = await this.paymentRepository.find({
      where: {
        ykiho,
        test: getTestCode(isTest),
      },
      relations: ['paymentItems', 'virtual'],
      order: {
        id: 'DESC',
      },
      skip: dispItemCount * (args.page - 1),
      take: dispItemCount,
    });

    return {
      page: args.page,
      isLast: payments.length < dispItemCount,
      payments,
    };
  }

  private async updateToCancel(paymentId: number) {
    const result = await this.paymentRepository.update(paymentId, {
      cancel: true,
    });
    if (result.affected) {
      const paymentItemIds =
        await this.paymentItemService.getPaymentItemIdsByPaymentId(paymentId);
      await this.productService.deleteByPaymentItemId(...paymentItemIds);
    }
  }

  async refundOrder(
    dto: RefundOrderArgs,
    isTest: boolean,
  ): Promise<CheckoutResult> {
    const payment = await this.paymentRepository.findOne({
      where: { id: dto.paymentId },
    });
    this.paymentManager.setTest(isTest);
    const { data, refundBody } = await this.paymentManager.fetchRefund(
      payment,
      dto,
    );

    if (data?.status === 'CANCELED') {
      await this.paymentRefundService.save(payment.id, refundBody);
    }

    if (data.message) {
      return {
        success: false,
        errorCode: data.message,
        errorMessage: data.message,
      };
    } else {
      await this.updateToCancel(dto.paymentId);
      return { success: true };
    }
  }

  async isBuyNowPayLater(paymentKey: string) {
    const payment = await this.paymentRepository.findOne({
      where: { paymentKey },
    });

    return payment.method === '후불결제';
  }

  async cancelOrder(
    paymentId: number,
    paymentKey: string,
    cancelReason: string,
    isTest: boolean,
  ): Promise<CheckoutResult> {
    this.paymentManager.setTest(isTest);
    const useBNPL = await this.isBuyNowPayLater(paymentKey);
    const data = useBNPL
      ? { status: 'CANCELED' }
      : await this.paymentManager.fetchCancel(paymentKey, cancelReason);

    if (data.status === 'CANCELED') {
      await this.updateToCancel(paymentId);
      return { success: true };
    } else {
      return {
        success: false,
        errorCode: data.code,
        errorMessage: data.message,
      };
    }
  }

  async getOrderCompleted(orderId: string): Promise<Payment> {
    const response = await this.paymentRepository.findOne({
      where: { orderId },
      relations: ['virtual'],
    });

    return await response;
  }

  async getAdminPayments(
    args: GetAdminPaymentsArgs,
  ): Promise<PaymentsWithPage> {
    const dispCount = 6;

    let ykihos = await this.csService.getYkihosByJisa(args.jisa);
    if (ykihos.length === 0) {
      throw new Error('거래처 등록이 되어있지 않습니다.');
    }
    if (args.emCode) {
      ykihos = await this.csService.getYkihosByEmCode(args.emCode);
    }
    const startDateString = format(args.startDate, 'yyyy-MM-dd HH:mm:ss');
    const endDateString = format(args.endDate, 'yyyy-MM-dd HH:mm:ss');

    const query = this.paymentRepository
      .createQueryBuilder()
      .leftJoinAndSelect('Payment.paymentItems', 'paymentItems')
      .leftJoinAndSelect('Payment.virtual', 'virtual');
    if (args.orderId) {
      query.where('order_id = :orderId', { orderId: args.orderId });
    } else {
      query
        .where('ykiho IN (:...ykihos)', { ykihos })
        .andWhere('requested_at >= :startDateString', { startDateString })
        .andWhere('requested_at <= :endDateString', { endDateString })
        .orderBy('Payment.id', 'DESC');

      if (args.customerName) {
        const ykihos = await this.csService.getYkihosByMyung(args.customerName);
        if (ykihos.length === 0) {
          return { page: 0, isLast: true, payments: [] };
        }
        query.andWhere('ykiho IN (:...ykihos)', { ykihos });
      }
    }

    const payments: Payment[] = await query
      .skip(dispCount * (args.page - 1))
      .take(dispCount)
      .getMany();

    // const payments: Payment[] = await this.paymentRepository.find({
    //   where: {
    //     ykiho: In(ykihos)
    //   },
    //   relations: ['paymentItems', 'virtual'],
    //   order: {
    //     id: 'DESC'
    //   }
    // });

    return {
      page: args.page,
      isLast: payments.length < dispCount,
      payments,
    };
  }

  async doneVirtualAccount(result: WebHookArgs): Promise<Payment> {
    try {
      const payment = await this.paymentRepository.findOne({
        where: { orderId: result.orderId },
      });
      if (payment?.sendType === '결제대기') {
        payment.sendType = '주문확인';
        payment.approvedAt = result.createdAt;
        return await payment.save();
      }
      return payment;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
