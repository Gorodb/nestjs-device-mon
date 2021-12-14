import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentsRepository } from './departments.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Departments } from './departments.entity';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { DepartmentsPaginationConfig } from './departments.pagination-config';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentsRepository)
    private readonly departmentRepository: DepartmentsRepository,
  ) {}

  getDepartments(query: PaginateQuery): Promise<Paginated<Departments>> {
    return paginate(
      query,
      this.departmentRepository,
      DepartmentsPaginationConfig,
    );
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
