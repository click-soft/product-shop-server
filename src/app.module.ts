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
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PaymentModule } from './api/payment/payment.module';
import { WebHookModule } from './api/web-hook/web-hook.module';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    ProductModule,
    UserModule,
    AuthModule,
    CartModule,
    JwtConfigModule,
    PaymentModule,
    WebHookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
