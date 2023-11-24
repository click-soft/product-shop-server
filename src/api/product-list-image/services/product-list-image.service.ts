import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { createReadStream } from 'fs';
import ProductListImage from 'src/entities/cpm/product-list-image.entity';
import GetProductListImageDto from 'src/images/dto/get-product-list-image.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductListImageService {
  constructor(
    @InjectRepository(ProductListImage)
    private pliRepository: Repository<ProductListImage>,
  ) {}

  async getImageBuffer({ jisa, smCode }: GetProductListImageDto) {
    try {
      const result = await this.pliRepository.findOne({
        select: { image: true },
        where: { jisa, smCode },
      });

      return result?.image;
    } catch (error) {
      log(error);
    }
  }
}
