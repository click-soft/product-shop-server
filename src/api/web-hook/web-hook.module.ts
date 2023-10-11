import { Module } from '@nestjs/common';
import { WebHookController } from './web-hook.controller';
import { WebHookService } from './web-hook.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Payment from 'src/entities/cpm/payment.entity';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import { PaymentService } from '../payment/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, PaymentItem])],
  controllers: [WebHookController],
  providers: [WebHookService, PaymentService]
})
export class WebHookModule { }
