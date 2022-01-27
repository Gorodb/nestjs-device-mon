import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/signUp-credentials.dto';
import { SignInCredentialsDto } from './dto/signIn-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { PinCodesRepository } from './repositories/pin-codes.repository';
import { Actions } from './enums/actions.enum';
import { MailService } from '../mail/mail.service';
import { PinCodesDto } from './dto/pin-codes.dto';
import { TokenTypes } from './enums/token-types.enum';
import { Users } from './entities/users.entity';
import { FillUserDataDto } from './dto/fill-user-data.dto';
import { SendCodeDto } from './dto/send-code.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(PinCodesRepository)
    private readonly pinCodesRepository: PinCodesRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async signUp(
    signUpCredentialsDto: SignUpCredentialsDto,
  ): Promise<{ success: boolean; accessToken?: string }> {
    const user = await this.usersRepository.createUser(signUpCredentialsDto);
    return this.createAndSendPinCode(user, Actions.REGISTRATION);
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = signInCredentialsDto;
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user.verified) {
      throw new UnauthorizedException('Не подтвержденная учетная запись');
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return generateAccessToken(email, this.jwtService);
    } else {
      throw new UnauthorizedException('Не верный email или пароль.');
    }
  }

  async validateForgotPasswordCode(
    pinCodesDto: PinCodesDto,
    token: string,
    user: Users,
  ): Promise<{ success: true; accessToken: string }> {
    const encodedToken: JwtPayload = this.jwtService.verify(token);
    if (!user || encodedToken.type !== TokenTypes.NORMAL) {
      throw new ForbiddenException('Токен не действителен');
    }
    const code = await this.pinCodesRepository.getPinCode(pinCodesDto, user.id);
    await this.pinCodesRepository.setCodeUsed(code);
    const accessToken = generateAccessToken(user.email, this.jwtService);
    return { success: true, ...accessToken };
  }

  async validateCode(
    pinCodesDto: PinCodesDto,
    token: string,
    user: Users,
  ): Promise<{ success: true; accessToken: string }> {
    const encodedToken: JwtPayload = this.jwtService.verify(token);
    if (!user || encodedToken.type !== TokenTypes.RESTRICTED) {
      throw new ForbiddenException('Токен не действителен');
    }
    const pinCode = await this.pinCodesRepository.getPinCode(
      pinCodesDto,
      user.id,
    );
    await this.pinCodesRepository.setCodeUsed(pinCode);
    await this.usersRepository.update(pinCode.user, { verified: true });
    const accessToken = generateAccessToken(user.email, this.jwtService);
    return { ...accessToken, success: true };
  }

  async resendCode(sendCodeDto: SendCodeDto): Promise<{ success: boolean }> {
    const user: Users = await this.usersRepository.findUserByEmail(
      sendCodeDto.email,
    );
    return this.createAndSendPinCode(user, sendCodeDto.action);
  }

  private async createAndSendPinCode(
    user: Users,
    action: Actions,
  ): Promise<{ success: boolean; accessToken?: string }> {
    const pinCode = await this.pinCodesRepository.createPinCode(
      user.id,
      action,
    );
    switch (action) {
      case Actions.REGISTRATION:
        await this.mailService.sendUserConfirmation(user, pinCode.pincode);
        const restrictedToken = generateRestrictedToken(
          user.email,
          this.jwtService,
        );
        return { ...restrictedToken, success: true };
      case Actions.FORGOT_PASSWORD:
        await this.mailService.sendForgotPasswordToken(user, pinCode.pincode);
        return { success: true };
    }
  }
}

const generateAccessToken = (
  email: string,
  jwtService: JwtService,
): { accessToken: string } => {
  const payload: JwtPayload = { email, type: TokenTypes.NORMAL };
  const accessToken: string = jwtService.sign(payload);
  return { accessToken };
};

const generateRestrictedToken = (
  email: string,
  jwtService: JwtService,
): { accessToken: string } => {
  const payload: JwtPayload = { email, type: TokenTypes.RESTRICTED };
  const accessToken: string = jwtService.sign(payload);
  return { accessToken };
};
