import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  sender: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' ,required:true})
  chatId: mongoose.Types.ObjectId;

  @Prop({ trim: true })
  text: string;

  @Prop({ trim: true })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post'})
  postId: mongoose.Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
