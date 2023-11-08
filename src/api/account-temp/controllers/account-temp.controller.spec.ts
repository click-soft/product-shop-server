import { Test, TestingModule } from '@nestjs/testing';
import { AccountTempController } from './account-temp.controller';
import { AccountTempService } from '../services/account-temp.service';

describe('AccountTempController', () => {
  let controller: AccountTempController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountTempController],
      providers: [AccountTempService],
    }).compile();

    controller = module.get<AccountTempController>(AccountTempController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
