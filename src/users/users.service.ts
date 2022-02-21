import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { readdir, remove } from 'fs-extra';
import { path } from 'app-root-path';
import { UsersRepository } from './repositories/users.repository';
import { Users } from './entities/users.entity';
import { FillUserDataDto } from './dto/fill-user-data.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { OrderEnum, Pagination, PaginationOptionsDto } from '../paginate';
import { DepartmentsRepository } from '../departments/departments.repository';
import {
  paginate,
  paginationQueryBuilder,
} from '../paginate/pagination.query-builder';
import { UsersRoles } from './enums/users-roles.enum';
import { CreateDepartmentDto } from '../departments/dto/create-department.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @InjectRepository(DepartmentsRepository)
    private readonly departmentsRepository: DepartmentsRepository,
  ) {}
  private readonly logger = new Logger(UsersService.name);

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleCron() {
    const uploadPath = `${path}/uploads/logos`;
    const logos = await readdir(uploadPath);
    for (const logo of logos) {
      const user = await this.usersRepository
        .createQueryBuilder()
        .where('logo::jsonb @> :logo', { logo: { name: logo } })
        .getOne();
      if (!user) {
        this.logger.log('info', `Удаляем неиспользуемое изображение: ${logo}`);
        await remove(`${uploadPath}/${logo}`);
      }
    }
  }

  async fillUserData(
    fillUserDataDto: FillUserDataDto,
    user: Users,
  ): Promise<Users> {
    await this.usersRepository.update(user.id, fillUserDataDto);
    return this.usersRepository.findOne(user.id);
  }

  async createAdminUser(): Promise<void> {
    const adminUser = await this.usersRepository.findOne({
      email: 'admin@admin.ru',
    });
    if (!adminUser) {
      let department = (await this.departmentsRepository.find())[0];
      if (!department) {
        const newDepartment: CreateDepartmentDto = {
          name: 'wink',
          description: 'Устройства в московском офисе направления wink',
        };
        department = await this.departmentsRepository.createDepartment(
          newDepartment,
        );
      }
      const user: CreateUserDto = {
        department,
        password: 'PasSw0rdRestream!Forever',
        role: UsersRoles.ADMIN,
        name: 'Admin',
        email: 'admin@admin.ru',
      };
      await this.usersRepository.createUserByAdmin(user, department);
    }
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
    department?: string,
  ): Promise<Pagination<Users>> {
    const queryBuilder = paginationQueryBuilder(
      'users',
      this.usersRepository,
      options,
      { field: 'created', order: OrderEnum.DESC },
      { fields: ['email', 'name', 'description', 'id'], search },
    );
    if (department) {
      queryBuilder.andWhere({ department });
    }
    queryBuilder.andWhere({ verified: true });
    queryBuilder.leftJoinAndSelect('users.department', 'department');
    return paginate(queryBuilder, options);
  }
}
