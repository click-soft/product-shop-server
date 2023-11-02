import { Test, TestingModule } from '@nestjs/testing';
import { CsResolver } from './cs.resolver';

describe('UserResolver', () => {
  let resolver: CsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsResolver],
    }).compile();

    resolver = module.get<CsResolver>(CsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
