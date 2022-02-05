import {
  Body,
  Controller,
  Query,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from '../guards/roles.guard';
import { UsersRoles } from './enums/users-roles.enum';
import { GetUser } from './users.decorator';
import { Users } from './entities/users.entity';
import { FillUserDataDto } from './dto/fill-user-data.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Pagination, PaginationOptionsDto } from '../paginate';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
    this.usersService.createAdminUser();
  }

  @Roles(UsersRoles.USER)
  @Patch('/update_user')
  updateUserData(
    @GetUser() user: Users,
    @Body() fillUserDataDto: FillUserDataDto,
  ): Promise<Users> {
    return this.usersService.fillUserData(fillUserDataDto, user);
  }

  @Roles(UsersRoles.ADMIN)
  @Post('/create')
  createUser(@Body() createUserDataDTO: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(createUserDataDTO);
  }

  @Roles(UsersRoles.ADMIN)
  @Put('/update/:id')
  updateUser(
    @Body() createUserDataDTO: CreateUserDto,
    @Param('id') id: string,
  ): Promise<Users> {
    return this.usersService.updateUser(createUserDataDTO, id);
  }

  @Roles(UsersRoles.ADMIN)
  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.usersService.deleteUser(id);
  }

  @Roles(UsersRoles.ADMIN)
  @Get('/get/:id')
  getUserById(@Param('id') id: string): Promise<Users> {
    return this.usersService.getUserById(id);
  }

  @Roles(UsersRoles.ADMIN)
  @Get('/get')
  getAllUsers(
    @Query() paginationOptions: PaginationOptionsDto,
    @Query('search') search: string,
    @Query('department') department: string,
  ): Promise<Pagination<Users>> {
    return this.usersService.getAllUsers(paginationOptions, search, department);
  }
}
