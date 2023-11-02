import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/api/payment/services/payment.service';
import WebHookArgs from 'src/api/web-hook/dto/web-hook.args';
import { OrdersGateway } from 'src/socket.io/orders.gateway';

@Injectable()
export class WebHookService {
  constructor(
    private paymentService: PaymentService,
    private ordersGateway: OrdersGateway,
  ) {}

  async checkoutVirtualAccount(result: WebHookArgs) {
    if (result.status === 'DONE') {
      const payment = await this.paymentService.doneVirtualAccount(result);
      this.ordersGateway.sendToClients({ state: 'update', data: payment });
    } else if (result.status === 'CANCELED') {
    }
  }
}
