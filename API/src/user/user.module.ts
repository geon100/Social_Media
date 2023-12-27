import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { PostSchema } from 'src/schemas/post.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'User', schema: UserSchema },
      ]),
      CloudinaryModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
