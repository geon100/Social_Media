import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as argon from 'argon2';
import { User } from 'src/schemas/user.schema';
import { LoginObj, UserObj } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel:mongoose.Model<User>,
    private jwt:JwtService
  ){}

  async signup(obj:UserObj){
    const hashed=await argon.hash(obj.password)
    
    try {
      const newUser=(await this.userModel.create({
        fullName:obj.fullName,
        userName:obj.userName,
        email:obj.email,
        password:hashed,
        dob:new Date(obj.dob)
      })).toObject()
      delete newUser.password
      // console.log(newUser)
      return {status:true}
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username or email already exists');
      }
      throw error;
    }

  }

  async login(obj:LoginObj){
      const user=await this.userModel.findOne({email:obj.email})

      if(!user) throw new ForbiddenException('Credentials Incorrect')
      if(!user.isActive) throw new ForbiddenException('Blocked User')
      const pwMatch=await argon.verify(user.password,obj.password)

      if(!pwMatch) throw new ForbiddenException('Credentials Incorrect')
      
      return {token:await this.signToken(user._id,user.email)}
  }

   signToken(userId:string,email:string):Promise<string>{
    const payload={
      sub:userId,
      email
    }
    
    return this.jwt.signAsync(payload,{
      expiresIn:'1d',
      secret:process.env.JWT_SECRET
    })
  }
}
