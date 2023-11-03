import { Module } from '@nestjs/common';
import { PaymentRefundService } from './services/payment-refund.service';
import { OrmModule } from 'src/orm.module';

@Module({
  imports: [OrmModule],
  providers: [PaymentRefundService],
  exports: [PaymentRefundService],
})
export class PaymentRefundModule {}
