import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { Logger, ValidationPipe } from '@nestjs/common';
import { METHODS } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  //configuración para el front end
  app.enableCors({
    origin: true,
    METHODS: ['GET','POST','PUT','PATCH','DELETE'],
    Credential: true,
    allwedHeaders: 'Content-Type, Accept, Authorization'
  });
  
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted:true
    })
  );
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`La aplicación esta correindo en: ${await app.getUrl()}`)
}
await bootstrap();
