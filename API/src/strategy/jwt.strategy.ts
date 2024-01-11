import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/schemas/user.schema';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private userModel:mongoose.Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      
    });
  }
 
  async validate(payload: { sub: string, email: string }) {
    let user = await this.userModel.findById(payload.sub).select('-password -__v');
  
    if (!user) {
      console.log(user,'userjwtstra')
      throw new ForbiddenException('User not found');
    }
    if (!user.isActive) throw new ForbiddenException('Blocked User');
  
    if (!user.isOnline) {
      user = await this.userModel.findByIdAndUpdate(payload.sub, { isOnline: true }, { new: true }).select('-password -__v');
      setTimeout(async () => {
        await this.userModel.findByIdAndUpdate(payload.sub, { isOnline: false }, { new: true }).select('-password -__v');
      }, 30 * 60 * 1000);
    }
  
    return user;
  }
  
  
}