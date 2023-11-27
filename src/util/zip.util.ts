import { promisify } from 'util';
import * as zlib from 'zlib';

export default class ZipUtil {
  static async compress(buffer: Buffer) {
    const gunzipAsync = promisify(zlib.gunzip);
    return await gunzipAsync(buffer);
  }
}
