import { Module } from '@nestjs/common';
import { ProductListService } from './product-list.service';
import { ProductListResolver } from './product-list.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductList } from 'src/entities/cpm/productlist.entity';
import Product from 'src/entities/cpm/product.entity';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductList, ProductListSub])],
  providers: [ProductListResolver, ProductListService],
  exports: [ProductListService],
})
export class ProductListModule { }
