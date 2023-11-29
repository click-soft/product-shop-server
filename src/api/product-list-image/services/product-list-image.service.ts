import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductListImage from 'src/entities/cpm/product-list-image.entity';
import GetProductListImageDto from 'src/images/dto/get-product-list-image.dto';
import ZipUtil from 'src/util/zip.util';
import { Repository } from 'typeorm';
@Injectable()
export class ProductListImageService {
  constructor(
    @InjectRepository(ProductListImage)
    private pliRepository: Repository<ProductListImage>,
  ) {}

  async getImageBuffer({ jisa, smCode }: GetProductListImageDto) {
    let result: ProductListImage;
    try {
      result = await this.pliRepository.findOne({
        select: { smCode: true, image: true },
        where: { jisa, smCode },
      });

      if (!result) return;

      return await ZipUtil.compress(result.image);
    } catch (error) {
      return result?.image;
    }
  }
}
