import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/signUp-credentials.dto';
import { SignInCredentialsDto } from './dto/signIn-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { PinCodesRepository } from './repositories/pinCodes.repository';
import { Actions } from './enums/actions';
import { MailService } from '../mail/mail.service';

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
  ): Promise<{ success: boolean }> {
    const user = await this.usersRepository.createUser(signUpCredentialsDto);
    const pinCode = await this.pinCodesRepository.createPinCode(
      user.id,
      Actions.REGISTRATION,
    );
    const sending = await this.mailService.sendUserConfirmation(
      user,
      pinCode.pincode,
    );
    console.log(sending);
    return { success: true };
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = signInCredentialsDto;
    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return generateAccessToken(email, this.jwtService); // { accessToken };
    } else {
      throw new UnauthorizedException('Не верный email или пароль.');
    }
  }
}

const generateAccessToken = (email, jwtService): { accessToken: string } => {
  const payload: JwtPayload = { email };
  const accessToken: string = jwtService.sign(payload);
  return { accessToken };
};
