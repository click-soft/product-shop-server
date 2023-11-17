import { Controller, Get } from '@nestjs/common';

@Controller('api/test')
export class TestController {
  @Get('/')
  getIndex() {
    return { data: 'test123' };
  }
}
