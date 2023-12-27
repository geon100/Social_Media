import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as argon from 'argon2';
import { User } from 'src/schemas/user.schema';
import { LoginObj, UserObj, newPasswordObj } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Otp } from 'src/schemas/otp.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel:mongoose.Model<User>,
    @InjectModel('Otp') private otpModel:mongoose.Model<Otp>,
    private jwt:JwtService
  ){}

  async signup(obj:UserObj){
    const hashed=await argon.hash(obj.password)
    const otpDoc=await this.otpModel.findOne({email:obj.email})
    console.log(otpDoc.otp)
    if(!obj.otp || !otpDoc.otp || otpDoc.otp!==obj.otp){
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
      
      return {token:await this.signToken(user._id,user.email)}
  }

   private signToken(userId:string,email:string):Promise<string>{
    const payload={
      sub:userId,
      email
    }
    
    return this.jwt.signAsync(payload,{
      expiresIn:'1d',
      secret:process.env.JWT_SECRET
    })
  }


  async generateOtp(email:string){
    try {
      const otp=Math.floor(1000 + Math.random() * 9000);
      await this.otpModel.create({email,otp})
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
      const otpDoc=await this.otpModel.findOne({email})
    
    if(!newObj?.otp || !otpDoc?.otp || otpDoc?.otp!==newObj?.otp){
      throw new BadRequestException('invalid OTP')
    }
    
    const user=await this.userModel.findOne({email})
    const hashed=await argon.hash(newObj.newPassword)
    user.password=hashed
    await user.save()

    return {status:true}
    } catch (error) {
      throw error
    }
  }


}
