import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostSchema } from 'src/schemas/post.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      ]),
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
