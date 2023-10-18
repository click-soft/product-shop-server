import { Test, TestingModule } from '@nestjs/testing';
import { PaymentItemResolver } from './payment-item.resolver';
import { PaymentItemService } from './payment-item.service';

describe('PaymentItemResolver', () => {
  let resolver: PaymentItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentItemResolver, PaymentItemService],
    }).compile();

    resolver = module.get<PaymentItemResolver>(PaymentItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
