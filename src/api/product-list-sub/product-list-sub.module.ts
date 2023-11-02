import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm.module';
import { ProductListSubResolver } from './resolvers/product-list-sub.resolver';
import { ProductListService } from '../product-list/services/product-list.service';
import { ProductListSubService } from './services/product-list-sub.service';

@Module({
  imports: [OrmModule],
  providers: [
    ProductListSubResolver,
    ProductListService,
    ProductListSubService,
  ],
  exports: [ProductListSubService],
})
export class ProductListSubModule {}
