import { Body, Controller, Post, Sse, Injectable } from '@nestjs/common';
import { DeviceHoldersService } from './device-holders.service';
import { Roles } from '../guards/roles.guard';
import { UsersRoles } from '../users/enums/users-roles.enum';
import { GetUser } from '../users/users.decorator';
import { Users } from '../users/entities/users.entity';
import { DeviceHolderDto } from './dto/device-holders.dto';

@Injectable()
@Controller('device')
export class DeviceHoldersController {
  constructor(private readonly deviceHoldersService: DeviceHoldersService) {}

  @Sse('/sse')
  sse() {
    return this.deviceHoldersService.sendEvents();
  }

  @Post('/take')
  @Roles(UsersRoles.USER)
  takeDevice(
    @GetUser() user: Users,
    @Body() deviceHolderDto: DeviceHolderDto,
  ): Promise<{ success: boolean }> {
    return this.deviceHoldersService.takeDevice(deviceHolderDto, user);
  }

  @Post('/return')
  @Roles(UsersRoles.USER)
  returnDevice(
    @Body() deviceHolderDto: DeviceHolderDto,
  ): Promise<{ success: boolean }> {
    return this.deviceHoldersService.returnDevice(deviceHolderDto);
  }

  @Post('/return_to_previous')
  @Roles(UsersRoles.USER)
  returnDeviceToPrevious(
    @GetUser() user: Users,
    @Body() deviceHolderDto: DeviceHolderDto,
  ): Promise<{ success: boolean }> {
    return this.deviceHoldersService.returnToPrevious(deviceHolderDto, user);
  }
}
