import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function koDateFormat(date?: dayjs.ConfigType, template?: string) {
  return dayjs(date).tz('Asia/Seoul').format(template);
}
