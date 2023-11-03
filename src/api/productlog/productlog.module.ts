import { Module } from '@nestjs/common';
import { ProductlogService } from './services/productlog.service';
import { OrmModule } from 'src/orm.module';
import { CsService } from '../cs/services/cs.service';
import { ProductService } from '../product/services/product.service';
import { ProductlogResolver } from './resolvers/productlog.resolver';
import { PaymentItemService } from '../payment-item/services/payment-item.service';

@Module({
  imports: [OrmModule],
  providers: [
    ProductlogResolver,
    ProductlogService,
    ProductService,
    CsService,
    PaymentItemService,
  ],
  exports: [ProductlogService],
})
export class ProductlogModule {}
