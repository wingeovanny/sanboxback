import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('SandBoxApp');
  console.log(envs);
  const app = await NestFactory.create(AppModule);
  logger.log(`Microservices Sandbox running on port : ${envs.port}`);
  await app.listen(envs.port);
}
bootstrap();
