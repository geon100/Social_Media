import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class Report  {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  reportedBy: mongoose.Types.ObjectId;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  reportedUser: mongoose.Types.ObjectId;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post'})
  reportedPost: mongoose.Types.ObjectId;

  @Prop({ required: true })
  text: string;
  
  @Prop({ required: true,enum: ['user', 'post'] })
  type: string;



}

export const ReportSchema = SchemaFactory.createForClass(Report);

