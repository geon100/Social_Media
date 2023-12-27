import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostSchema } from 'src/schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from 'src/schemas/comment.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Comment', schema: CommentSchema },
      ]),
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
