
import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Patch, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import * as path from 'path';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import * as fs from 'fs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('post')
export class PostController {
  constructor(private service: PostService,private cloud:CloudinaryService) {}

  @Post('addpost')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const filename = 'IMG' + '-' + Date.now();
        cb(null, `${filename}${path.extname(file.originalname)}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
        return cb(null, false);
      cb(null, true);
    }
  }))
  async uploadFile(
    @Body('caption') caption: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req
  ) {
    if (!file) throw new BadRequestException('Missing required parameter - file');

    try {
      const img = await this.cloud.upload(file);
      const res = this.service.addpost(req.user._id, caption, img);

      fs.unlinkSync(file.path);

      return res;
    } catch (error) {
      console.error('Error handling file upload:', error);
      throw new InternalServerErrorException('Failed to process file upload');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getUserPosts')
  getPosts(@Req() req){
    return this.service.loadPosts()
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('getHomeUserPosts')
  getHomePosts(@Req() req){
    return this.service.loadHomePosts(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('likepost')
  toggleLike(@Req() req,@Body('post') post: any){
    return this.service.likePost(post,req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('addcomment')
  addComment(@Req() req,@Body() commentObj: any){
    const {comment,postId}=commentObj
    const userId=req.user._id
    return this.service.addComment(comment,postId,userId)
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('delcomment')
  deleteComment(@Req() req,@Body() commentObj: any){
    const {commentId,postId}=commentObj
    const userId=req.user._id
    return this.service.deleteComment(postId,commentId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getPost/:id')
  getUser(@Req() req,@Param() params: any){
    
    
    return this.service.getPost(params.id)
  }
}


