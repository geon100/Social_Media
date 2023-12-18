import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Cloudinary } from 'cloudinary-core';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

  // cloudinary.v2.config({
  //   cloud_name: 'dt4zlqomk',
  //   api_key: '154456853779316',
  //   api_secret: 'iYVXhNtFtTM1rBtiWJr9s3n6lkc',
  //   secure: true,
  // });

  

  // const cloudinaryStorage = diskStorage({
  //   destination: './uploads',
  //   filename: (req, file, cb) => {
  //     cb(null, file.originalname);
  //   },
  // });


   

    
  
}
bootstrap();
