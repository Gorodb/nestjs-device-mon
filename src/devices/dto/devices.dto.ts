import { IsString, IsOptional, IsUUID } from 'class-validator';
import { Users } from '../../users/entities/users.entity';
import { Departments } from '../../departments/departments.entity';
import { DeviceTypes } from '../../device-types/device-types.entity';
import { devicesMessages } from './devices.messages';

export class DevicesDto {
  @IsString({ message: devicesMessages.en.name })
  name: string;

  @IsOptional()
  @IsUUID(4, { message: devicesMessages.en.owner })
  owner: Users;

  @IsOptional()
  @IsUUID(4, {
    message: devicesMessages.en.heldByUser,
  })
  heldByUser: Users;

  @IsOptional()
  @IsUUID(4, {
    message: devicesMessages.en.previousUser,
  })
  previousUser: Users;

  @IsUUID(4, { message: devicesMessages.en.deviceType })
  deviceType: DeviceTypes;

  @IsString({
    message: devicesMessages.en.osName,
  })
  osName: string;

  @IsString({ message: devicesMessages.en.defaultLocation })
  defaultLocation: string;

  @IsUUID(4, { message: devicesMessages.en.department })
  department: Departments;

  @IsOptional()
  @IsString({
    message: devicesMessages.en.currentLocation,
  })
  currentLocation: string;

  @IsOptional()
  @IsString({ message: devicesMessages.en.charge })
  charge: string;

  @IsOptional()
  @IsString({ message: devicesMessages.en.inventoryNumber })
  inventoryNumber: string;
}
