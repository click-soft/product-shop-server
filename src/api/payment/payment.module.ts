import { Module } from '@nestjs/common';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Payment from 'src/entities/cpm/payment.entity';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtConfigModule } from '../jwt/jwt-config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, PaymentItem]),
    JwtConfigModule
  ],
  providers: [PaymentResolver, PaymentService],
  exports: [PaymentService]
})
export class PaymentModule { }
