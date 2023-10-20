import { Module } from '@nestjs/common';
import { ProductlogService } from './productlog.service';
import { ProductlogResolver } from './productlog.resolver';
import { ProductService } from '../product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from 'src/entities/cpm/product.entity';
import { ProductList } from 'src/entities/cpm/productlist.entity';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import ProductLog from 'src/entities/cpm/productlog.entity';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import Payment from 'src/entities/cpm/payment.entity';
import { CsService } from '../cs/cs.service';
import { Em } from 'src/entities/cpm/em.entity';
import { Cs } from 'src/entities/cpm/cs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cs, Em ,Product, ProductList, ProductListSub, Payment, PaymentItem, ProductLog])],
  providers: [ProductlogResolver, ProductlogService, ProductService, CsService],
  exports: [ProductlogService]
})
export class ProductlogModule { }
