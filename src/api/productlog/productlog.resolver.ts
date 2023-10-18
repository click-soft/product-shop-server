import { Resolver } from '@nestjs/graphql';
import { ProductlogService } from './productlog.service';

@Resolver()
export class ProductlogResolver {
  constructor(private readonly productlogService: ProductlogService) {}
}
