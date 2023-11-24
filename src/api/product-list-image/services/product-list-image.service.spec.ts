import { Test, TestingModule } from '@nestjs/testing';
import { ProductListImageService } from './product-list-image.service';

describe('ProductListImageService', () => {
  let service: ProductListImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductListImageService],
    }).compile();

    service = module.get<ProductListImageService>(ProductListImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
