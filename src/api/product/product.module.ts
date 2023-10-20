import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductList } from '../../entities/cpm/productlist.entity';
import { ProductListSub } from '../../entities/cpm/productlistsub.entity';
import ProductResolver from './product.resolver';
import Product from 'src/entities/cpm/product.entity';
import Payment from 'src/entities/cpm/payment.entity';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import { ProductListService } from '../product-list/product-list.service';
import { ProductListSubService } from '../product-list-sub/product-list-sub.service';
import ProductLog from 'src/entities/cpm/productlog.entity';
import { ProductlogService } from '../productlog/productlog.service';
import { Cs } from 'src/entities/cpm/cs.entity';
import { CsService } from '../cs/cs.service';
import { JwtService } from '@nestjs/jwt';
import { Em } from 'src/entities/cpm/em.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cs, Em, Product, ProductList, ProductListSub, Payment, PaymentItem, ProductLog
    ])
  ],
  providers: [
    ProductResolver, ProductService,
    ProductListService, ProductListSubService,
    ProductlogService, CsService, JwtService
  ],
  exports: [ProductService],
})
export class ProductModule { }
