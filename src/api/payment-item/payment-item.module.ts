import { Module } from '@nestjs/common';
import { PaymentItemService } from './payment-item.service';
import { PaymentItemResolver } from './payment-item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import { ProductService } from '../product/product.service';
import ProductLog from 'src/entities/cpm/productlog.entity';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import { ProductList } from 'src/entities/cpm/productlist.entity';
import Product from 'src/entities/cpm/product.entity';
import { Em } from 'src/entities/cpm/em.entity';
import { Cs } from 'src/entities/cpm/cs.entity';
import Payment from 'src/entities/cpm/payment.entity';
import { ProductlogService } from '../productlog/productlog.service';
import { CsService } from '../cs/cs.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Cs, Em, Product, ProductList, ProductListSub, Payment, PaymentItem, ProductLog
  ])],
  providers: [PaymentItemResolver, PaymentItemService, ProductService, ProductlogService, CsService],
  exports: [PaymentItemService],
})
export class PaymentItemModule { }
