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

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @Roles(UsersRoles.ADMIN)
  createDevice(@Body() deviceDto: DevicesDto): Promise<Devices> {
    return this.devicesService.createDevice(deviceDto);
  }

  @Put('/:id')
  @Roles(UsersRoles.ADMIN)
  update(
    @Param('id') id: string,
    @Body() deviceDto: DevicesDto,
  ): Promise<Devices> {
    return this.devicesService.updateDeviceByAdmin(id, deviceDto);
  }

  @Delete('/:id')
  @Roles(UsersRoles.ADMIN)
  delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.devicesService.deleteDevice(id);
  }

  @Get('/:id')
  getDeviceById(@Param('id') id: string) {
    return this.devicesService.getDeviceById(id);
  }

  @Get()
  getAllDevices(
    @Query() paginationOptions: PaginationOptionsDto,
    @Query('search') search: string,
  ): Promise<Pagination<Devices>> {
    return this.devicesService.getAllDevices(paginationOptions, search);
  }
}
