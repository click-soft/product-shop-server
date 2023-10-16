import { Body, Controller, Get, Post } from '@nestjs/common';
import { WebHookService } from './web-hook.service';
import WebHookResult from 'src/interfaces/WebHookResult';

@Controller('api/web-hook')
export class WebHookController {
  constructor(private webHookService: WebHookService) { }

  @Get('/')
  async getIndex() {

  }

  @Post('/')
  async postWebHook(@Body() body) {
    await this.webHookService.checkoutVirtualAccount(body)

    return body;
  }
}

