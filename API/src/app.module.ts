import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AdminModule } from './admin/admin.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    AuthModule,ConfigModule.forRoot({}),
    MongooseModule.forRoot(process.env.dbUrl), 
    UserModule, 
    PostModule, AdminModule,CloudinaryModule, ChatModule,
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
