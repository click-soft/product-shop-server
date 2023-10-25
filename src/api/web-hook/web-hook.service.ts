import { Injectable } from '@nestjs/common';
import WebHookResult from 'src/interfaces/WebHookResult';
import { PaymentService } from '../payment/payment.service';
import { OrdersGateway } from 'src/socket.io/orders.gateway';

@Injectable()
export class WebHookService {
  constructor(
    private paymentService: PaymentService,
    private ordersGateway: OrdersGateway,
  ) {

  }

  async checkoutVirtualAccount(result: WebHookResult) {
    if (result.status === "DONE") {
      const payment = await this.paymentService.doneVirtualAccount(result)
      this.ordersGateway.sendToClients({ state: 'update', data: payment });
    } else if (result.status === "CANCELED") {

    }
  }
}
