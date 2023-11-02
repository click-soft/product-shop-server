import { Test, TestingModule } from '@nestjs/testing';
import { ProductListSubResolver } from './product-list-sub.resolver';
import { ProductListSubService } from '../services/product-list-sub.service';

describe('ProductListSubResolver', () => {
  let resolver: ProductListSubResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductListSubResolver, ProductListSubService],
    }).compile();

    resolver = module.get<ProductListSubResolver>(ProductListSubResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
