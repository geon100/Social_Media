import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { IoAdapter } from '@nestjs/platform-socket.io';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  };
  app.enableCors(corsOptions);
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(3000);

}
bootstrap();
