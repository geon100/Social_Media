import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { LoginObj } from 'src/auth/auth.dto';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/admin')
export class AdminController {
  constructor(private service:AdminService){}
  @Post('signin')
  signIn(@Body() loginCred:LoginObj){
    // console.log('aasdasdasdasd')
    return this.service.login(loginCred)
  }

  @UseGuards(AuthGuard('admin-jwt'))
  @Get('allUsers')
  getMe(@Req() req){
    // console.log({user:req.admin})
    return this.service.getUsers()
  }
  @UseGuards(AuthGuard('admin-jwt'))
  @Get('allreports')
  getReports(@Req() req){
    // console.log({user:req.admin})
    return this.service.getReports()
  }
  @UseGuards(AuthGuard('admin-jwt'))
  @Patch('block')
  blockUser(@Body('userid') userId: string) {
    // console.log({user:req.admin})
    return this.service.changeUserStatus(userId)
  }

  @UseGuards(AuthGuard('admin-jwt'))
  @Patch('blockpost')
  blockPost(@Body('postId') postId: string) {
    console.log({user:postId})
    return this.service.changePostStatus(postId)
  }

  @UseGuards(AuthGuard('admin-jwt'))
  @Get('allposts')
  getPosts() {
    return this.service.getPosts();
  }
}
