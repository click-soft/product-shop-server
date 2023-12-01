import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from 'src/api/product/services/product.service';

@Injectable()
export default class CancelOrderPipe implements PipeTransform {
  constructor(private productService: ProductService) {}

  async transform(value: any, _: ArgumentMetadata) {
    const paymentId = parseInt(value.paymentId);
    const isValid = await this.productService.validCancelByPaymentId(paymentId);

    if (!isValid) {
      throw new BadRequestException(
        '발주가 완료 또는 운송장이 발행되어 취소할 수 없습니다.',
      );
    }
    return value;
  }
}
