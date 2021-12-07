import { Repository, EntityRepository } from 'typeorm';
import { Departments } from './departments.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Logger } from '@nestjs/common';
import { Pagination, PaginationOptionsDto } from '../paginate';

@EntityRepository(Departments)
export class DepartmentsRepository extends Repository<Departments> {
  private logger = new Logger('DepartmentRepository', true);

  async getDepartments(
    options: PaginationOptionsDto,
  ): Promise<Pagination<Departments>> {
    const [results, total] = await this.findAndCount({
      skip: (options.page - 1) * options.limit,
      take: options.limit,
      order: { name: 'DESC' },
    });
    return new Pagination<Departments>({ results, total });
  }

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
  ): Promise<Departments> {
    const { name, description } = createDepartmentDto;

    const department = this.create({ name, description });
    await this.save(department);
    this.logger.log(`Создан отдел ${JSON.stringify(department)}`);
    return department;
  }
}
