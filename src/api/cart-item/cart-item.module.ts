import { Module } from '@nestjs/common';
import { CartItemService } from './services/cart-item.service';
import { OrmModule } from 'src/orm.module';
import CartItemResolver from './resolvers/cart-item.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [OrmModule],
  providers: [CartItemService, CartItemResolver, JwtService],
  exports: [CartItemService],
})
export class CartItemModule {}
