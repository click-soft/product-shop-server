import { Test, TestingModule } from '@nestjs/testing';
import { ProductlogService } from './productlog.service';

describe('ProductlogService', () => {
  let service: ProductlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductlogService],
    }).compile();

    service = module.get<ProductlogService>(ProductlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
