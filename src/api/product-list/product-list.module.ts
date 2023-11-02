import { Module } from '@nestjs/common';
import { ProductListResolver } from './resolvers/product-list.resolver';
import { OrmModule } from 'src/orm.module';
import { ProductListService } from './services/product-list.service';

@Module({
  imports: [OrmModule],
  providers: [ProductListResolver, ProductListService],
  exports: [ProductListService],
})
export class ProductListModule {}
