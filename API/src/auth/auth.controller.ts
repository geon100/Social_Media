import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginObj, UserObj } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private service:AuthService){}

  @Post('signup')
  signUp(@Body() userobj: UserObj, @Req() request: Request) {
    // console.log('Request Body:', userobj);
    return this.service.signup(userobj)
  }
  
  @Post('signin')
  signIn(@Body() loginCred:LoginObj){
    return this.service.login(loginCred)
  }
}
