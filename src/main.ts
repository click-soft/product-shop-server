import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const messages = errors
          .map((error) => Object.values(error.constraints))
          .join('\n');
        return new BadRequestException(messages);
      },
    }),
  );
  app.enableCors({
    // origin: true,
    origin: [
      'http://localhost:3001',
      'https://localhost:3001',
      'http://test.localhost:3001',
      'https://test.localhost:3001',
      'https://www.click-soft.shop',
      'https://a.click-soft.shop',
      'https://t.click-soft.shop',
      'https://www.test.click-soft.shop',
      'http://192.168.45.138:3001',
      'http://www.192.168.45.138:3001',
    ], // 허용할 출처
    credentials: true,
    exposedHeaders: ['X-Is-Test'],
  });

  app.use('/images', express.static('src/public/images'));

  await app.listen(3000);
}
bootstrap();
