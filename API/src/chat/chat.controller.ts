import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as fs from 'fs';

@Controller('api/chat')
export class ChatController {
  constructor(private service: ChatService,private cloud:CloudinaryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createChat(@Req() req,@Body('userId') id: string){
    
    return this.service.createChat(req.user._id,id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('load')
  LoadChats(@Req() req,@Body('userId') id: string){
    
    return this.service.loadChat(req.user._id)
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('messages/:id')
  getMessages(@Req() req,@Param() params: any){
    
    return this.service.loadMessages(params.id)
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('readMessage')
  readMessage(@Req() req,@Body('messageIds') messageIds: string[]){
    
    return this.service.readStatus(messageIds)
  }


  @UseGuards(AuthGuard('jwt'))
  @Post('send')
  sendMessage(@Req() req,@Body() obj: any){
    const {chatId,textMessage}=obj
    return this.service.sendMessage(chatId,textMessage,req.user._id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('sendPost')
  sendPost(@Req() req,@Body() obj: any){
    const {postId,chatIds}=obj
    return this.service.sendPost(chatIds,postId,req.user._id)
  }


  @Post('sendImage')
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
    @Body('chatId') chatId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req
  ) {
    if (!file) throw new BadRequestException('Missing required parameter - file');
    console.log('img chat')
      const img = await this.cloud.upload(file);
      const res = this.service.sendImage(chatId,img,req.user._id);
      console.log('img chat')
      fs.unlinkSync(file.path);

      return res;
    
  }
  @Post('sendAudio')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(FileInterceptor('audio', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename = 'AUDIO' + '-' + Date.now();
      cb(null, `${filename}${path.extname(file.originalname)}`);
    }
  }),
  
}))
async uploadAudio(
  @Body('chatId') chatId: string,
  @UploadedFile() file: Express.Multer.File,
  @Req() req
) {
  console.log(file)
  if (!file) throw new BadRequestException('Missing required parameter - file');
  
  const audio = await this.cloud.upload(file); 
  const res = this.service.sendAudio(chatId, audio, req.user._id);
  
  fs.unlinkSync(file.path);

  return res;
}

}
