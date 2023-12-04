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

  private transformDates(obj: any): any {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (this.isISO8601DateTime(obj[key])) {
          obj[key] = dayjs(obj[key]).tz('Asia/Seoul').format();
        } else if (typeof obj[key] === 'object') {
          obj[key] = this.transformDates(obj[key]);
        }
      }
    }
    return obj;
  }
}
