import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Global API prefix — all routes live under /api/v1
  app.setGlobalPrefix('api/v1');

  // DTO validation — strips unknown fields and transforms payloads
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS for Next.js frontend
  app.enableCors({
    origin: config.get<string>('frontendUrl'),
    credentials: true,
  });

  const port = config.get<number>('port') ?? 3001;
  await app.listen(port);
  console.log(`School CRM API running on http://localhost:${port}/api/v1`);
}
bootstrap();
