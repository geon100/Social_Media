import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  sender: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  receiver: mongoose.Types.ObjectId;

  @Prop({ trim: true })
  text: string;

  @Prop({ enum: ['like', 'follow'] })
  type: string;

}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

