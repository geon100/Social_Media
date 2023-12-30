import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from 'src/schemas/chatRoom.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { ChatService } from './chat.service';
import { MessageSchema } from 'src/schemas/message.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Chat', schema: ChatSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Message', schema: MessageSchema },
      ]),
    
  ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
