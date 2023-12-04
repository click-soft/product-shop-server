import { Test, TestingModule } from '@nestjs/testing';
import { ProductListWebBunryuResolver } from './product-list-web-bunryu.resolver';
import { ProductListWebBunryuService } from '../services/product-list-web-bunryu.service';

describe('ProductListWebBunryuResolver', () => {
  let resolver: ProductListWebBunryuResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductListWebBunryuResolver, ProductListWebBunryuService],
    }).compile();

    resolver = module.get<ProductListWebBunryuResolver>(
      ProductListWebBunryuResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
