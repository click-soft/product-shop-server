import { Test, TestingModule } from '@nestjs/testing';
import { EmService } from './em.service';

describe('EmService', () => {
  let service: EmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmService],
    }).compile();

    service = module.get<EmService>(EmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
