import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySqlCpmConfigService } from './config/typeorm.config';
import { ProductModule } from './api/product/product.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CartModule } from './api/cart/cart.module';
import { JwtConfigModule } from './api/jwt/jwt-config.module';
import { PaymentModule } from './api/payment/payment.module';
import { WebHookModule } from './api/web-hook/web-hook.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AccountModule } from './api/account/account.module';

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
    ProductModule,
    UserModule,
    AuthModule,
    CartModule,
    JwtConfigModule,
    PaymentModule,
    WebHookModule,
    GraphqlModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
