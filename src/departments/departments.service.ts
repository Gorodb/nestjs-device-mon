import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentsRepository } from './departments.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Departments } from './departments.entity';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { paginate, paginationQueryBuilder } from '../paginate/pagination.query-builder';
import { OrderEnum, Pagination, PaginationOptionsDto } from '../paginate';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentsRepository)
    private readonly departmentRepository: DepartmentsRepository,
  ) {}

  async getDepartments(
    options: PaginationOptionsDto,
    search?: string,
  ): Promise<Pagination<Departments>> {
    const queryBuilder = paginationQueryBuilder(
      'departments',
      this.departmentRepository,
      options,
      { field: 'created', order: OrderEnum.DESC },
      { fields: ['name', 'description'], search },
    );
    return paginate(queryBuilder, options);
  }

  async getDepartmentById(id: string): Promise<Departments> {
    const found = await this.departmentRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Отдел с id '${id}' не найден.`);
    }
    return found;
  }

  createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Departments> {
    return this.departmentRepository.createDepartment(createDepartmentDto);
  }

  async updateDepartment(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Departments> {
    const department = await this.getDepartmentById(id);

    await this.departmentRepository.update(id, updateDepartmentDto);
    return {
      ...department,
      ...updateDepartmentDto,
    };
  }

  async deleteDepartment(id: string): Promise<{ success: boolean }> {
    const result = await this.departmentRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Отдел с id '${id}' не найден.`);
    }
    return { success: true };
  }
}
