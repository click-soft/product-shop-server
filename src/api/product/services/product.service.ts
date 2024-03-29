import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import PaymentItem from 'src/entities/cpm/payment-item.entity';
import Product from 'src/entities/cpm/product.entity';
import Payment from 'src/entities/cpm/payment.entity';
import * as dayjs from 'dayjs';
import { ProductlogService } from 'src/api/productlog/services/productlog.service';
import { CsService } from 'src/api/cs/services/cs.service';
import ProductsWithPage from '../types/products-with-page';
import GetAdminProductsArgs from '../dto/get-admin-products.args';
import { UpdateProductArgs } from '../dto/update-product.args';
import { PaymentItemService } from 'src/api/payment-item/services/payment-item.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private productLogService: ProductlogService,
    private paymentItemService: PaymentItemService,
    private csService: CsService,
  ) {}

  async saveProductByPayment(payment: Payment, paymentItems: PaymentItem[]) {
    const products = paymentItems.map((item) => {
      return Product.create({
        clCode: item.code,
        csCode: payment.ykiho,
        ctTel: '',
        count: item.quantity,
        receive: '000',
        receiveYmd: dayjs(payment.requestedAt).format('YYYYMMDD'),
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
    try {
      const products = await this.productRepository.find({
        where: { auto: In(ids) },
      });
      this.productLogService.saveAll(products, 'D');
      return await this.productRepository.delete(ids);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(args: UpdateProductArgs): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { auto: args.auto },
    });
    if (!product) {
      throw new HttpException(
        '해당 데이터를 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    let isUpdateDataExists = false;

    function isDataChange(newValue, oldValue) {
      const change = (newValue === '' || newValue) && newValue != oldValue;
      if (change) {
        isUpdateDataExists = true;
      }
      return change;
    }

    if (isDataChange(args.orderCheck, product.orderCheck))
      product.orderCheck = args.orderCheck;
    if (isDataChange(args.seller, product.seller)) product.seller = args.seller;

    if (!isUpdateDataExists) {
      throw new HttpException(
        '변경할 데이터가 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.productRepository.save(product);
    this.productLogService.save(product, 'U');
    return product;
  }

  async deleteByPaymentItemId(...ids: number[]) {
    const result = await this.productRepository.find({
      where: { webPaymentItemId: In(ids) },
    });

    const autos = result.map<number>((pd) => {
      return pd.auto;
    });

    if (autos) {
      await this.delete(...autos);
    }
  }

  async getById(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { auto: id } });
  }

  async getByWebPaymentItemId(paymentItemId: number): Promise<Product> {
    return this.productRepository.findOne({
      where: { webPaymentItemId: paymentItemId },
    });
  }

  async find({
    startYmd,
    endYmd,
    emCode,
    csMyung,
    page,
  }: GetAdminProductsArgs): Promise<ProductsWithPage> {
    const dispCount = 6;
    const query = this.productRepository
      .createQueryBuilder()
      .where('pd_receiveymd >= :startYmd AND pd_receiveymd <= :endYmd', {
        startYmd,
        endYmd,
      });

    async function addYkihosQuery(
      code: string,
      getYkihos: (emCode: string) => Promise<string[]>,
    ): Promise<boolean> {
      if (!code) return true;
      const ykihos = await getYkihos(code);
      if (ykihos.length === 0) return false;
      query.andWhere('pd_cscode IN (:...ykihos)', { ykihos });
      return true;
    }

    if (
      !(await addYkihosQuery(
        emCode,
        this.csService.getYkihosByEmCode.bind(this.csService),
      )) ||
      !(await addYkihosQuery(
        csMyung,
        this.csService.getYkihosByMyung.bind(this.csService),
      ))
    ) {
      return {
        page: 0,
        isLast: true,
        products: [],
      };
    }

    query.orderBy('pd_createdt', 'DESC');

    const result = await query
      .skip(dispCount * (page - 1))
      .take(dispCount)
      .getMany();

    return {
      page,
      isLast: result.length < dispCount,
      products: result,
    };
  }

  async validCancelByPaymentId(paymentId: number) {
    const ids = await this.paymentItemService.getPaymentItemIds(paymentId);

    if (!ids) return true;

    const products = await this.productRepository.find({
      where: {
        webPaymentItemId: In(ids),
      },
    });

    let isOrdered = products.some((p) => p.etc1?.startsWith('1'));
    if (!isOrdered) {
      isOrdered = products.some(
        (p) => p.orderCheck === '0' && p.bigo?.trim() !== '',
      );
    }

    return !isOrdered;
  }
}
