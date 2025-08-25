import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // The `bufferLogs: true` option is important. It tells Nest to buffer all
  // log messages until a custom logger is attached, at which point it will
  // flush the buffer to your logger.
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  //app logger pino
  app.useLogger(app.get(Logger));
  //global validation
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
