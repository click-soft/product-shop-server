import { Module } from '@nestjs/common';
import { ProductlogService } from './services/productlog.service';
import { OrmModule } from 'src/orm.module';
import { CsService } from '../cs/services/cs.service';
import { ProductService } from '../product/services/product.service';
import { ProductlogResolver } from './resolvers/productlog.resolver';

@Module({
  imports: [OrmModule],
  providers: [ProductlogResolver, ProductlogService, ProductService, CsService],
  exports: [ProductlogService],
})
export class ProductlogModule {}
