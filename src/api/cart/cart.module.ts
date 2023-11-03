import { Module } from '@nestjs/common';
import { JwtConfigModule } from '../jwt/jwt-config.module';
import CartResolver from './resolvers/cart.resolver';
import { ProductlogService } from '../productlog/services/productlog.service';
import { OrmModule } from 'src/orm.module';
import { CartService } from './services/cart.service';
import { ProductService } from '../product/services/product.service';
import { ProductListService } from '../product-list/services/product-list.service';
import { ProductListSubService } from '../product-list-sub/services/product-list-sub.service';
import { CsService } from '../cs/services/cs.service';
import { PaymentItemService } from '../payment-item/services/payment-item.service';

@Module({
  imports: [OrmModule, JwtConfigModule],
  providers: [
    CartService,
    CartResolver,
    ProductService,
    ProductListService,
    ProductListSubService,
    ProductlogService,
    PaymentItemService,
    CsService,
  ],
})
export class CartModule {}
