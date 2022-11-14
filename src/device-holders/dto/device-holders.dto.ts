import { IsUUID } from 'class-validator';
import { Devices } from '../../devices/devices.entity';
import { deviceHolderMessages } from './device-holder.messages';

export class DeviceHolderDto {
  @IsUUID(4, { message: deviceHolderMessages.en.device })
  device: Devices;
}
