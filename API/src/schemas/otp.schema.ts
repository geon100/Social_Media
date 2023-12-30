import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Otp {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  otp: string;

  @Prop({
    expires: 30,
    default: () => Date.now() 
  })
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);

