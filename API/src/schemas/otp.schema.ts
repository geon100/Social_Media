import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ expires: 600, default: () => {
    const timestamp = Math.floor(Date.now() / 1000);
    return timestamp;
  }})
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
