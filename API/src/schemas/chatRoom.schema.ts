import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Chat  {
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: mongoose.Types.ObjectId[];

}

export const ChatSchema = SchemaFactory.createForClass(Chat);
