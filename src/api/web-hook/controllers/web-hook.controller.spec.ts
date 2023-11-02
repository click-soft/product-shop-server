import { Test, TestingModule } from '@nestjs/testing';
import { WebHookController } from './web-hook.controller';

describe('WebHookController', () => {
  let controller: WebHookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebHookController],
    }).compile();

    controller = module.get<WebHookController>(WebHookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
