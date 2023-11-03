import { Test, TestingModule } from '@nestjs/testing';
import { PaymentRefundService } from './payment-refund.service';

describe('PaymentRefundService', () => {
  let service: PaymentRefundService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentRefundService],
    }).compile();

    service = module.get<PaymentRefundService>(PaymentRefundService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
