import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      let messages = errors.map(error => Object.values(error.constraints)).join('\n');
      return new BadRequestException(messages);
    },
  }));
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://localhost:3001',
      'http://test.localhost:3001',
      'https://test.localhost:3001',
      "https://www.click-soft.shop",
      "https://www.test.click-soft.shop"], // 허용할 출처    
    credentials: true,
    exposedHeaders: ['X-Is-Test'],
  });

  await app.listen(3000);
}
bootstrap();
