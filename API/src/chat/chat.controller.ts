import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
export class ChatController {
  constructor(private service: ChatService) {}

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
  @Post('send')
  sendMessage(@Req() req,@Body() obj: any){
    const {chatId,textMessage}=obj
    return this.service.sendMessage(chatId,textMessage,req.user._id)
  }
}
