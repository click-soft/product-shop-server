import { Module } from '@nestjs/common';
import { ImagesController } from './controllers/images.controller';
import { ImagesService } from './services/images.service';
import { OrmModule } from 'src/orm.module';
import { ProductListImageService } from 'src/api/product-list-image/services/product-list-image.service';

@Module({
  imports: [OrmModule],
  controllers: [ImagesController],
  providers: [ImagesService, ProductListImageService],
})
export class ImagesModule {}
