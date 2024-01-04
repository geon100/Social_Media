import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Chat } from 'src/schemas/chatRoom.schema';
import { Message } from 'src/schemas/message.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ChatService {

  constructor(@InjectModel('Chat') private chatModel:mongoose.Model<Chat>,
              @InjectModel('User') private userModel:mongoose.Model<User>,
              @InjectModel('Message') private messageModel:mongoose.Model<Message>){}

              async createChat(sender,receiver){
                try {
                  const existingChat = await this.chatModel.findOne({users: { $all: [sender, receiver] }}).exec();
                  console.log('here')

                if (!existingChat) {
                  console.log('new')
                  await this.chatModel.create({
                    users: [sender, receiver],
                  });
                }else
                console.log('exists')


                return {status:true}

                } catch (error) {
                  throw error
                }
              }

              async loadChat(userId: string): Promise<Chat[]> {
                const chats = await this.chatModel.find({users: userId})
                  .select('-users') 
                  .populate({
                    path: 'users',
                    select: '_id userName profilePicture isOnline',
                  }).exec();

                  chats.forEach(chat => {
                    chat.users = chat.users.filter(val => val._id.toString() !== userId.toString())
                  });

                return chats;
              }
              async loadMessages(chat) {
                return await this.messageModel.find({chatId: chat})
                  .populate({
                    path: 'sender',
                    select: '_id userName profilePicture',
                  }).exec();
              }

              async sendMessage(chatId:string,textMessage:string,userId:string){
                const message=await this.messageModel.create({
                  sender:userId,
                  text:textMessage,
                  chatId
                })
                return await message.populate({
                  path: 'sender',
                  select: '_id userName profilePicture',
                })
              }
              async sendPost(chatId:string,post:string,userId:string){
                const message=await this.messageModel.create({
                  sender:userId,
                  postId:post,
                  chatId
                })
                return await message.populate([
                  {
                    path: 'sender',
                    select: '_id userName profilePicture',
                  }])
              }
              async sendImage(chatId,img,userId){
                const message=await this.messageModel.create({
                  sender:userId,
                  image:img,
                  chatId
                })
                return await message.populate({
                  path: 'sender',
                  select: '_id userName profilePicture',
                })
              }
}
