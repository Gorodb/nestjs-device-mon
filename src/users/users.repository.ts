import * as bcrypt from 'bcrypt';
import { Repository, EntityRepository } from 'typeorm';
import { Users } from './users.entity';
import { Logger } from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/signUp-credentials.dto';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  private logger = new Logger('DepartmentRepository', true);

  async createUser(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      signUpCredentialsDto.password,
      salt,
    );
    const user = this.create({
      ...signUpCredentialsDto,
      password: hashedPassword,
    });
    await this.save(user);
  }
}
