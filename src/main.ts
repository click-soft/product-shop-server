import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3001', 'https://localhost:3001', "https://web-product-shop-client-euegqv2blndv3jgq.sel5.cloudtype.app/login"], // 허용할 출처    
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
