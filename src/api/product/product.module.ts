import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductList } from '../../entities/cpm/productlist.entity';
import { ProductListSub } from '../../entities/cpm/productlistsub.entity';
import ProductResolver from './product.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductList, ProductListSub])
  ],
  providers: [ProductService, ProductResolver],
  exports : [ProductService],
})
export class ProductModule { }
