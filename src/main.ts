import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Debug: check env before anything loads
  console.log('=== ENV DEBUG ===');
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  console.log('PORT:', process.env.PORT);
  console.log('=================');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors();
  setupSwagger(app);

  await app.listen(process.env.PORT || 3001);

  // Debug: check env after app loads
  console.log('=== APP STARTED ===');
  console.log('DATABASE_URL loaded:', !!process.env.DATABASE_URL);
  console.log('App running on port:', process.env.PORT || 3001);
  console.log('===================');
}
bootstrap();