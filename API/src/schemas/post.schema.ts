import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';


@Schema({ timestamps: true })
export class Post  {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({ required: true })
  caption: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: mongoose.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  likes: mongoose.Types.ObjectId[];

  @Prop({default:true})
  isActive: Boolean;

  @Prop({default:0})
  reportCount: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);