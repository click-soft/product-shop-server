import { Test, TestingModule } from '@nestjs/testing';
import { PaymentItemService } from './payment-item.service';

describe('PaymentItemService', () => {
  let service: PaymentItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentItemService],
    }).compile();

    service = module.get<PaymentItemService>(PaymentItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
