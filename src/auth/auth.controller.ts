import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(200)
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  @HttpCode(200)
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @Get('me')
  @HttpCode(200)
  getUser() {
    return this.authService.getUser();
  }
}
