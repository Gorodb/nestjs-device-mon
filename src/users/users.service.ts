import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users.repository';
import { Users } from './entities/users.entity';
import { FillUserDataDto } from './dto/fill-user-data.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async fillUserData(
    fillUserDataDto: FillUserDataDto,
    user: Users,
  ): Promise<Users> {
    await this.usersRepository.update(user.id, fillUserDataDto);
    return this.usersRepository.findOne(user.id);
  }

  createUser(createUserDataDTO: CreateUserDto): Promise<Users> {
    return this.usersRepository.createUserByAdmin(createUserDataDTO);
  }

  async updateUser(
    createUserDataDTO: CreateUserDto,
    id: string,
  ): Promise<Users> {
    const user = await this.getUserById(id);
    return this.usersRepository.updateUserByAdmin(user, createUserDataDTO);
    // const affected = await this.usersRepository.update(id, {
    //   ...user,
    //   ...createUserDataDTO,
    //   verified: true,
    // });
    // if (!affected.affected) {
    //   throw new BadRequestException(
    //     `Не удалось обновить пользователя с id ${id}`,
    //   );
    // }
    // return { ...user, ...createUserDataDTO };
  }

  async deleteUser(id: string): Promise<{ success: boolean }> {
    const { affected } = await this.usersRepository.delete(id);
    if (!affected) {
      throw new BadRequestException({
        success: false,
        message: `Не удалось удалить пользователя с id ${id}`,
      });
    }
    return Promise.resolve({ success: false });
  }

  async getUserById(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Пользователь с id ${id} не найден`);
    }
    return user;
  }
}
