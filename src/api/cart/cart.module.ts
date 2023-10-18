import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cpm/cart.entity';
import { CartItem } from 'src/entities/cpm/cart-item.entity';
import { JwtConfigModule } from '../jwt/jwt-config.module';
import { ProductService } from '../product/product.service';
import { ProductListSub } from 'src/entities/cpm/productlistsub.entity';
import { ProductList } from 'src/entities/cpm/productlist.entity';
import CartResolver from './cart.resolver';
import Product from 'src/entities/cpm/product.entity';
import { ProductListService } from '../product-list/product-list.service';
import { ProductListSubService } from '../product-list-sub/product-list-sub.service';
import { ProductlogService } from '../productlog/productlog.service';
import ProductLog from 'src/entities/cpm/productlog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Product, ProductList, ProductListSub, ProductLog]),
    JwtConfigModule
  ],
  providers: [CartService, CartResolver, ProductService, ProductListService, ProductListSubService, ProductlogService],
})
export class CartModule { }
