import { Module } from '@nestjs/common';
import { PaymentItemService } from './payment-item.service';
import { PaymentItemResolver } from './payment-item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import PaymentItem from 'src/entities/cpm/payment-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentItem])],
  providers: [PaymentItemResolver, PaymentItemService],
  exports: [PaymentItemService],
})
export class PaymentItemModule { }
