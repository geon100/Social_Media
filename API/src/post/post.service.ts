import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import { Comment } from 'src/schemas/comment.schema';
import { Post } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';

// cloudinary.config({
//   cloud_name: 'dt4zlqomk',
//     api_key: '154456853779316',
//     api_secret: 'iYVXhNtFtTM1rBtiWJr9s3n6lkc',
//     secure: true,
// });

@Injectable()
export class PostService {

  constructor(@InjectModel('Post') private postModel:mongoose.Model<Post>,
              @InjectModel('User') private userModel:mongoose.Model<User>,
              @InjectModel('Report') private reportModel:mongoose.Model<Report>,
              @InjectModel('Notification') private notifyModel:mongoose.Model<Notification>,
              @InjectModel('Comment') private CommentModel:mongoose.Model<Comment>){}

  async loadPosts(page:number,limit:number){
    return await this.postModel.find({isActive:true}).populate('user collaborator').populate({
      path: 'comments',
      populate: { path: 'user' }
    }).sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit).exec();
  }
  
  async loadHomePosts(user,page:number,limit:number) {
    const followingIds = user.following.map(followedUser => followedUser.toString());
    
    return await this.postModel
  .find({
    $or: [
      { user: { $in: followingIds } },
      { collaborator: { $in: followingIds }, collab: true },
    ],
    isActive: true,
  })
  .populate('user collaborator') 
  .populate({
    path: 'comments',
    populate: { path: 'user' }
  })
  .sort({ createdAt: -1 })
  .skip((page - 1) * limit)
  .limit(limit)
  .exec();


      
  }

  // async upload(file:any){
  //   // console.log("Reached service",file);
  //   const url=(await cloudinary.uploader.upload(file?.path, {
  //   folder: 'Nexus',
  //   resource_type: 'image'})).url
  //   return url
  // }

  async addpost(userId: mongoose.Schema.Types.ObjectId, caption: string, img: string, tags: string[],collaborator) {
    try {
      const newPost = await this.postModel.create({
        user: userId,
        caption,
        image: img,
      });
  
      if (tags.length) {
        newPost.tags = tags.map((tag) => new mongoose.Types.ObjectId(tag));
        await newPost.save();
  
        for (const tag of newPost.tags) {
          await this.notifyModel.create({
            sender: userId,
            receiver: tag,
            type: 'tag',
            post:newPost._id
          });
        }
      }
      if(collaborator){
        newPost.collaborator=new mongoose.Types.ObjectId(collaborator)
        
        await newPost.save();

        await this.notifyModel.create({
          sender: userId,
          receiver: newPost.collaborator,
          type: 'collab',
          post:newPost._id
        });
      }
  
      return { status: true };
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  }
  

  async likePost(postId: any, userId: any) {
    
    const post = await this.postModel.findById(postId);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user_Id = new mongoose.Types.ObjectId(userId)

  if (post.likes.some((likeId) => likeId.toString() === user_Id.toString())) {
    post.likes = post.likes.filter((likeId) => likeId.toString() !== user_Id.toString());
  } else {
    post.likes.push(user_Id);
    if(user_Id.toString()!==post.user.toString()){
      await this.notifyModel.create({
        sender:userId,
        receiver:post.user,
        type:'like'
      })
    }

    if(post.collab && user_Id.toString()!==post.collaborator.toString()){
      console.log('Inside if condition for collaboration notification',);
      console.log('user_Id.toString():', user_Id.toString());
      console.log('post.collaborator.toString():', post.collaborator.toString());
      await this.notifyModel.create({
        sender:userId,
        receiver:post.collaborator,
        type:'like'
      })
    }
  }
  
  return await post.save();
  }

  async reportPost(reportData: any, reportedBy: any) {
    console.log(reportData, reportedBy);
    const existingReport = await this.reportModel.findOne({
      reportedBy: reportedBy,
      reportedPost: reportData.postId
    });
    
    if (!existingReport) {
      await this.reportModel.create({
        reportedBy: reportedBy,
        reportedPost: reportData.postId,
        text:reportData.reportText,
        type:reportData.type
      });
      const reportedPost=await this.postModel.findById(reportData.postId);
      reportedPost.reportCount++
      if(reportedPost.reportCount>15){
        reportedPost.isActive=false
      }
      await reportedPost.save()
    }
  }

  async savePost(postId: string, userId: string) {
    const user = await this.userModel.findById(userId);
   
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post_Id = new mongoose.Types.ObjectId(postId)

  if (user.saved.some((savedId) => savedId.toString() === post_Id.toString())) {
    user.saved = user.saved.filter((savedId) => savedId.toString() !== post_Id.toString());
  } else {
    user.saved.push(post_Id);
  }

  return await user.save();
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
    return await this.postModel.findOne({_id:postId,isActive:true}).populate('user collaborator').populate({
      path: 'comments',
      populate: { path: 'user' }
    }).exec();
  }

  async acceptCollaborator(postId:string){
    console.log(postId)
    await this.postModel.findByIdAndUpdate(postId, { collab: true }, { new: true })
    await this.notifyModel.deleteOne({post:postId})
    return {status:true}

  }

  async rejectCollab(postId:string){
    await this.notifyModel.deleteOne({post:postId})
  }
  
}
