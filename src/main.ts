import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 미들웨어와 비슷함.
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true, // 데코레이터가 없는 속성은 제거되어 저장됨.
    forbidNonWhitelisted: true, //기본적으로 필요하지 않는 필드는 무시하지만 클라이언트에게 경고를 반환
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
