import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Admin extends Document {
  
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

}

export const AdminSchema = SchemaFactory.createForClass(Admin);
