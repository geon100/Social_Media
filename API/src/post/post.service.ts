import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import { Post } from 'src/schemas/post.schema';

cloudinary.config({
  cloud_name: 'dt4zlqomk',
    api_key: '154456853779316',
    api_secret: 'iYVXhNtFtTM1rBtiWJr9s3n6lkc',
    secure: true,
});

@Injectable()
export class PostService {

  constructor(@InjectModel('Post') private postModel:mongoose.Model<Post>){}

  async upload(file:any){
    // console.log("Reached service",file);
    const url=(await cloudinary.uploader.upload(file?.path, {
    folder: 'Nexus',
    resource_type: 'image'})).url
    return url
  }

  async addpost(userId:mongoose.Schema.Types.ObjectId,caption:string,img:string){
    
    try {
      const newPost=await this.postModel.create({
        user:userId,
        caption,
        image:img,
      })
      if(newPost)
      return {status:true}
      
    } catch (error) {
      
      throw error;
    }

  }
}
