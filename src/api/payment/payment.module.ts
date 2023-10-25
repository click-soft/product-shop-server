import { Module } from '@nestjs/common';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Payment from 'src/entities/cpm/payment.entity';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import { JwtConfigModule } from '../jwt/jwt-config.module';
import Product from 'src/entities/cpm/product.entity';
import { ProductList } from 'src/entities/cpm/productlist.entity';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import { ProductListService } from '../product-list/product-list.service';
import { ProductService } from '../product/product.service';
import { PaymentItemService } from '../payment-item/payment-item.service';
import { ProductlogService } from '../productlog/productlog.service';
import ProductLog from 'src/entities/cpm/productlog.entity';
import { CsService } from '../cs/cs.service';
import { Cs } from 'src/entities/cpm/cs.entity';
import { OrdersGateway } from 'src/socket.io/orders.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cs, Payment, PaymentItem, Product, ProductList, ProductListSub, ProductLog]),
    JwtConfigModule
  ],
  providers: [PaymentResolver, PaymentService, ProductListService, ProductService, PaymentItemService, ProductlogService, CsService, OrdersGateway],
  exports: [PaymentService],
})
export class PaymentModule { }
