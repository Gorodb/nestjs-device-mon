import { IsUUID } from 'class-validator';
import { Devices } from '../../devices/devices.entity';

export class DeviceHolderDto {
  @IsUUID(4, { message: 'Выбранное устройство должно быть валидным UUID' })
  device: Devices;
}
