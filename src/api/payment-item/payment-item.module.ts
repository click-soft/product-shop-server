import { Module } from '@nestjs/common';
import { ProductlogService } from '../productlog/services/productlog.service';
import { OrmModule } from 'src/orm.module';
import { PaymentItemResolver } from './resolvers/payment-item.resolver';
import { PaymentItemService } from './services/payment-item.service';
import { ProductService } from '../product/services/product.service';
import { CsService } from '../cs/services/cs.service';

@Module({
  imports: [OrmModule],
  providers: [
    PaymentItemResolver,
    PaymentItemService,
    ProductService,
    ProductlogService,
    CsService,
  ],
  exports: [PaymentItemService],
})
export class PaymentItemModule {}
