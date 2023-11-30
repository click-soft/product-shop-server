import { Injectable, NestMiddleware } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { NextFunction } from 'express';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class KorDateTimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body) {
      this.transformDates(req.body);
    }
    next();
  }

  private isISO8601DateTime(value) {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return iso8601Regex.test(value);
  }

  private isDateConvertible(value) {
    console.log(value);

    if (value instanceof Date) {
      return true;
    }
    return false;
    // Date 생성자를 사용하여 변환을 시도

    // isNaN 함수를 사용하여 유효한 날짜인지 확인
    // (유효한 날짜가 아니면 NaN을 반환)
    // return !isNaN(convertedDate.getTime());
  }

  private transformDates(obj: any): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (this.isISO8601DateTime(obj[key])) {
          console.log('first', obj[key]);

          obj[key] = dayjs(obj[key]).tz('Asia/Seoul').toISOString();

          console.log('last', obj[key]);
        } else if (typeof obj[key] === 'object') {
          obj[key] = this.transformDates(obj[key]);
        }
      }
    }
    return obj;
  }
}
