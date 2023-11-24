import { Injectable } from '@nestjs/common';
import GetProductListImageDto from '../dto/get-product-list-image.dto';
import { ProductListImageService } from 'src/api/product-list-image/services/product-list-image.service';

@Injectable()
export class ImagesService {
  constructor(private pliService: ProductListImageService) {}

  async getProductListImage(dto: GetProductListImageDto) {
    return await this.pliService.getImageBuffer(dto);
  }
}
