import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentsEntity } from './departments.entity';
import { Pagination } from '../paginate';
import { PaginationOptionsDto } from '../paginate/pagination.options.dto';

@Controller('departments')
export class DepartmentsController {
  private readonly logger = new Logger('TasksController');
  constructor(private readonly departmentService: DepartmentsService) {}

  @Post()
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentsEntity> {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentsEntity> {
    return this.departmentService.updateDepartment(id, createDepartmentDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.departmentService.deleteDepartment(id);
  }

  @Get()
  getAll(
    @Query(
      new ValidationPipe({
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    paginationOptions: PaginationOptionsDto = { limit: 10, page: 0 },
  ): Promise<Pagination<DepartmentsEntity>> {
    return this.departmentService.getDepartments(paginationOptions);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<DepartmentsEntity> {
    return this.departmentService.getDepartmentById(id);
  }
}
