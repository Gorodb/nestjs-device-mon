import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/signUp-credentials.dto';
import { SignInCredentialsDto } from './dto/signIn-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    return this.authService.signUp(signUpCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInCredentialsDto);
  }
}
