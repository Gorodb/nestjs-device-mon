import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/signUp-credentials.dto';
import { SignInCredentialsDto } from './dto/signIn-credentials.dto';
import { PinCodesDto } from './dto/pin-codes.dto';
import { GetJwtToken, GetUser } from './users.decorator';
import { SendCodeDto } from './dto/send-code.dto';
import { Users } from './entities/users.entity';
import { Roles } from '../guards/roles.guard';
import { UsersRoles } from './enums/users-roles.enum';
import { serviceMessages } from './dto/userMessages';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('/validate_forgot_password_code')
  validateForgotPasswordCode(
    @GetJwtToken() token: string,
    @GetUser() user: Users,
    @Body() pinCodesDto: PinCodesDto,
  ): Promise<{ success: boolean; accessToken?: string }> {
    return this.authService.validateForgotPasswordCode(
      pinCodesDto,
      token,
      user,
    );
  }

  @Post('/send_code')
  forgotPassword(
    @Body() sendCodeDto: SendCodeDto,
  ): Promise<{ success: boolean }> {
    return this.authService.resendCode(sendCodeDto);
  }

  @Roles(UsersRoles.USER)
  @Get('/user_info')
  userInfo(@GetUser() user: Users): Users {
    if (!user.verified) {
      throw new UnauthorizedException(serviceMessages.en.authRequired);
    }
    return user;
  }
}
