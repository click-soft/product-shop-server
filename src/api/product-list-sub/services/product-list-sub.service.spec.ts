import { Test, TestingModule } from '@nestjs/testing';
import { ProductListSubService } from './product-list-sub.service';

describe('ProductListSubService', () => {
  let service: ProductListSubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductListSubService],
    }).compile();

    service = module.get<ProductListSubService>(ProductListSubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
