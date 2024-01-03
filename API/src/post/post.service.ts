import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import { Comment } from 'src/schemas/comment.schema';
import { Post } from 'src/schemas/post.schema';

// cloudinary.config({
//   cloud_name: 'dt4zlqomk',
//     api_key: '154456853779316',
//     api_secret: 'iYVXhNtFtTM1rBtiWJr9s3n6lkc',
//     secure: true,
// });

@Injectable()
export class PostService {

  constructor(@InjectModel('Post') private postModel:mongoose.Model<Post>,
              @InjectModel('Comment') private CommentModel:mongoose.Model<Comment>){}

  async loadPosts(){
    return await this.postModel.find({isActive:true}).populate('user').populate({
      path: 'comments',
      populate: { path: 'user' }
    }).sort({ createdAt: -1 }) .exec();
  }
  
  async loadHomePosts(user) {
    const followingIds = user.following.map(followedUser => followedUser.toString());
  
    return await this.postModel
  .find({ user: { $in: followingIds },isActive:true })
  .populate('user')
  .populate({
    path: 'comments',
    populate: { path: 'user' }
  })
  .sort({ createdAt: -1 }) 
  .exec();

      
  }

  // async upload(file:any){
  //   // console.log("Reached service",file);
  //   const url=(await cloudinary.uploader.upload(file?.path, {
  //   folder: 'Nexus',
  //   resource_type: 'image'})).url
  //   return url
  // }

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

  async likePost(postId: any, userId: any) {
    
    const post = await this.postModel.findById(postId);
  
    // console.log(post, postId, userId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user_Id = new mongoose.Types.ObjectId(userId)

  if (post.likes.some((likeId) => likeId.toString() === user_Id.toString())) {
    post.likes = post.likes.filter((likeId) => likeId.toString() !== user_Id.toString());
  } else {
    post.likes.push(user_Id);
  }

  return await post.save();
  }

  async addComment(commentStr:string,postId:string,userId){

    if(!commentStr || !postId){
      throw new BadRequestException('Not valid data')
    }
    
    const post=await this.postModel.findById(postId)

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment=await this.CommentModel.create({
      user:userId,
      text:commentStr
    })
    await comment.populate('user');
    post.comments.push(comment._id)
    await post.save()
    return comment
  }

  async deleteComment(postId,commentId){
    const post=await this.postModel.findById(postId)
    post.comments=post.comments.filter(val=>val.toString()!==commentId)
    await this.CommentModel.deleteOne({_id:commentId})
    await post.save()
    return {status:true}
  }

  async getPost(postId){
    return await this.postModel.findOne({_id:postId,isActive:true}).populate('user').populate({
      path: 'comments',
      populate: { path: 'user' }
    }).exec();
  }
  
}
