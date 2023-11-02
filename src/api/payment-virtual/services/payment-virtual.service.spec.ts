import { Test, TestingModule } from '@nestjs/testing';
import { PaymentVirtualService } from './payment-virtual.service';

describe('PaymentVirtualService', () => {
  let service: PaymentVirtualService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentVirtualService],
    }).compile();

    service = module.get<PaymentVirtualService>(PaymentVirtualService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
