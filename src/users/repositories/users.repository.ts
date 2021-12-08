import * as bcrypt from 'bcrypt';
import { Repository, EntityRepository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { Logger, BadRequestException } from '@nestjs/common';
import { SignUpCredentialsDto } from '../dto/signUp-credentials.dto';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  private logger = new Logger('DepartmentRepository', true);

  async createUser(signUpCredentialsDto: SignUpCredentialsDto): Promise<Users> {
    const { email, password } = signUpCredentialsDto;

    if (await this.findOne({ email })) {
      throw new BadRequestException(
        `Пользователь с email ${email} уже существует`,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
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
}
