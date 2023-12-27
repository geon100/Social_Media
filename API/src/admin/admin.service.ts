import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { LoginObj } from 'src/auth/auth.dto';
import * as mongoose from 'mongoose';
import { Admin } from 'src/schemas/admin.schema';
import { User } from 'src/schemas/user.schema';
import { Post } from 'src/schemas/post.schema';
@Injectable()
export class AdminService {

  constructor(
    @InjectModel('Admin') private adminModel:mongoose.Model<Admin>,
    @InjectModel('User') private userModel:mongoose.Model<User>,
    @InjectModel('Post') private postModel:mongoose.Model<Post>,
    private jwt:JwtService
  ){}

  async login(obj:LoginObj){
    const adminUser=await this.adminModel.findOne({email:obj.email})

    if(!adminUser) throw new UnauthorizedException('Invalid credentials')
    const pwMatch=adminUser.password===obj.password

    if(!pwMatch) throw new UnauthorizedException('Invalid credentials')
    return {token:await this.signToken(adminUser._id,adminUser.email)}
}

 private signToken(adminId:string,email:string):Promise<string>{
  const payload={
    sub:adminId,
    email
  }
  
  return this.jwt.signAsync(payload,{
    expiresIn:'1d',
    secret:process.env.JWT_SECRET
  })
}

  async getUsers(){
    const users=await this.userModel.find()
    return users
  }

  async changeUserStatus(userId: string): Promise<void> {
    try {
      const user = await this.userModel.findById(userId);

      if (user) {
        user.isActive = !user.isActive;
        await user.save()
      } else {
        console.log(`User with ID ${userId} not found.`);
      }
    } catch (error) {
      console.error(`Error changing user status: ${error.message}`);
      throw new Error('Failed to change user status');
    }
  }
  async changePostStatus(postId: string): Promise<void> {
    try {
      const post = await this.postModel.findById(postId);

      if (post) {
        post.isActive = !post.isActive;
        await post.save()
      } else {
        console.log(`post with ID ${postId} not found.`);
      }
    } catch (error) {
      console.error(`Error changing post status: ${error.message}`);
      throw new Error('Failed to change post status');
    }
  }
  async getPosts(){
    const posts = await this.postModel.find().populate({ path: 'user', options: { strictPopulate: false } }).exec();
  
    return posts
  }

}
