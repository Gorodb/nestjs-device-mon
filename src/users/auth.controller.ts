import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/signUp-credentials.dto';
import { SignInCredentialsDto } from './dto/signIn-credentials.dto';
import { PinCodesDto } from './dto/pin-codes.dto';
import { GetJwtToken, GetUser } from './users.decorator';
import { SendCodeDto } from './dto/send-code.dto';
import { Users } from './entities/users.entity';
import { FillUserDataDto } from './dto/fill-user-data.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard())
  @Post('/update_user')
  updateUserData(
    @GetUser() user: Users,
    @Body() fillUserDataDto: FillUserDataDto,
  ): Promise<Users> {
    return this.authService.fillUserData(fillUserDataDto, user);
  }

  @Post('/signup')
  signUp(
    @Body() signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<{ success: boolean; accessToken?: string }> {
    return this.authService.signUp(signUpCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInCredentialsDto);
  }

  @Post('/validate')
  validate(
    @GetJwtToken() token: string,
    @Body() pinCodesDto: PinCodesDto,
  ): Promise<{ success: boolean; accessToken?: string }> {
    return this.authService.validateCode(pinCodesDto, token);
  }

  @Post('/send_code')
  forgotPassword(
    @GetJwtToken() token: string,
    @Body() sendCodeDto: SendCodeDto,
  ): Promise<{ success: boolean }> {
    return this.authService.resendCode(sendCodeDto.action, token);
  }
}
