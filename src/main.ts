//import{ValidationPipe} from "./middleware/ValidationPipe"
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './middleware/ExceptionHandler';
import { v2 } from 'cloudinary';


async function bootstrap() {
  v2.config({
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: parseFloat(process.env.API_KEY),
    api_secret: `${process.env.API_SECRET}`,
  });
  const app = await NestFactory.create(AppModule);
 

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
