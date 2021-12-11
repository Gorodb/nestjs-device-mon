import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Departments } from './departments.entity';
import { Pagination, PaginationOptionsDto } from '../paginate';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Roles } from '../guards/roles.guard';
import { UsersRoles } from '../users/enums/users-roles.enum';

@Controller('departments')
export class DepartmentsController {
  private readonly logger = new Logger('TasksController');
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
    return this.departmentService.updateDepartment(id, updateDepartmentDto);
  }

  @Delete('/:id')
  @Roles(UsersRoles.ADMIN)
  delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.departmentService.deleteDepartment(id);
  }

  @Get()
  @Roles(UsersRoles.ADMIN)
  getAll(
    @Query(new ValidationPipe())
    paginationOptions: PaginationOptionsDto = { limit: 10, page: 1 },
  ): Promise<Pagination<Departments>> {
    return this.departmentService.getDepartments(paginationOptions);
  }

  @Get('/:id')
  @Roles(UsersRoles.ADMIN)
  getById(@Param('id') id: string): Promise<Departments> {
    return this.departmentService.getDepartmentById(id);
  }
}
