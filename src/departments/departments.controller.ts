import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Departments } from './departments.entity';
import { Pagination } from '../paginate';
import { PaginationOptionsDto } from '../paginate';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  private readonly logger = new Logger('TasksController');
  constructor(private readonly departmentService: DepartmentsService) {}

  @Post()
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Departments> {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Departments> {
    return this.departmentService.updateDepartment(id, updateDepartmentDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.departmentService.deleteDepartment(id);
  }

  @Get()
  getAll(
    @Query(new ValidationPipe())
    paginationOptions: PaginationOptionsDto = { limit: 10, page: 1 },
  ): Promise<Pagination<Departments>> {
    return this.departmentService.getDepartments(paginationOptions);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Departments> {
    return this.departmentService.getDepartmentById(id);
  }
}
