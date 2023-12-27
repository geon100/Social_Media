import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { OtpSchema } from 'src/schemas/otp.schema';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user', 
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
  
})
export class AuthModule {}
