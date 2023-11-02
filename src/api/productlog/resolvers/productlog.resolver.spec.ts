import { Test, TestingModule } from '@nestjs/testing';
import { ProductlogResolver } from './productlog.resolver';
import { ProductlogService } from '../services/productlog.service';

describe('ProductlogResolver', () => {
  let resolver: ProductlogResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductlogResolver, ProductlogService],
    }).compile();

    resolver = module.get<ProductlogResolver>(ProductlogResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
