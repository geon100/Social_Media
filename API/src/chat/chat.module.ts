import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from 'src/schemas/chatRoom.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { ChatService } from './chat.service';
import { MessageSchema } from 'src/schemas/message.schema';
import { ChatGateway } from './chat.gateway';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PostSchema } from 'src/schemas/post.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Chat', schema: ChatSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Message', schema: MessageSchema },
      { name: 'post', schema: PostSchema },
      ]),CloudinaryModule
    
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
