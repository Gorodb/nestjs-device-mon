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
import { PinCodes } from './entities/pin-codes.entity';
import { PinCodesDto } from './dto/pin-codes.dto';
import { TokenTypes } from './enums/token-types.enum';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}
}
