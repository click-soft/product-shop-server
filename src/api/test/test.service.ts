import { Injectable } from '@nestjs/common';
import { CreateTestInput } from './dto/create-test.input';
import { UpdateTestInput } from './dto/update-test.input';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  create(createTestInput: CreateTestInput): Test {
    return {
      exampleField: `createTestInput ${createTestInput.exampleField}`,
    };
  }

  findAll() {
    return `This action returns all test`;
  }

  findOne(id: number): Test {
    return {
      exampleField: `This action returns a #${id} test`,
    };
  }

  update(id: number, updateTestInput: UpdateTestInput) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
