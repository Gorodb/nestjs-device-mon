import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentRepository } from './department.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentsEntity } from './departments.entity';
import { Pagination } from '../paginate';
import { PaginationOptionsDto } from '../paginate/pagination.options.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentRepository)
    private departmentRepository: DepartmentRepository,
  ) {}

  getDepartments(
    options: PaginationOptionsDto,
  ): Promise<Pagination<DepartmentsEntity>> {
    return this.departmentRepository.getDepartments(options);
  }

  async getDepartmentById(id: string): Promise<DepartmentsEntity> {
    const found = await this.departmentRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Отдел с id '${id}' не найден.`);
    }
    return found;
  }

  createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentsEntity> {
    return this.departmentRepository.createDepartment(createDepartmentDto);
  }

  async updateDepartment(
    id: string,
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentsEntity> {
    const department = await this.getDepartmentById(id);

    await this.departmentRepository.update(id, createDepartmentDto);
    return {
      ...department,
      ...createDepartmentDto,
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
