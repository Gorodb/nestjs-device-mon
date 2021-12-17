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
import { Pagination, PaginationOptionsDto } from '../paginate';
import { DepartmentsRepository } from '../departments/departments.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(DepartmentsRepository)
    private readonly departmentsRepository: DepartmentsRepository,
  ) {}

  async fillUserData(
    fillUserDataDto: FillUserDataDto,
    user: Users,
  ): Promise<Users> {
    await this.usersRepository.update(user.id, fillUserDataDto);
    return this.usersRepository.findOne(user.id);
  }

  async createUser(createUserDataDTO: CreateUserDto): Promise<Users> {
    const department = await this.departmentsRepository.findOne(
      createUserDataDTO.department,
    );
    return this.usersRepository.createUserByAdmin(
      createUserDataDTO,
      department,
    );
  }

  async updateUser(
    createUserDataDTO: CreateUserDto,
    id: string,
  ): Promise<Users> {
    const user = await this.getUserById(id);
    const department = await this.departmentsRepository.findOne(
      createUserDataDTO.department,
    );
    return this.usersRepository.updateUserByAdmin(
      user,
      department,
      createUserDataDTO,
    );
  }

  async deleteUser(id: string): Promise<{ success: boolean }> {
    const { affected } = await this.usersRepository.delete(id);
    if (!affected) {
      throw new BadRequestException({
        success: false,
        message: `Не удалось удалить пользователя с id ${id}`,
      });
    }
    return { success: true };
  }

  async getUserById(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Пользователь с id ${id} не найден`);
    }
    return user;
  }

  async getAllUsers(
    options: PaginationOptionsDto,
    search?: string,
  ): Promise<Pagination<Users>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('users');
    if (search) {
      queryBuilder.where(
        '(LOWER(users.email) LIKE LOWER(:search) OR LOWER(users.name) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    queryBuilder
      .skip((options.page - 1) * options.limit)
      .take(options.limit)
      .leftJoinAndSelect('users.department', 'department')
      .orderBy('users.created', 'DESC');
    const [results, total] = await queryBuilder.getManyAndCount();
    return new Pagination<Users>({
      results,
      total,
      page: options.page,
      limit: options.limit,
    });
  }
}
