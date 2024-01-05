import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as fs from 'fs';

@Controller('user')
export class UserController {

  constructor(private service: UserService,private cloud:CloudinaryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('getSuggestions')
  getSuggestions(@Req() req){
    // console.log({user:req.user})
    return this.service.getSuggestions(req.user)
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req){
    // console.log({user:req.user})
    return req.user
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('offline')
  offline(@Req() req){
    // console.log({controller:req.user.isOnline})
    return this.service.offline(req.user._id)
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('update')
  userUpdate(@Req() req,@Body() userobj:any){
    // console.log({controller:req.user.isOnline})
    return this.service.updateUser(req.user._id,userobj)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getUser/:id')
  getUser(@Req() req,@Param() params: any){
    let user=req.user._id
    if (params.id && params.id !== 'logged') {
      user = params.id;
    }
    
    return this.service.getUserData(user)
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Patch('followUser')
  followUser(@Req() req,@Body('userId') id:string){
    return this.service.followUser(id,req.user._id)
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Patch('unfollowUser')
  unfollowUser(@Req() req,@Body('userId') id:string){
    console.log('params',id)
    return this.service.unfollowUser(id,req.user._id)
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Patch('ChangeCover')
  // ChangeCoverPhoto(@Req() req,@Body('userId') id:string){
  //   console.log('params',id)
  //   return this.service.changeCover(req.user._id)
  // }

  @Patch('ChangeCover')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = 'IMG' + '-' + Date.now();
        cb(null, `${filename}${path?.extname(file.originalname)}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
        return cb(null, false);
      cb(null, true);
    }
  }))
  async ChangeCoverPhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req
  ) {
    if (!file) throw new BadRequestException('Missing required parameter - file');
    // console.log('Hi')
    try {
      const img = await this.cloud.upload(file);
      const res = await this.service.changeCover(req.user._id,img);

      fs.unlinkSync(file.path);

      return res;
    } catch (error) {
      console.error('Error handling file upload:', error);
      throw new InternalServerErrorException('Failed to process file upload');
    }
  }

  @Patch('ChangeProfile')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = 'IMG' + '-' + Date.now();
        cb(null, `${filename}${path?.extname(file.originalname)}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
        return cb(null, false);
      cb(null, true);
    }
  }))
  async ChangeProfilePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req
  ) {
    if (!file) throw new BadRequestException('Missing required parameter - file');
    console.log('Hi')
    try {
      const img = await this.cloud.upload(file);
      const res = await this.service.changeProfile(req.user._id,img);

      fs.unlinkSync(file.path);

      return res;
    } catch (error) {
      console.error('Error handling file upload:', error);
      throw new InternalServerErrorException('Failed to process file upload');
    }
  }

  

  
}
