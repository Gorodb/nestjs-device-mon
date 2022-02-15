import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DevicesDto } from './dto/devices.dto';
import { Devices } from './devices.entity';
import { DevicesService } from './devices.service';
import { Roles } from '../guards/roles.guard';
import { UsersRoles } from '../users/enums/users-roles.enum';
import { Pagination, PaginationOptionsDto } from '../paginate';
import { GetUser } from '../users/users.decorator';
import { Users } from '../users/entities/users.entity';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('/create')
  @Roles(UsersRoles.ADMIN)
  createDevice(@Body() deviceDto: DevicesDto): Promise<Devices> {
    return this.devicesService.createDevice(deviceDto);
  }

  @Put('/update/:id')
  @Roles(UsersRoles.ADMIN)
  update(
    @Param('id') id: string,
    @Body() deviceDto: DevicesDto,
  ): Promise<Devices> {
    return this.devicesService.updateDeviceByAdmin(id, deviceDto);
  }

  @Delete('/remove/:id')
  @Roles(UsersRoles.ADMIN)
  delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.devicesService.deleteDevice(id);
  }

  @Get('/get/:id')
  getDeviceById(@Param('id') id: string) {
    return this.devicesService.getDeviceById(id);
  }

  @Get('/getAll')
  getAllDevices(
    @Query() paginationOptions: PaginationOptionsDto,
    @Query('search') search: string,
    @Query('department') department: string,
  ): Promise<Pagination<Devices>> {
    return this.devicesService.getAllDevices(
      paginationOptions,
      search,
      department,
    );
  }

  @Get('/devices_on_me')
  @Roles(UsersRoles.USER)
  getMyTakenDevices(@GetUser() user: Users): Promise<{ items: Devices[] }> {
    return this.devicesService.geMyTakenDevices(user);
  }
}
