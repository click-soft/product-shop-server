import { Module } from '@nestjs/common';
import { ProductListImageService } from './services/product-list-image.service';
import { ProductListImageResolver } from './resolvers/product-list-image.resolver';
import { OrmModule } from 'src/orm.module';

@Module({
  imports: [OrmModule],
  providers: [ProductListImageService, ProductListImageResolver],
  exports: [ProductListImageService],
})
export class ProductListImageModule {}
