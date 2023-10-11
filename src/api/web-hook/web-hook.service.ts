import { Injectable } from '@nestjs/common';
import WebHookResult from 'src/interfaces/WebHookResult';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class WebHookService {
  constructor(private paymentService: PaymentService) {

  }

  async checkoutVirtualAccount(result: WebHookResult) {
    if (result.status === "DONE") {
      await this.paymentService.doneVirtualAccount(result)
    } else if (result.status === "CANCELED") {

    }
  }
}
