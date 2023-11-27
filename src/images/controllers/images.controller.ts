import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImagesService } from '../services/images.service';
import GetProductListImageDto from '../dto/get-product-list-image.dto';
import { Response } from 'express';
import * as path from 'path';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('productlist_image/:jisa/:smCode')
  async getProductListImage(
    @Param() dto: GetProductListImageDto,
    @Res() res: Response,
  ) {
    const buffer = await this.imagesService.getProductListImage(dto);

    if (buffer) {
      res.setHeader('Content-Type', 'image/png');
      res.send(buffer);
    } else {
      const imagePath = path.join(
        process.cwd(),
        'src',
        'public',
        'images',
        'no-image.png',
      );
      res.sendFile(imagePath);
    }
  }
}
