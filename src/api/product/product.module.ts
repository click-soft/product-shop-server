import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductList } from '../../entities/cpm/productlist.entity';
import { ProductListSub } from '../../entities/cpm/productlistsub.entity';
import ProductResolver from './product.resolver';
import Product from 'src/entities/cpm/product.entity';
import Payment from 'src/entities/cpm/payment.entity';
import PaymentItem from 'src/entities/cpm/payment-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductList, ProductListSub, Payment, PaymentItem])
  ],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule { }
