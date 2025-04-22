import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://weddinganienver.vercel.app',
    methods: 'GET,POST,PUT,DELETE',
  });
  await app.listen(process.env.PORT ?? (process.env.PORT || ''));
}
bootstrap();
