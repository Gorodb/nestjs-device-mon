import * as bcrypt from 'bcrypt';
import { Repository, EntityRepository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { Logger, BadRequestException } from '@nestjs/common';
import { SignUpCredentialsDto } from '../dto/signUp-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../jwt/jwt-payload.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  private logger = new Logger('DepartmentRepository', true);

  async findUserByEmail(email: string): Promise<Users> {
    const user = await this.findOne({ email });
    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }
    return user;
  }

  async findUserByJwtToken(token: string): Promise<Users> {
    const encodedToken: JwtPayload = this.jwtService.verify(token);
    return this.findUserByEmail(encodedToken.email);
  }

  async createUser(signUpCredentialsDto: SignUpCredentialsDto): Promise<Users> {
    const { email, password } = signUpCredentialsDto;

    const hashedPassword = await this.hashPassword(password, email);
    const user = this.create({ email, password: hashedPassword });
    if (!user) {
      throw new BadRequestException(
        `Не удалось создать пользователя с email ${signUpCredentialsDto.email}`,
      );
    }
    await this.logger.log(`Создание пользователя с email ${email}`);
    await this.save(user);
    return user;
  }

  async createUserByAdmin(createUserDto: CreateUserDto): Promise<Users> {
    const { password, email } = createUserDto;
    const hashedPassword = await this.hashPassword(password, email);
    const user = this.create({
      ...createUserDto,
      password: hashedPassword,
      verified: true,
    });
    if (!user) {
      throw new BadRequestException(
        `Не удалось создать пользователя с email ${email}`,
      );
    }
    this.logger.log(`Создание пользователя с email ${email}`);
    await this.save(user);
    return user;
  }

  async updateUserByAdmin(
    user: Users,
    createUserDto: CreateUserDto,
  ): Promise<Users> {
    const password = createUserDto.password
      ? await this.hashPassword(createUserDto.password, user.email, false)
      : user.password;
    const affected = await this.update(user.id, {
      ...user,
      ...createUserDto,
      password,
      verified: true,
    });
    if (!affected.affected) {
      throw new BadRequestException(
        `Не удалось обновить пользователя с id ${user.id}`,
      );
    }
    return user;
  }

  private async hashPassword(
    password: string,
    email: string,
    withEmailCheck = true,
  ) {
    if (withEmailCheck && (await this.findOne({ email }))) {
      throw new BadRequestException(
        `Пользователь с email ${email} уже существует`,
      );
    }
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
