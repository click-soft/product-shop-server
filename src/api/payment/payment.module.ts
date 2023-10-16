import { Module } from '@nestjs/common';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Payment from 'src/entities/cpm/payment.entity';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtConfigModule } from '../jwt/jwt-config.module';
import { ProductService } from '../product/product.service';
import Product from 'src/entities/cpm/product.entity';
import { ProductList } from 'src/entities/cpm/productlist.entity';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentItem, Product, ProductList, ProductListSub]),
    JwtConfigModule
  ],
  providers: [PaymentResolver, PaymentService, ProductService],
  exports: [PaymentService]
})
export class PaymentModule { }
