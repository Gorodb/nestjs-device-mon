import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put, Query,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Departments } from './departments.entity';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Roles } from '../guards/roles.guard';
import { UsersRoles } from '../users/enums/users-roles.enum';
import { Pagination, PaginationOptionsDto } from '../paginate';

@Controller('departments')
export class DepartmentsController {
  private readonly logger = new Logger('Departments controller');
  constructor(private readonly departmentService: DepartmentsService) {}

  @Post()
  @Roles(UsersRoles.ADMIN)
  create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Departments> {
    return this.departmentService.createDepartment(createDepartmentDto);
  }

  @Put('/:id')
  @Roles(UsersRoles.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Departments> {
    this.logger.log(`Обновление подразделения с id: ${id}`);
    return this.departmentService.updateDepartment(id, updateDepartmentDto);
  }

  @Delete('/:id')
  @Roles(UsersRoles.ADMIN)
  delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.departmentService.deleteDepartment(id);
  }

  @Get()
  getAll(
    @Query() paginationOptions: PaginationOptionsDto,
    @Query('search') search: string,
  ): Promise<Pagination<Departments>> {
    return this.departmentService.getDepartments(paginationOptions, search);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Departments> {
    return this.departmentService.getDepartmentById(id);
  }
}
