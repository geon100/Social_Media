import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostSchema } from 'src/schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from 'src/schemas/comment.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserSchema } from 'src/schemas/user.schema';
import { Notification, NotificationSchema } from 'src/schemas/notification.schema';
import { ReportSchema } from 'src/schemas/report.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Notification', schema: NotificationSchema },
      { name: 'Report', schema: ReportSchema },
      ]),
      CloudinaryModule
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
