import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  userSignup(@Body() body: AuthDto) {
    return this.authService.userSignUp(body);
  }

  @Post('/signin')
  userSignin(@Body() body: AuthDto) {
    return this.authService.userSignIn(body);
  }
}
