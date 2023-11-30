import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Test2Service } from './test2.service';
import { CreateTest2Dto } from './dto/create-test2.dto';
import { UpdateTest2Dto } from './dto/update-test2.dto';

@Controller('api/test2')
export class Test2Controller {
  constructor(private readonly test2Service: Test2Service) {}

  @Post()
  create(@Body() createTest2Dto: CreateTest2Dto) {
    throw new HttpException('aa', HttpStatus.INTERNAL_SERVER_ERROR);

    return this.test2Service.create(createTest2Dto);
  }

  @Get()
  findAll() {
    throw new HttpException('aa', HttpStatus.INTERNAL_SERVER_ERROR);
    return this.test2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.test2Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTest2Dto: UpdateTest2Dto) {
    return this.test2Service.update(+id, updateTest2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.test2Service.remove(+id);
  }
}
