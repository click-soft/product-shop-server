import { Test, TestingModule } from '@nestjs/testing';
import { AccountTempService } from './account-temp.service';

describe('AccountTempService', () => {
  let service: AccountTempService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountTempService],
    }).compile();

    service = module.get<AccountTempService>(AccountTempService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
