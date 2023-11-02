import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ProductLog from 'src/entities/cpm/productlog.entity';
import { Repository } from 'typeorm';
import Product from 'src/entities/cpm/product.entity';

type LogGubun = 'A' | 'U' | 'D';

@Injectable()
export class ProductlogService {
  constructor(
    @InjectRepository(ProductLog)
    private productlogRepository: Repository<ProductLog>,
  ) {}

  async save(product: Product, logGubun: LogGubun): Promise<ProductLog> {
    const productLog = ProductLog.create({
      ...product,
      logDatetime: new Date(),
      logGubun: logGubun,
      logUser: '[WEB]',
      logComputer: '[WEB]',
    });

    return await this.productlogRepository.save(productLog);
  }

  async saveAll(products: Product[], logGubun: LogGubun) {
    for (const product of products) {
      await this.save(product, logGubun);
    }
  }
}
