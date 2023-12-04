import { Module } from '@nestjs/common';
import { ProductListWebBunryuService } from './services/product-list-web-bunryu.service';
import { ProductListWebBunryuResolver } from './resolvers/product-list-web-bunryu.resolver';
import { OrmModule } from 'src/orm.module';

@Module({
  imports: [OrmModule],
  providers: [ProductListWebBunryuResolver, ProductListWebBunryuService],
})
export class ProductListWebBunryuModule {}
