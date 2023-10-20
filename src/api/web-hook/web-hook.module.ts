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
import { PaymentItemService } from '../payment-item/payment-item.service';
import ProductLog from 'src/entities/cpm/productlog.entity';
import { ProductlogService } from '../productlog/productlog.service';
import { CsService } from '../cs/cs.service';
import { Cs } from 'src/entities/cpm/cs.entity';
import { Em } from 'src/entities/cpm/em.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cs, Em, Payment, PaymentItem, Product, ProductList, ProductListSub, ProductLog])],
  controllers: [WebHookController],
  providers: [WebHookService, PaymentService, ProductService, PaymentItemService, ProductlogService, CsService]
})
export class WebHookModule { }
