import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Admin } from 'src/schemas/admin.schema';


@Injectable()
export class AdJwtStrategy extends PassportStrategy(Strategy,'admin-jwt') {
  constructor(@InjectModel('Admin') private adminModel:mongoose.Model<Admin>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      
    });
  }

  async validate(payload:{sub:string,email:string}) {
    let admin=await this.adminModel.findById(payload.sub).select('-password -__v')
    return admin
  }
  
}