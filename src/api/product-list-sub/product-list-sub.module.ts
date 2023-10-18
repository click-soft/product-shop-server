import { Module } from '@nestjs/common';
import { ProductListSubService } from './product-list-sub.service';
import { ProductListSubResolver } from './product-list-sub.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductList } from 'src/entities/cpm/productlist.entity';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import Product from 'src/entities/cpm/product.entity';
import { ProductListService } from '../product-list/product-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductList, ProductListSub])],
  providers: [ProductListSubResolver, ProductListService, ProductListSubService],
  exports: [ProductListSubService]
})
export class ProductListSubModule { }
