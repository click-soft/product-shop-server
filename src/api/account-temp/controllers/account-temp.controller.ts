import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountTempService } from '../services/account-temp.service';
import CreateLogintokenDto from '../dto/create-login-token.dto';
import LoginDto from '../dto/login.dto';
import TokenResult from 'src/api/auth/types/token-result';

@Controller('api/account-temp')
export class AccountTempController {
  constructor(private readonly accountTempService: AccountTempService) {}

  @Post('/l-token')
  async createLoginToken(
    @Body() createLogintokenDto: CreateLogintokenDto,
  ): Promise<string> {
    return await this.accountTempService.createLoginToken(createLogintokenDto);
  }

  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<TokenResult> {
    return await this.accountTempService.login(dto);
  }
}
