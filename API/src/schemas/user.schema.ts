import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ unique: true, required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  dob: Date;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({default:''})
  bio: string;

  @Prop({default:'https://res.cloudinary.com/dt4zlqomk/image/upload/v1702533259/Nexus/v7uhcfoqoeho7wgl5ydn.jpg'})
  profilePicture: string;

  @Prop({default:'https://res.cloudinary.com/dt4zlqomk/image/upload/v1702533017/Nexus/wgcnsuqgo8bjoz5wkroe.png'})
  coverPicture: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  followers: mongoose.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  following: mongoose.Types.ObjectId[];
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  saved: mongoose.Types.ObjectId[];

  @Prop({default:true})
  isActive: Boolean;
  
  @Prop({default:false})
  isOnline: Boolean;
  
  @Prop({default:0})
  reportCount: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
