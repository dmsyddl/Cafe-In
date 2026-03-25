import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // DTO에 정의되지 않은 필드 자동 제거
    forbidNonWhitelisted: true,   // 정의되지 않은 필드가 오면 에러
    transform: true,              // URL 파라미터 등 자동 타입 변환
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
