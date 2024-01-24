import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as argon from 'argon2';
import { User } from 'src/schemas/user.schema';
import { LoginObj, UserObj, newPasswordObj } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private otpStorage:{email?:string}={}
  constructor(
    @InjectModel('User') private userModel:mongoose.Model<User>,

    private jwt:JwtService
  ){}
 
  
  async signup(obj:UserObj){
    const hashed=await argon.hash(obj.password)
    const otpDoc=this.otpStorage[obj.email]
    
    if(!obj.otp || !otpDoc || otpDoc!==obj.otp){
      throw new BadRequestException('invalid OTP')
    }
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

      if(!user) throw new UnauthorizedException('Invalid credentials')
      if(!user.isActive) throw new ForbiddenException('Blocked User')
      const pwMatch=await argon.verify(user.password,obj.password)

      if(!pwMatch) throw new UnauthorizedException('Invalid credentials')
      
      return {token:await this.signToken(user._id,user.email),refreshToken:await this.signRefreshToken(user._id,user.email)}
  }
  async generateNewAccessToken(token:string){
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET) as { sub: string, email: string };
      
      return {token:await this.signToken(decoded.sub,decoded.email)};
    } catch (error) {
      
      console.error('Token verification failed:', error.message);
      throw new Error('Invalid refresh token');
    }
  }
    private signToken(userId:string,email:string):Promise<string>{
    const payload={
      sub:userId,
      email
    }
    
    return this.jwt.signAsync(payload,{
      expiresIn:'30 min',
      secret:process.env.JWT_SECRET
    })
  }
   private signRefreshToken(userId:string,email:string):Promise<string>{
    const payload={
      sub:userId,
      email
    }
    
    return this.jwt.signAsync(payload,{
      expiresIn:'1 day',
      secret:process.env.JWT_SECRET
    })
  }


  async generateOtp(email:string){
    try {
      const otp=Math.floor(1000 + Math.random() * 9000);
      this.otpStorage[email] = String(otp);
      console.log('otp',this.otpStorage[email])
      setTimeout(() => {
        console.log('deleted',this.otpStorage[email])
        delete this.otpStorage[email];
      }, 2 * 60 * 1000);
      return otp
    } catch (error) {
      throw error;
    }
  }

   async sendMail(otp:number,email:string){
    const nodemailer = require('nodemailer');
    console.log(process.env.MAIL)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
         user: process.env.MAIL,
         pass: process.env.PASS
      }
   });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Your OTP for Verification',
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async reset(newObj:newPasswordObj){
    const { email, otp, newPassword } = newObj;

    try {
      const otpDoc=this.otpStorage[email]
    
    if(!otp || !otpDoc || otpDoc!==otp){
      throw new BadRequestException('invalid OTP')
    }
    
    
    
    const user=await this.userModel.findOne({email})
    const hashed=await argon.hash(newPassword)
    user.password=hashed
    await user.save()

    return {status:true}
    } catch (error) {
      throw error
    }
  }


}
