import { Module } from '@nestjs/common';
import { PaymentVirtualService } from './services/payment-virtual.service';
import { OrmModule } from 'src/orm.module';

@Module({
  imports: [OrmModule],
  providers: [PaymentVirtualService],
  exports: [PaymentVirtualService],
})
export class PaymentVirtualModule {}
