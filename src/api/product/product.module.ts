import { Module } from '@nestjs/common';
import ProductResolver from './resolvers/product.resolver';
import { ProductlogService } from '../productlog/services/productlog.service';
import { JwtService } from '@nestjs/jwt';
import { OrmModule } from 'src/orm.module';
import { ProductService } from './services/product.service';
import { ProductListService } from '../product-list/services/product-list.service';
import { ProductListSubService } from '../product-list-sub/services/product-list-sub.service';
import { CsService } from '../cs/services/cs.service';

@Module({
  imports: [OrmModule],
  providers: [
    ProductResolver,
    ProductService,
    ProductListService,
    ProductListSubService,
    ProductlogService,
    CsService,
    JwtService,
  ],
  exports: [ProductService],
})
export class ProductModule {}
