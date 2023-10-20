import { Injectable } from '@nestjs/common';
import { DeleteResult, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import Product from 'src/entities/cpm/product.entity';
import Payment from 'src/entities/cpm/payment.entity';
import * as moment from 'moment';
import { ProductlogService } from '../productlog/productlog.service';
import GetAdminProductsArgs from './dto/getAdminProducts.args';
import { CsService } from '../cs/cs.service';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productLogService: ProductlogService,
    private csService: CsService,
  ) { }

  async saveProductByPayment(payment: Payment, paymentItems: PaymentItem[]) {
    const products = paymentItems.map(item => {
      return Product.create({
        clCode: item.code,
        csCode: payment.ykiho,
        ctTel: "",
        count: item.quantity,
        receive: '000',
        receiveYmd: moment(payment.requestedAt).format("YYYYMMDD"),
        sell: '0',
        check: '0',
        check2: '1',
        web: true,
        webPaymentItemId: item.id,
      });
    });

    await this.productRepository.save(products);
    await this.productLogService.saveAll(products, 'A');
  }

  async delete(...ids: number[]): Promise<DeleteResult> {
    const products = await this.productRepository.find({ where: { auto: In(ids) } })
    this.productLogService.saveAll(products, 'D');
    return await this.productRepository.delete(ids);
  }

  async deleteByPaymentItemId(...ids: number[]) {
    const result = await this.productRepository.find({ where: { webPaymentItemId: In(ids) } });

    const autos = result.map<number>(pd => {
      return pd.auto
    });

    if (autos) {
      await this.delete(...autos);
    }
  }

  async getById(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { auto: id } })
  }

  async find({ startYmd, endYmd, emCode }: GetAdminProductsArgs): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder()
      .where('pd_receiveymd >= :startYmd AND pd_receiveymd <= :endYmd', { startYmd, endYmd })

    if (emCode) {
      const ykihos: string[] = await this.csService.getYkihosByEmCode(emCode);
      query.andWhere("pd_cscode IN (:...ykihos)", { ykihos })
    }

    query.orderBy("pd_createdt", 'DESC');

    return await query.getMany();
  }
}
