import { Module } from '@nestjs/common';
import { ProductlogService } from '../productlog/services/productlog.service';
import { OrdersGateway } from 'src/socket.io/orders.gateway';
import { OrmModule } from 'src/orm.module';
import { WebHookController } from './controllers/web-hook.controller';
import { WebHookService } from './services/web-hook.service';
import { PaymentService } from '../payment/services/payment.service';
import { ProductService } from '../product/services/product.service';
import { PaymentItemService } from '../payment-item/services/payment-item.service';
import { CsService } from '../cs/services/cs.service';
import { PaymentVirtualService } from '../payment-virtual/services/payment-virtual.service';
import { PaymentRefundService } from '../payment-refund/services/payment-refund.service';
import PaymentManager from '../payment/module/payment-manager';

@Module({
  imports: [OrmModule],
  controllers: [WebHookController],
  providers: [
    WebHookService,
    PaymentService,
    ProductService,
    PaymentItemService,
    ProductlogService,
    PaymentVirtualService,
    PaymentRefundService,
    CsService,
    OrdersGateway,
    PaymentManager,
  ],
})
export class WebHookModule {}
