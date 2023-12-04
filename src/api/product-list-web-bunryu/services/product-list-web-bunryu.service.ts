import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductListWebBunryu from 'src/entities/cpm/product-list-web-bunryu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductListWebBunryuService {
  constructor(
    @InjectRepository(ProductListWebBunryu)
    private pwRepository: Repository<ProductListWebBunryu>,
  ) {}

  async find() {
    return await this.pwRepository.find({
      order: {
        code: 'ASC',
      },
    });
  }
}
