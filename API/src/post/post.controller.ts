
import { BadRequestException, Body, Controller, InternalServerErrorException, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import * as path from 'path';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import * as fs from 'fs';

@Controller('post')
export class PostController {
  constructor(private service: PostService) {}

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
      const img = await this.service.upload(file);
      const res = this.service.addpost(req.user._id, caption, img);

      fs.unlinkSync(file.path);

      return res;
    } catch (error) {
      console.error('Error handling file upload:', error);
      throw new InternalServerErrorException('Failed to process file upload');
    }
  }
}


