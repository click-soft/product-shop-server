import { Module } from '@nestjs/common';
import { WebHookController } from './web-hook.controller';
import { WebHookService } from './web-hook.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Payment from 'src/entities/cpm/payment.entity';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import { PaymentService } from '../payment/payment.service';
import { ProductService } from '../product/product.service';
import Product from 'src/entities/cpm/product.entity';
import { ProductList } from 'src/entities/cpm/productlist.entity';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, PaymentItem, Product, ProductList, ProductListSub])],
  controllers: [WebHookController],
  providers: [WebHookService, PaymentService, ProductService]
})
export class WebHookModule { }
