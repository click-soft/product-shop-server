import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlCpmConfigService } from './config/typeorm.config';
import { ProductModule } from './api/product/product.module';
import { CsModule } from './api/cs/cs.module';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './api/cart/cart.module';
import { JwtConfigModule } from './api/jwt/jwt-config.module';
import { PaymentModule } from './api/payment/payment.module';
import { WebHookModule } from './api/web-hook/web-hook.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AccountModule } from './api/account/account.module';
import { ProductListSubModule } from './api/product-list-sub/product-list-sub.module';
import { ProductListModule } from './api/product-list/product-list.module';
import { PaymentItemModule } from './api/payment-item/payment-item.module';
import { ProductlogModule } from './api/productlog/productlog.module';
import { EmModule } from './api/em/em.module';
import { SocketIoModule } from './socket.io/socket.io.module';
import { PaymentVirtualModule } from './api/payment-virtual/payment-virtual.module';
import { PaymentRefundModule } from './api/payment-refund/payment-refund.module';
import { AccountTempModule } from './api/account-temp/account-temp.module';
import { CartItemModule } from './api/cart-item/cart-item.module';
import { ProductListImageModule } from './api/product-list-image/product-list-image.module';
import { ImagesModule } from './images/images.module';
import { TestModule } from './api/test/test.module';
import { Test2Module } from './api/test2/test2.module';
import { KorDateTimeMiddleware } from './middleware/kor-date-time.middleware';
import { ProductListWebBunryuModule } from './api/product-list-web-bunryu/product-list-web-bunryu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: MySqlCpmConfigService,
      inject: [MySqlCpmConfigService],
    }),
    GraphqlModule,
    CsModule,
    AuthModule,
    CartModule,
    JwtConfigModule,
    PaymentModule,
    WebHookModule,
    GraphqlModule,
    AccountModule,
    ProductModule,
    ProductListModule,
    ProductListSubModule,
    PaymentItemModule,
    ProductlogModule,
    EmModule,
    SocketIoModule,
    PaymentVirtualModule,
    PaymentRefundModule,
    AccountTempModule,
    CartItemModule,
    ProductListImageModule,
    ImagesModule,
    TestModule,
    Test2Module,
    ProductListWebBunryuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(KorDateTimeMiddleware).forRoutes('*');
  // }
}
