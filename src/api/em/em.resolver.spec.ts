import { Test, TestingModule } from '@nestjs/testing';
import { EmResolver } from './em.resolver';
import { EmService } from './em.service';

describe('EmResolver', () => {
  let resolver: EmResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmResolver, EmService],
    }).compile();

    resolver = module.get<EmResolver>(EmResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
