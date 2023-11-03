import { Module } from '@nestjs/common';
import { JwtConfigModule } from '../jwt/jwt-config.module';
import { ProductlogService } from '../productlog/services/productlog.service';
import { OrdersGateway } from 'src/socket.io/orders.gateway';
import { OrmModule } from 'src/orm.module';
import { PaymentResolver } from './resolvers/payment.resolver';
import { PaymentService } from './services/payment.service';
import { ProductListService } from '../product-list/services/product-list.service';
import { ProductService } from '../product/services/product.service';
import { PaymentItemService } from '../payment-item/services/payment-item.service';
import { CsService } from '../cs/services/cs.service';
import { PaymentVirtualService } from '../payment-virtual/services/payment-virtual.service';
import { PaymentRefundService } from '../payment-refund/services/payment-refund.service';

@Module({
  imports: [OrmModule, JwtConfigModule],
  providers: [
    PaymentResolver,
    PaymentService,
    ProductListService,
    ProductService,
    PaymentItemService,
    ProductlogService,
    CsService,
    PaymentVirtualService,
    PaymentRefundService,
    OrdersGateway,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
