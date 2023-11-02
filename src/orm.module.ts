import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cs } from './entities/cpm/cs.entity';
import { Em } from './entities/cpm/em.entity';
import { CartItem } from './entities/cpm/cart-item.entity';
import Product from './entities/cpm/product.entity';
import { ProductList } from './entities/cpm/productlist.entity';
import { ProductListSub } from './entities/cpm/productlistsub.entity';
import ProductLog from './entities/cpm/productlog.entity';
import Payment from './entities/cpm/payment.entity';
import PaymentItem from './entities/cpm/payment-item.entity';
import { Account } from './entities/cpm/account.entity';
import { Cart } from './entities/cpm/cart.entity';
import PaymentVirtual from './entities/cpm/payment-virtual.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      Cs,
      Cart,
      CartItem,
      Em,
      Product,
      ProductLog,
      ProductList,
      ProductListSub,
      Payment,
      PaymentItem,
      PaymentVirtual,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class OrmModule {}
