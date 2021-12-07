import { Repository, EntityRepository } from 'typeorm';
import { DepartmentsEntity } from './departments.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Logger } from '@nestjs/common';
import { Pagination, PaginationOptionsDto } from '../paginate';

@EntityRepository(DepartmentsEntity)
export class DepartmentRepository extends Repository<DepartmentsEntity> {
  private logger = new Logger('DepartmentRepository', true);

  async getDepartments(
    options: PaginationOptionsDto,
  ): Promise<Pagination<DepartmentsEntity>> {
    const [results, total] = await this.findAndCount({
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { name: 'DESC' },
    });
    return new Pagination<DepartmentsEntity>({ results, total });
  }

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentsEntity> {
    const { name, description } = createDepartmentDto;

    const department = this.create({ name, description });
    await this.save(department);
    this.logger.log(`Создан отдел ${JSON.stringify(department)}`);
    return department;
  }
}
