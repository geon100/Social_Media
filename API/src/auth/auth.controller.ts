import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginObj, UserObj } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private service:AuthService){}

  @Post('signup')
  signUp(@Body() userobj: UserObj, @Req() request: Request) {
    console.log('Request Body:', userobj);
    return this.service.signup(userobj)
  }
  
  @Post('signin')
  signIn(@Body() loginCred:LoginObj){
    return this.service.login(loginCred)
  }
  
  @Post('sendOtp')
  async otpCreate(@Body('email') email:string){
    const otp=await this.service.generateOtp(email)
    await this.service.sendMail(otp,email)
    return {status:true}
  }
  
  @Post('resetPassword')
  async resetPassword(@Body() newData){
    // const otp=await this.service.generateOtp(email)
    return this.service.reset(newData)
  }
}
