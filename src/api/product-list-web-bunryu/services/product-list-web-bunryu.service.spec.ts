import { Test, TestingModule } from '@nestjs/testing';
import { ProductListWebBunryuService } from './product-list-web-bunryu.service';

describe('ProductListWebBunryuService', () => {
  let service: ProductListWebBunryuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductListWebBunryuService],
    }).compile();

    service = module.get<ProductListWebBunryuService>(ProductListWebBunryuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
