import { Test, TestingModule } from '@nestjs/testing';
import { ProductListImageResolver } from './product-list-image.resolver';

describe('ProductListImageResolver', () => {
  let resolver: ProductListImageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductListImageResolver],
    }).compile();

    resolver = module.get<ProductListImageResolver>(ProductListImageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
