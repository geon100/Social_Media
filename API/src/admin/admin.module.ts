import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from 'src/schemas/admin.schema';
import { PassportModule } from '@nestjs/passport';
import { AdJwtStrategy } from 'src/strategy/adminJwt.strategy';
import { UserSchema } from 'src/schemas/user.schema';
import { PostSchema } from 'src/schemas/post.schema';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'admin-jwt',
      property: 'admin', // Set the user property name
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with your secret key
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])
  ],
  controllers: [AdminController],
  providers: [AdminService,AdJwtStrategy],
})
export class AdminModule {}
