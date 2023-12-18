import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req){
    // console.log({user:req.user})
    return req.user
  }
}
