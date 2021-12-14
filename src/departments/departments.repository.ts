import { Repository, EntityRepository } from 'typeorm';
import { Departments } from './departments.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Logger } from '@nestjs/common';

@EntityRepository(Departments)
export class DepartmentsRepository extends Repository<Departments> {
  private logger = new Logger('DepartmentRepository', true);

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
