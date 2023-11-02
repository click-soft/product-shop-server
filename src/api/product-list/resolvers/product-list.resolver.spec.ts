import { Test, TestingModule } from '@nestjs/testing';
import { ProductListResolver } from './product-list.resolver';
import { ProductListService } from './product-list.service';

describe('ProductListResolver', () => {
  let resolver: ProductListResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductListResolver, ProductListService],
    }).compile();

    resolver = module.get<ProductListResolver>(ProductListResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
