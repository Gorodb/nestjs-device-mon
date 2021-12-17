import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from '../guards/roles.guard';
import { UsersRoles } from '../users/enums/users-roles.enum';
import { DeviceTypesDto } from './dto/device-types.dto';
import { DeviceTypes } from './device-types.entity';
import { DeviceTypesService } from './device-types.service';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Controller('device_types')
export class DeviceTypesController {
  constructor(private readonly deviceTypesService: DeviceTypesService) {}

  @Post('')
  @Roles(UsersRoles.ADMIN)
  create(@Body() deviceTypesDto: DeviceTypesDto): Promise<DeviceTypes> {
    return this.deviceTypesService.createDeviceType(deviceTypesDto);
  }

  @Put('/:id')
  @Roles(UsersRoles.ADMIN)
  update(
    @Body() deviceTypesDto: DeviceTypesDto,
    @Param('id') id: string,
  ): Promise<DeviceTypes> {
    return this.deviceTypesService.updateDeviceType(id, deviceTypesDto);
  }

  @Delete('/:id')
  @Roles(UsersRoles.ADMIN)
  delete(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.deviceTypesService.deleteDeviceType(id);
  }

  @Get('/:id')
  @Roles(UsersRoles.ADMIN)
  get(@Param('id') id: string): Promise<DeviceTypes> {
    return this.deviceTypesService.getDeviceTypeById(id);
  }

  @Get('')
  getAll(@Paginate() query: PaginateQuery): Promise<Paginated<DeviceTypes>> {
    return this.deviceTypesService.getAllDeviceTypes(query);
  }
}
