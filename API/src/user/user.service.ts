import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from 'src/schemas/post.schema';
import { User } from 'src/schemas/user.schema';
import { v2 as cloudinary } from 'cloudinary';
import { use } from 'passport';

cloudinary.config({
  cloud_name: 'dt4zlqomk',
    api_key: '154456853779316',
    api_secret: 'iYVXhNtFtTM1rBtiWJr9s3n6lkc',
    secure: true,
});

@Injectable()
export class UserService {

  constructor(@InjectModel('Post') private postModel:mongoose.Model<Post>,
              @InjectModel('User') private userModel:mongoose.Model<User>,
              @InjectModel('Report') private reportModel:mongoose.Model<Report>,
              @InjectModel('Notification') private notifyModel:mongoose.Model<Notification>){}


  async getSuggestions(user){
    const followingIds = user.following.map(followedUser => followedUser.toString());
    followingIds.push(user._id)
    return await this.userModel.find({_id:{$nin:followingIds}})
    
  }

  async getFollowers(user:any){
    return await await this.userModel.findById(user._id,{followers:1,_id:0}).populate('followers')
  }

  async getUserData(userId: string) {
    try {
      const user = await this.userModel
        .findById(userId)
        .populate('followers')
        .populate('following')
        .populate({
          path: 'saved',
          populate: {
            path: 'user',
          },
        });
        if(!user) throw new BadRequestException('Invalid Data')
      const posts = await this.postModel
        .find({ $or:[{user: userId},{collaborator:userId,collab: true}], isActive: true })
        .populate('user collaborator')
        .populate({
          path: 'comments',
          populate: { path: 'user' },
        });
  
    
      await this.postModel.populate(user.saved, {
        path: 'comments',
        populate: { path: 'user' },
      });
  
      return { user, posts };
    } catch (error) {
      throw error;
    }
  }
  
  async reportUser(reportData: any, reportedBy: any) {
    console.log(reportData, reportedBy);
    const existingReport = await this.reportModel.findOne({
      reportedBy: reportedBy,
      reportedUser: reportData.userId
    });
    
    if (!existingReport) {
      await this.reportModel.create({
        reportedBy: reportedBy,
        reportedUser: reportData.userId,
        text:reportData.reportText,
        type:reportData.type
      });
      const reportedUser=await this.userModel.findById(reportData.userId);
      reportedUser.reportCount++
      if(reportedUser.reportCount>15){
        reportedUser.isActive=false
      }
      await reportedUser.save()
    }
  }

  async followUser(userId: string, loggedinUser: string) {
    const logUser = await this.userModel.findById(loggedinUser);
    const userToFollow = await this.userModel.findById(userId);
  
    // Check if the user is not already in the following list
    if (!logUser.following.includes(new mongoose.Types.ObjectId(userId))) {
      logUser.following.push(new mongoose.Types.ObjectId(userId));
      await logUser.save();
    }
  
    // Check if the loggedinUser is not already in the followers list
    if (!userToFollow.followers.includes(logUser._id)) {
      userToFollow.followers.push(logUser._id);
      await userToFollow.save();
    }
  
    await this.notifyModel.create({
      sender: loggedinUser,
      receiver: userId,
      type: 'follow',
    });
  
    return { status: true };
  }
  
  async unfollowUser(userId: string, loggedinUser: string) {
    const logUser = await this.userModel.findById(loggedinUser);
    const userToUnfollow = await this.userModel.findById(userId);
  
    
    logUser.following = logUser.following.filter(val => val.toString() !== userId);
    await logUser.save();
  
    
    userToUnfollow.followers = userToUnfollow.followers.filter(val => val.toString() !== loggedinUser);
    await userToUnfollow.save();
  
    return { status: true };
  }
  
  async offline(userId:string){
    const user=await this.userModel.findByIdAndUpdate(userId, { isOnline: false }, { new: true })
    // console.log({controller:user.isOnline})

    return {status:true}
  }

  async updateUser(userId,obj){
    try {
      const user=await this.userModel.findById(userId)
        user.userName=obj.userName
        user.fullName=obj.fullName
        user.bio=obj.bio
        user.dob=new Date(obj.dob)
        
      await user.save()

      return await this.userModel.findById(userId)
      .populate('followers')
      .populate('following')
      .populate('saved')
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username or email already exists');
      }
      throw error;
    }
  }

  async changeCover(id:string,img:string){
    const user=await this.userModel.findById(id)
    
    user.coverPicture=img
    return await user.save()

  }
  async changeProfile(id:string,img:string){
    const user=await this.userModel.findById(id)
    
    user.profilePicture=img
    return await user.save()

  }
  async loadNotifications(userId) {
    return await this.notifyModel.find({ receiver: userId }).sort({ createdAt: -1 }).populate({
      path: 'sender',
      select: '_id userName profilePicture',
    }).populate({
      path: 'post',
      populate: [
        {
          path: 'user',
          model: 'User',  // Replace 'User' with the actual model name for the user
        },
        {
          path: 'comments',
          populate: {
            path: 'user',
            model: 'User',  // Replace 'User' with the actual model name for the user in the comments
          },
        },
      ],
    }).exec();
    
    
  }
  async readNotifications(userId:string) {
    return await this.notifyModel.deleteMany({ receiver: userId, type: { $ne: 'collab' } });

  }
}
