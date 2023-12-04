import { Query, Resolver } from '@nestjs/graphql';
import { ProductListWebBunryuService } from '../services/product-list-web-bunryu.service';
import ProductListWebBunryu from 'src/entities/cpm/product-list-web-bunryu.entity';

@Resolver(() => ProductListWebBunryu)
export class ProductListWebBunryuResolver {
  constructor(private readonly pwService: ProductListWebBunryuService) {}

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  @Query(() => [ProductListWebBunryu!]!)
  async getWebBunryus() {
    return await this.pwService.find();
  }
}
