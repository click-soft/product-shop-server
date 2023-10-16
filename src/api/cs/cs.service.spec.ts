import { Test, TestingModule } from '@nestjs/testing';
import { CsService } from './cs.service';

describe('UserService', () => {
  let service: CsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsService],
    }).compile();

    service = module.get<CsService>(CsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
