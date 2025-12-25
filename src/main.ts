import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { parse } from 'yamljs';
import { readFile } from 'fs/promises';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiYamlPath = join(process.cwd(), 'doc', 'api.yaml');
  const fileContents = await readFile(apiYamlPath, 'utf8');
  const swaggerDocument = parse(fileContents);
  SwaggerModule.setup('doc', app, swaggerDocument);

  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }),
  );
  await app.listen(4000);
}
bootstrap();
